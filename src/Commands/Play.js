const Command = require("../Structures/Command");

const {
  VoiceConnectionStatus,
  AudioPlayerStatus,
	joinVoiceChannel
} = require("@discordjs/voice");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["play"],
      description: "Play music",
      category: "Utilities",
    });
  }

  async run(message) {
    const { channel } = message.member.voice;
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });
  }
};
