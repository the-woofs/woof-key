const Command = require("../Structures/Command");
const Queue = require("../Structures/Queue");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["stop"],
      description:
        "Stops playing music, clears the queue and leaves the connection.",
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

    const queue = new Queue();
    queue.setBusy(false);
    queue.clear();

    message.reply(
      "Cleared the queue."
    );
  }
};
