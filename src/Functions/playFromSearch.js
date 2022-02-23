const yt = require("youtube-search-without-api-key");
const playFromLink = require("./playFromLink.js");

async function playFromSearch(query, connection) {
  let video = await yt.search(query);
  let video_link = video[0].snippet.url;
  console.log("playing from link");
  const func = function () {
    playFromSearch("Lofi live lofi girl", connection);
  };
  playFromLink.playFromLink(video_link, connection, func);
}

module.exports = { playFromSearch };
