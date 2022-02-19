const Command = require("../Structures/Command");

const { getVoiceConnection } = require("@discordjs/voice");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["clear"],
      description: "Clear queue",
      category: "Utilities",
    });
  }

  async run(message) {
    const { channel } = message.member.voice;
    try {
      process.env["queueList"] = "";
      message.reply("Cleared The Queue.");
    } catch (e) {
      message.channel.send("__**Error From JavaScript Console:**__\n " + "```\n" + e + "\n```");
    }
  }
};
