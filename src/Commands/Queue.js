const Command = require("../Structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["queue"],
      description: "Show queue",
      category: "Utilities",
    });
  }

  async run(message) {
    try {
      if (!process.env["queueList"]) {
        message.reply("Queue Empty");
      } else {
        const queue = process.env["queueList"].split(",");
        const embed = new MessageEmbed()
          .setColor("#0099ff")
          .setTitle("Queue")
          .setDescription(queue.join("\n"));
	message.reply({embeds: [embed]});
      }
    } catch (e) {
      message.channel.send("Error: " + e);
    }
  }
};
