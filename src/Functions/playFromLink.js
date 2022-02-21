const ytdl = require("ytdl-core");
const {
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource,
  AudioPlayerStatus,
} = require("@discordjs/voice");

module.exports = {
  playFromLink: function (video_link, connection, idleFunction) {
    try {
      if (!video_link) {
        return;
      }
      const stream = ytdl(video_link, { filter: "audioonly" });
      const player = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Pause,
        },
      });
      const resource = createAudioResource(stream);

      console.log(`Going to play ${video_link}.`);
      player.play(resource);
      connection.subscribe(player);
      player.on(AudioPlayerStatus.Idle, () => {
        console.log("The audio player has stopped playing!");
        idleFunction();
      });
    } catch (error) {
      console.log(error);
    }
  },
};
