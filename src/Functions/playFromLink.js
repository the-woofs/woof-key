const playdl = require("play-dl");
const {
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource,
  AudioPlayerStatus,
} = require("@discordjs/voice");

module.exports = {
  playFromLink: async function (video_link, connection, idleFunction) {
    try {
      if (!video_link) {
        return;
      }
      const stream = await playdl.stream(video_link);
      const player = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Pause,
        },
      });
      const resource = createAudioResource(stream.stream, {
        inputType: stream.type,
      });

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
