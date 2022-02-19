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
      process.env["queueList"] = "";
      process.env["queueBusy"] = "false";
      const connection = getVoiceConnection(channel.guild.id);
      connection.destroy();
      message.reply("Stopped Playing Music And Cleared The Queue.");
    } catch (e) {
      message.channel.send("__**Error From JavaScript Console:**__\n " + "```\n" + e + "\n```");
    }
  }
};
