import Message from "../../../../client/AsteroidsJS/js/message/Message.js";
import Vector2 from "../../../util/vector/sub/Vector2.js";
import Entity from "../Entity.js";

export default class User extends Entity {
    _sprite = Message.img.SHIP_COAST;
    constructor(game, socket, id) {
        super(new Vector2(250, 250), 20, 0);
        this._game = game;
        this._socket = this.init(socket);
        this._id = id;
    }
    init(socket) {
        socket.on('disconnect', () => {
            this._game.removeUser(this);
        });
        socket.on(Message.in.keyboard.down.id, (data) => {
            if (data.key === 'KeyW') {
                this.setLinAcceleration(this.LINEAR_ACCELERATION);
                this._sprite = Message.img.SHIP_THRUST;
            }
            if (data.key === 'KeyA') {
                this.setAngAcceleration(- this.ANGULAR_ACCELERATION);
            }
            if (data.key === 'KeyD') {
                this.setAngAcceleration(this.ANGULAR_ACCELERATION);
            }
        });
        socket.on(Message.in.keyboard.up.id, (data) => {
            if (data.key === "KeyW") {
                this.setLinAcceleration(0);
                this._sprite = Message.img.SHIP_COAST;
            }
            if (data.key === 'KeyA') {
                this.setAngAcceleration(0);
            }
            if (data.key === 'KeyD') {
                this.setAngAcceleration(0);
            }
        });
        return socket;
    }
    getId() {
        return this._id;
    }
    update(snapshot) {
        this._socket.emit(Message.game.id, Message.game.data(snapshot, this.getId()));
    }
    getSprite() {
        return this._sprite;
    }
}