import Message from "../shared/messages/Message";

export default class Client {
    constructor(document, socket) {
        this._ctx = this.initDocument(document);
        this._socket = this.initSocket(socket);
    }
    initDocument(document) {
        document.addEventListener('keydown', function(event) {
            socket.emit(Message.Keyboard.DOWN, new Message.Keyboard(event.code));
        });
        document.addEventListener("keyup", function(event) {
            socket.emit(Message.Keyboard.UP, new Message.Keyboard(event.code));
        });
        return document.getElementById("ctx").getContext("2d");
    }
    initSocket(socket) {
        socket.on(Message.Game.GAME, (snapshot) => {
            ctx.clearRect(0, 0, 500, 500);
            for (const user of snapshot.users) {
                img.src = user._sprite;
                draw(ctx, img, user.x, user.y, user.z);
            }
        });
        return socket;
    }

}