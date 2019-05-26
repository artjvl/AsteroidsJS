import Game from "./Game.js";
import User from "../entity/user/User.js";

export default class Server {
    constructor(sockets) {
        const game = new Game(this);
        sockets.on('connection', function(socket) {
            const user = new User(game, socket, Math.random());
            game.addUser(user);
        });
    }
}