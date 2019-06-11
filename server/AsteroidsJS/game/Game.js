import Message from "../../../client/AsteroidsJS/js/message/Message.js";
import Timer from "../../util/timer/Timer.js";

export default class Game {
    static WIDTH = 1000;
    static HEIGHT = 1000;
    constructor(server) {
        this._server = server;
        this._users = new Map();
        this._timer = new Timer();
        this._run();
    }
    getUsers() {
        return this._users.values();
    }
    addUser(user) {
        this._users.set(user.entity.getId(), user);
        console.log("User " + user.entity.getId() + " added.");
    }
    removeUser(user) {
        this._users.delete(user.entity.getId());
        console.log("User " + user.entity.getId() + " removed.");
    }
    _run() {
        setInterval(() => {
            const snapshot = this._generateSnapshot(),
                delta = this._timer.delta();
            for (const user of this.getUsers()) {
                user.entity.step(0.001 * delta);
                user.update(snapshot);
            }
        }, 20);
    }
    _generateSnapshot() {
        const users = Array();
        for (const user of this.getUsers()) {
            users.push(user.entity.generateSnapshot());
        }
        return Message.game.util.snapshot(users, [], []);
    }
}