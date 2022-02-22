const Command = require("../Structures/Command");
const Queue = require("../Structures/Queue");
const playFromQueue = require("../Functions/playFromQueue");
const yt = require("youtube-search-without-api-key");
const { joinVoiceChannel, VoiceConnectionStatus } = require("@discordjs/voice");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["play"],
      description: "Plays provided music/add it to the queue.",
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
      const args = message.content.split(" ");
      if (args.length == 1) {
        message.reply("Please provide the name of the song.");
        return;
      }
      const query = args.slice(1).join(" ");

      let video = await yt.search(query);
      let song = video[0].snippet.url;

      const queue = new Queue();

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
        message.channel.send("Me has been disconnected. Clearing the queue.");
        queue.setBusy(false);
        queue.clear();
      });

      if (queue.getBusy() == "true") {
        queue.add(song);
        console.log(queue.get());
        return message.reply(`**Added** ${song} to queue.`);
      } else {
        message.reply(`**Added** <${song}> to queue.`);
        console.log("Playing from queue");
        queue.add(song);
        console.log(queue.get());
        playFromQueue.playFromQueue(
          queue.get,
          connection,
          0,
          queue.setBusy,
          queue.clear,
          message
        );
        queue.setBusy(true);
        console.log(queue.get());
      }
    } catch (err) {
      message.channel.send(
        "**Error from console**\n" + "```\n" + err + "\n```"
      );
    }
  }
};
