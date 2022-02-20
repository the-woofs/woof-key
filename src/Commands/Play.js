const Command = require("../Structures/Command");
const Queue = require("../Structures/Queue");
const playFromQueue = require("../Functions/playFromQueue");
const yt = require("youtube-search-without-api-key");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["play"],
      description: "Play provided music/add it to the queue.",
      category: "Music",
    });
  }

  async run(message) {
    const { channel } = message.member.voice;

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

      if (queue.getBusy()) {
        queue.add(song);
        console.log(queue.get());
        return;
      } else {
        playFromQueue(queue.get, connection);
        queue.setBusy(true);
        console.log(queue.get());
      }
    } catch (e) {
      message.channel.send(
        "__**Error From JavaScript Console:**__\n " + "```\n" + e + "\n```"
      );
    }
  }
};
