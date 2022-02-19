const Command = require("../Structures/Command");
const yt = require("youtube-search-without-api-key");
const ytdl = require("ytdl-core");

const {
  joinVoiceChannel,
  createAudioPlayer,
  NoSubscriberBehavior,
  AudioPlayerStatus,
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

  async playResource(queue, video_link_id, connection, channel) {
    if (process.env["queueBusy"] != "true") {
      console.log(process.env["queueBusy"]);
      const video_link = queue[video_link_id];
      console.log(video_link);
      const stream = ytdl(video_link, { filter: "audioonly" });

      const player = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Pause,
        },
      });
      const resource = createAudioResource(stream);
      player.play(resource);
      channel.send(`**Now playing: ${video_link}**`);

      process.env["queueBusy"] = "true";
      connection.subscribe(player);
      player.on(AudioPlayerStatus.Idle, () => {
        console.log("The audio player has done playing");
        process.env["queueBusy"] = "false";
        console.log(process.env["queueBusy"]);
        let queueString = process.env["queueList"].trim();
        let queue = queueString.split(",");
        video_link_id++;
        console.log(queue[video_link_id]);
        if (queue[video_link_id]) {
          this.playResource(queue, video_link_id, connection, channel);
        }
      });
    }
  }

  async run(message) {
    const { channel } = message.member.voice;

    try {
      const args = message.content.split(" ");

      if (!channel) {
        return message.reply(
          "You need to be in a voice channel to use this command."
        );
      }
      if (!args.slice(1).join(" ").trim()) {
        return message.reply(
          "Please provide the name of the song you would like to play."
        );
      }

      const song_name = args.slice(1).join(" ");

      let video = await yt.search(song_name);
      let video_link = video[0].snippet.url;

      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });

      process.env["queueList"] = process.env["queueList"]
        ? process.env["queueList"]
        : "";

      let queueString = process.env["queueList"].trim();
      let queue = queueString.split(",");

      queue.push(video_link);

      process.env["queueList"] = queue.join(",");
      queue = process.env["queueList"].split(",");

      console.log(process.env["queueList"]);
      message.reply(`Added ${video_link} to queue`);

      console.log(queue);
      if (queue[0] === "") {
        console.log(queue.shift());
      }
      for (let video_link_id in queue) {
        console.log(queue[video_link_id]);
        this.playResource(queue, video_link_id, connection, message.channel);
      }
    } catch (e) {
      message.channel.send("__**Error From JavaScript Console:**__\n " + "```\n" + e + "\n```");
    }
  }
};
