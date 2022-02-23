const Queue = require("../Structures/Queue");
const playFromLink = require("./playFromLink");

function playFromQueue(
  queueReturnFunction,
  connection,
  busyStateFunction,
  queueClearFunction,
  message
) {
  let songID = process.env.SONGID;

  if (!songID) {
    songID = 0;
  }

  songID = parseInt(songID);

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
  process.env.SONGID = songID;
  songID = parseInt(process.env.SONGID);
  console.log(`Incremented SONG ID. SONG ID is: ${songID}`);
  const continueFunction = () => {
    message.channel.send(`**Done** playing. Moving on.`);
    playFromQueue(
      queueReturnFunction,
      connection,
      busyStateFunction,
      queueClearFunction,
      message
    );
  };
  playFromLink.playFromLink(song, connection, continueFunction);
}

module.exports = { playFromQueue };
