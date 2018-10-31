// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4')

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
  // console.log(wss.clients)

  ws.on('message', function incoming(message) {
    let incomingmsg = JSON.parse(message)
    if (incomingmsg.type === "postMessage") {
      incomingmsg.type= "incomingMessage"
      console.log(incomingmsg)
    }
    if (incomingmsg.type === "postNotification") {
      incomingmsg.type= "incomingNotification"
      console.log(incomingmsg)
    }
    incomingmsg.id = uuid()
    wss.clients.forEach(function (client) {
        client.send(JSON.stringify(incomingmsg));
    })
  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

