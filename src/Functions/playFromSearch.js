const yt = require("youtube-search-without-api-key");
const playFromLink = require("./playFromLink.js");

module.exports = function playFromSearch(query, connection) {
  let video = await yt.search(query);
  let video_link = video[0].snippet.url;
  playFromLink(video_link, connection);
};
