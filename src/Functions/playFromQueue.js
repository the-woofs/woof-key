const Queue = require("../Structures/Queue");
const playFromLink = require("./playFromLink");

function playFromQueue(
  queueReturnFunction,
  connection,
  songID,
  busyStateFunction,
  queueClearFunction
) {
  if (!songID) {
    songID = 0;
  }

  console.log("Looping");
  console.log(queueReturnFunction);
  console.log(queueReturnFunction());

  const song = queueReturnFunction()[songID];

  if (!song) {
    console.log("No song found");
    queueClearFunction();
    busyStateFunction(false);
    return;
  }
  console.log(`Going to play ${song} from queue.`);
  songID++;
  console.log(`Incremented SONG ID. SONG ID is: ${songID}`);
  const continueFunction = () => {
    playFromQueue(
      queueReturnFunction,
      connection,
      songID,
      busyStateFunction,
      queueClearFunction
    );
  };
  playFromLink.playFromLink(song, connection, continueFunction);
}

module.exports = { playFromQueue };
