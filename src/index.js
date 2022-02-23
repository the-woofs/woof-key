require("dotenv").config();
require("savior.js");

const BotClient = require("./Structures/BotClient");
const config = require("../config");

const client = new BotClient(config);
client.start();

module.exports = { client };
