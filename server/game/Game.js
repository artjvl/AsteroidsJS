import Message from "../../client/js/shared/messages/Message.js";

export default class Game {
    static WIDTH = 1000;
    static HEIGHT = 1000;
    constructor(server) {
        this.__server = server;
        this.__users = new Map();
        this.__run();
    }
    getUsers() {
        return this.__users.values();
    }
    addUser(user) {
        this.__users.set(user.getId(), user);
        console.log("User " + user.getId() + " added.");
    }
    removeUser(user) {
        this.__users.delete(user.getId());
        console.log("User " + user.getId() + " removed.");
    }
    __run() {
        setInterval(() => {
            for (const user of this.getUsers()) {
                user.step(0.02);
                user.update(this.__generateSnapshot());
            }
        }, 20);
    }
    __generateSnapshot() {
        const users = Array();
        for (const user of this.getUsers()) {
            users.push(new Message.User(
                user.getPosition().getX(),
                user.getPosition().getY(),
                user.getAttitude()
            ));
        }
        return new Message.Snapshot(users);
    }
}