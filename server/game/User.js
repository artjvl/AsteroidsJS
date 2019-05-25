import Message from "../../client/js/shared/messages/Message.js";
import Vector2 from "../../client/js/shared/util/vectors/Vector2.js";
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
                console.log('W');
                this.setLinAcceleration(100);
            }
            if (keyboard.key === 'KeyA') {
                console.log('A');
                this.setAngAcceleration(-2);
            }
            if (keyboard.key === 'KeyD') {
                console.log('D');
                this.setAngAcceleration(2);
            }
        });
        socket.on(Message.Keyboard.UP, (keyboard) => {
            if (keyboard.key === "KeyW") {
                this.setLinAcceleration(-20);
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