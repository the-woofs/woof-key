const Queue = require("../Structures/Queue");
const playFromLink = require("./playFromLink.js");

module.exports = function (queueReturnFunction, connection) {
  for (let songID in queueReturnFunction()) {
    const song = queueReturnFunction()[songID];
    playFromLink(song, connection);
  }
};
