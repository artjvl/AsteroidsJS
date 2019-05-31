import Path from 'path';
import Express from 'express';
import HTTP from 'http';
import SocketIO from 'socket.io';

import AsteroidsJS from "./server/AsteroidsJS/AsteroidsJS.js";


console.log("Starting server...");

const __dirname = Path.dirname(new URL(import.meta.url).pathname),
    app = Express(),
    server = HTTP.Server(app);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', Express.static(__dirname + '/client'));

server.listen(2000);
console.log("AsteroidsJS started!");

const io = SocketIO(server, {});
const asteroids = new AsteroidsJS(io);

// const quadTree = new QuadTree(500, 500, 2, 1);
// const element = new Entity(new Vector.Vector2(245, 245), 10, 0);
// quadTree.insert(element);
// quadTree.insert(new Entity(new Vector.Vector2(195, 195), 10, 0));
// quadTree.insert(new Entity(new Vector.Vector2(255, 245), 10, 0));
// quadTree.insert(new Entity(new Vector.Vector2(190, 310), 10, 0));
// quadTree.insert(new Entity(new Vector.Vector2(310, 190), 10, 0));
//
// console.log(quadTree.find(element));