import Path from 'path';
import Express from 'express';
import HTTP from 'http';
import SocketIO from 'socket.io';

import Server from "./server/game/Server.js";


console.log("Starting server...");

const __dirname = Path.dirname(new URL(import.meta.url).pathname),
    app = Express(),
    server_ = HTTP.Server(app);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', Express.static(__dirname + '/client'));

server_.listen(2000);
console.log("Server started!");

const io = SocketIO(server_, {});
const server = new Server(io);