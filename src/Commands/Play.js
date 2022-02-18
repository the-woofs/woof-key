const Command = require("../Structures/Command");
const yt = require("youtube-search-without-api-key");
const ytdl = require("ytdl-core");
const fs = require("fs");

const {
  joinVoiceChannel,
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource,
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

    try {
      const args = message.content.split(" ");
      const song_name = args.slice(1).join(" ");

      if (!channel) {
        return message.channel.send(
          "You need to be in a voice channel to use this command."
        );
      }
      if (!args) {
        return message.channel.send(
          "Please provide the name of the song you would like to play."
        );
      }
      let video = await yt.search(song_name);
      let video_link = video[0].snippet.url;
      const stream = ytdl(video_link, { filter: "audioonly" });

      const player = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Pause,
        },
      });
      const resource = createAudioResource(stream);

      player.play(resource);

      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });
      connection.subscribe(player);
    } catch (e) {
	    message.channel.send("Error: " + e);
    }
  }
};
