const Command = require("../Structures/Command");

const { getVoiceConnection } = require("@discordjs/voice");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["stop"],
      description: "Stop music",
      category: "Utilities",
    });
  }

  async run(message) {
    const { channel } = message.member.voice;
    try {
      const connection = getVoiceConnection(channel.guild.id);
      connection.destroy();
    } catch (e) {
      message.channel.send("Error: " + e);
    }
  }
};
