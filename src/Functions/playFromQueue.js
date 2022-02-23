const Queue = require("../Structures/Queue");
const playFromLink = require("./playFromLink");

function playFromQueue(
  queueReturnFunction,
  connection,
  songID,
  busyStateFunction,
  queueClearFunction,
  message
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
  message.channel.send(`**Started** playing ${song}`);
  songID++;
  console.log(`Incremented SONG ID. SONG ID is: ${songID}`);
  const continueFunction = () => {
    message.channel.send(`**Done** playing. Moving on.`);
    playFromQueue(
      queueReturnFunction,
      connection,
      songID,
      busyStateFunction,
      queueClearFunction,
      message
    );
  };
  playFromLink.playFromLink(song, connection, continueFunction);
}

module.exports = { playFromQueue };
