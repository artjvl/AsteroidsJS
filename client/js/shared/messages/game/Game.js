import Player from "./sub/Player.js";
import Snapshot from "./sub/Snapshot.js";
import User from "./sub/User.js";

export default class Game {
    static GAME = "GAME";
    static Player = Player;
    static Snapshot = Snapshot;
    static User = User;
    constructor(snapshot, player) {
        this.snapshot = snapshot;
        this.player = player;
    }
}