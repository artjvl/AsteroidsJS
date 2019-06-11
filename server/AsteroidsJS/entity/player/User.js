import Message from "../../../../client/AsteroidsJS/js/message/Message.js";

export default class User {
    constructor(game, socket, entity) {
        this.entity = entity;
        this._game = game;
        this._socket = this.init(socket);
    }
    init(socket) {
        socket.on('disconnect', () => {
            this._game.removeUser(this);
        });
        socket.on(Message.in.keyboard.down.id, (data) => {
            if (data.key === 'KeyW') {
                this.entity.setLinAcceleration(this._LINEAR_ACCELERATION);
                this._sprite = Message.img.SHIP_THRUST;
            }
            if (data.key === 'KeyA') {
                this.entity.setAngAcceleration(- this._ANGULAR_ACCELERATION);
            }
            if (data.key === 'KeyD') {
                this.entity.setAngAcceleration(this._ANGULAR_ACCELERATION);
            }
        });
        socket.on(Message.in.keyboard.up.id, (data) => {
            if (data.key === "KeyW") {
                this.entity.setLinAcceleration(0);
                this._sprite = Message.img.SHIP_COAST;
            }
            if (data.key === 'KeyA') {
                this.entity.setAngAcceleration(0);
            }
            if (data.key === 'KeyD') {
                this.entity.setAngAcceleration(0);
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
}