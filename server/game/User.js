import Message from "../../client/js/shared/messages/Message.js";
import Vector2 from "../util/vectors/Vector2.js";
import Entity from "../entity/Entity.js";

export default class User extends Entity {
    constructor(game, socket, id) {
        super(new Vector2(250, 250), 0);
        this.__game = game;
        this.__socket = this.init(socket);
        this.__id = id;
    }
    init(socket) {
        socket.on('disconnect', () => {
            this.__game.removeUser(this);
        });
        socket.on(Message.Keyboard.DOWN, (keyboard) => {
            if (keyboard.key === 'KeyW') {
                this.setLinAcceleration(this.LINEAR_ACCELERATION);
            }
            if (keyboard.key === 'KeyA') {
                this.setAngAcceleration(- this.ANGULAR_ACCELERATION);
            }
            if (keyboard.key === 'KeyD') {
                this.setAngAcceleration(this.ANGULAR_ACCELERATION);
            }
        });
        socket.on(Message.Keyboard.UP, (keyboard) => {
            if (keyboard.key === "KeyW") {
                this.setLinAcceleration(0);
            }
            if (keyboard.key === 'KeyA') {
                this.setAngAcceleration(0);
            }
            if (keyboard.key === 'KeyD') {
                this.setAngAcceleration(0);
            }
        });
        return socket;
    }
    getId() {
        return this.__id;
    }
    update(snapshot) {
        this.__socket.emit(Message.Snapshot.SNAPSHOT, snapshot);
    }
}