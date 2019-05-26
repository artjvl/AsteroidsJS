import Message from "../../../client/js/shared/messages/Message.js";
import Vector2 from "../../util/vectors/sub/Vector2.js";
import Entity from "../Entity.js";

export default class User extends Entity {
    _sprite = Message.Img.SHIP_COAST;
    constructor(game, socket, id) {
        super(new Vector2(250, 250), 0);
        this._game = game;
        this._socket = this.init(socket);
        this._id = id;
    }
    init(socket) {
        socket.on('disconnect', () => {
            this._game.removeUser(this);
        });
        socket.on(Message.Keyboard.DOWN, (keyboard) => {
            if (keyboard.key === 'KeyW') {
                this.setLinAcceleration(this.LINEAR_ACCELERATION);
                this._sprite = Message.Img.SHIP_THRUST;
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
                this._sprite = Message.Img.SHIP_COAST;
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
        return this._id;
    }
    update(snapshot) {
        const player = new Message.Game.Player(this.getId());
        this._socket.emit(Message.Game.GAME, new Message.Game(snapshot, player));
    }
    getSprite() {
        return this._sprite;
    }
}