const ytdl = require("ytdl-core");
const {
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource,
} = require("@discordjs/voice");

module.exports = function playFromSearch(video_link, connection) {
  const stream = ytdl(video_link, { filter: "audioonly" });
  const player = createAudioPlayer({
    behaviors: {
      noSubscriber: NoSubscriberBehavior.Pause,
    },
  });
  const resource = createAudioResource(stream);

  player.play(resource);
  connection.subscribe(player);
};
