import Game from "./game/Game.js";
import User from "./entity/player/User.js";
import SpaceShip from "./entity/entities/SpaceShip.js";
import Vector from "../util/vector/Vector.js";

export default class AsteroidsJS {
    constructor(sockets) {
        const game = new Game(this);
        sockets.on('connection', function(socket) {
            const spaceShip = new SpaceShip(Math.random(), new Vector.Cartesian2(250, 250), new Vector.Cartesian2(0, 0), 0, 0);
            const user = new User(game, socket, spaceShip);
            game.addUser(user);
        });
    }
}