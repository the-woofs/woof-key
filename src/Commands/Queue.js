const Command = require("../Structures/Command");
const Queue = require("../Structures/Queue");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["queue"],
      description: "Shows the queue.",
      category: "Music",
    });
  }

  async run(message) {
    try {
      const queue = new Queue();
      const serverQueue = queue.get();
      if (serverQueue.length === 0) {
        return message.reply("Queue is empty.");
      }
      console.log(serverQueue);
      console.log(serverQueue.join("\n"));
      const embed = new MessageEmbed()
        .setTitle("Queue")
        .setDescription(serverQueue.join("\n"))
        .setColor(this.client.color);
	    return message.channel.send({embeds: [embed]});
    } catch (e) {
      message.channel.send(
        "__**Error From JavaScript Console:**__\n " + "```\n" + e + "\n```"
      );
    }
  }
};
