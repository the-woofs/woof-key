const Command = require("../Structures/Command");
const index = require("../index.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["chess"],
      description: "Play chess.",
      category: "Act",
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
      index.client.discordTogether
        .createTogetherCode(message.member.voice.channel.id, "chess")
        .then(async (invite) => {
          return message.channel.send(`Note: you have to click on the link lil nerd, not the 'Play' button, in order to start the activity.\n\n${invite.code}`);
        });
    } catch (err) {
      message.channel.send(
        "**Error from console**\n" + "```\n" + err + "\n```"
      );
    }
  }
};
