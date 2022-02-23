const Command = require("../Structures/Command");
const Queue = require("../Structures/Queue");
const playFromQueue = require("../Functions/playFromQueue");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["skip"],
      description:
        "Skips the current song and continues to the next one on queue.",
      category: "Music",
    });
  }

  async run(message) {
    const queue = new Queue();

    queue.setBusy(false);

    let songID = process.env.SONGID;

    if (!songID) {
      songID = 0;
    }

    songID = parseInt(songID);

    songID++;

    process.env.SONGID = songID;

    const connection = getVoiceConnection(channel.guild.id);

    playFromQueue.playFromQueue(
      queue.get,
      connection,
      queue.setBusy,
      queue.clear,
      message
    );

    queue.setBusy(true);
  }
};
