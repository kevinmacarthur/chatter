// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  let connectedClients = {
                          type: "connectedClients",
                          connectedUsers: wss.clients.size,
                         };
  let clientColour = {
                      type: "userColor",
                      connectedUserColor: generateColor()
                      };
  ws.send(JSON.stringify(clientColour));
  wss.broadcast(JSON.stringify(connectedClients));

  //ON receive message
  ws.on('message', handleMessage);

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', (ws) => {
    console.log('Client disconnected');
    let connectedClients = {
                            type: "connectedClients",
                            connectedUsers: wss.clients.size
                            };
   wss.broadcast(JSON.stringify(connectedClients));
  });
});

function generatenNumber () {
  return Math.floor(Math.random() * 4);
}
function generateColor () {
  if (generatenNumber() === 0) {
    return "black";
  }
  if (generatenNumber() === 1) {
    return "#bc203e";
  }
  if (generatenNumber() === 2) {
    return "#4e8ef4";
  }
  else {
    return "#25964b";
  }
}

wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    client.send(data);
  });
};

function handleMessage(message) {
  // Receive message, parse, then add unique id so React behaves correctly
  console.log(`Received: ${message}`);
  let incomingmsg = JSON.parse(message);
  incomingmsg.id = uuid();

  if (incomingmsg.type === "postMessage") {
    incomingmsg.type= "incomingMessage";
    var matches = incomingmsg.content.match(/.*?(https?:\/\/.*\.(?:png|jpg|gif)).*?/i);
    if (matches) {
      let trim =matches.input.split(`${matches[1]}`);
      incomingmsg.content = `<div> ${trim[0]} </div>
                              <img src="${matches[1]}"/>
                              <div> ${trim[1]} </div>
                              <a href="${matches[1]}" target="_blank"> View Image </a>`;
        wss.broadcast(JSON.stringify(incomingmsg));
    } else {
      wss.broadcast(JSON.stringify(incomingmsg));
    }
  }
  if (incomingmsg.type === "postNotification") {
    incomingmsg.type= "incomingNotification";
    wss.broadcast(JSON.stringify(incomingmsg));
  }
}
