import tmi from 'tmi.js';
import weather from './weather.js';

// Define configuration options
const opts = {
  identity: {
    username: "sergiocabral_com",
    password: "oauth:v9bxz74ieb7maijgy7fhklg106pw9q"
  },
  channels: [
    "sergiocabral_com"
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
async function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName.startsWith('!clima ')) {
    const city = commandName.substring(commandName.indexOf(' ')).trim();
    client.say(target, await weather(city));
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}