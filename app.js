// built in modules
const http = require('http');
const path = require('path');

// external dependencies
const express = require('express');
const WebSocket = require('ws');

// internal dependencies
const heartbeat = require('./src/heartbeat');
const messaging = require('./src/messaging');

// port and host to bind our server to
const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

// for serving static webpages with express
const app = express();
const server = http.createServer(app);
const root = path.resolve(__dirname);
app.use(express.static(root + '/public'));

// for our websocket server
const wss = new WebSocket.Server({ server });

// attach event handlers to the websocket server
heartbeat.bind(wss);
messaging.bind(wss);

// start the server
server.listen(PORT, HOST, () => {
    console.log(`Starting server on port ${PORT}`);
});

