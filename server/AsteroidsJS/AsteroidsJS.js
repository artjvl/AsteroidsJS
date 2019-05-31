import Game from "./game/Game.js";
import User from "./entity/player/User.js";

export default class AsteroidsJS {
    constructor(sockets) {
        const game = new Game(this);
        sockets.on('connection', function(socket) {
            const user = new User(game, socket, Math.random());
            game.addUser(user);
        });
    }
}