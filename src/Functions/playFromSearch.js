const yt = require("youtube-search-without-api-key");
const ytdl = require("ytdl-core");

module.exports = function playFromSearch(query, connection) {
  let video = await yt.search(query);
  let video_link = video[0].snippet.url;

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
