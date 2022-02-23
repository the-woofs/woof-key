const Command = require("../Structures/Command");
const playFromSearch = require("../Functions/playFromSearch");
const { joinVoiceChannel, VoiceConnectionStatus } = require("@discordjs/voice");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["lofi"],
      description: "Plays lofi.",
      category: "Music",
    });
  }

  async run(message) {
    const { channel } = message.member.voice;

    if (!channel) {
      return message.reply(
        "You need to be in a voice channel to use this command."
      );
    }
    try {
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });

      connection.on(VoiceConnectionStatus.Ready, () => {
        console.log(
          "The connection has entered the Ready state - ready to play audio!"
        );
      });
      connection.on(VoiceConnectionStatus.Disconnected, () => {
        message.channel.send("Me has been disconnected.");
      });
      playFromSearch.playFromSearch("Lofi live lofi girl", connection);
    } catch (err) {
      message.channel.send(
        "**Error from console**\n" + "```\n" + err + "\n```"
      );
    }
  }
};
