import Message from "../shared/messages/Message.js";
import Drawer from "../shared/util/drawer/Drawer.js";

export default class Client {
    constructor(document, socket) {
        document.addEventListener('keydown', function(event) {
            socket.emit(Message.Keyboard.DOWN, new Message.Keyboard(event.code));
        });
        document.addEventListener("keyup", function(event) {
            socket.emit(Message.Keyboard.UP, new Message.Keyboard(event.code));
        });
        socket.on(Message.Game.GAME, (game) => {
            this.draw(document.getElementById("ctx").getContext("2d"), game);
        });
    }
    draw(context, game) {
        context.clearRect(0, 0, 500, 500);
        const player = game.snapshot.users.find((user) => {
            return user.id === game.player.id;
        });
        for (const user of game.snapshot.users) {
            const img = new Image();
            img.src = user.sprite;
            Drawer.drawImage(context, img, user.x, user.y, user.z);
        }
    }

}