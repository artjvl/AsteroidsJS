import Message from "../../client/js/shared/messages/Message.js";
import Timer from "../util/timer/Timer.js";

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
        this._users.set(user.getId(), user);
        console.log("User " + user.getId() + " added.");
    }
    removeUser(user) {
        this._users.delete(user.getId());
        console.log("User " + user.getId() + " removed.");
    }
    _run() {
        setInterval(() => {
            const delta = this._timer.delta();
            for (const user of this.getUsers()) {
                user.step(0.001 * delta);
                user.update(this._generateSnapshot());
            }
        }, 20);
    }
    _generateSnapshot() {
        const users = Array();
        for (const user of this.getUsers()) {
            users.push(new Message.User(
                user.getPosition().getX(),
                user.getPosition().getY(),
                user.getAttitude(),
                user.getSprite()
            ));
        }
        return new Message.Snapshot(users);
    }
}