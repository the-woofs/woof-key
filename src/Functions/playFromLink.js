const ytdl = require("ytdl-core");

module.exports = function playFromSearch(video_link, connection, channel) {
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
