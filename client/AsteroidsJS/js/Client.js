import Message from "./message/Message.js";
import Drawer from "./util/drawer/Drawer.js";

export default class Client {
    constructor(document, socket) {
        this._ctx = document.getElementById("ctx").getContext("2d");
        document.addEventListener('keydown', function(event) {
            socket.emit(Message.in.keyboard.down.id, Message.in.keyboard.down.data(event.code));
        });
        document.addEventListener("keyup", function(event) {
            socket.emit(Message.in.keyboard.up.id, Message.in.keyboard.up.data(event.code));
        });
        socket.on(Message.game.id, (game) => {
            this.draw(this._ctx, game);
        });
    }
    draw(context, game) {
        context.clearRect(0, 0, 500, 500);
        const player = game.snapshot.players.find((user) => {
            return user.id === game.player.id;
        });
        for (const user of game.snapshot.players) {
            const img = new Image();
            img.src = user.sprite;
            Drawer.drawImage(context, img, user.x, user.y, user.z);
        }
    }

}