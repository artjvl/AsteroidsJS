import Message from "./shared/messages/Message.js";

const ctx = document.getElementById("ctx").getContext("2d");

const socket = io();

document.addEventListener('keydown', function(event) {
    socket.emit(Message.Keyboard.DOWN, new Message.Keyboard(event.code));
});
document.addEventListener("keyup", function(event) {
    socket.emit(Message.Keyboard.UP, new Message.Keyboard(event.code));
});

const img = new Image();
img.src = './client/img/ship_coast.png';

function draw(context, image, x, y, rotation) {
    context.setTransform(1, 0, 0, 1, x, y); // sets scale and origin
    context.rotate(rotation);
    context.drawImage(img, - 0.5 * img.width, - 0.5 * img.height);
    context.setTransform(1,0,0,1,0,0);
}

socket.on(Message.Snapshot.SNAPSHOT, (snapshot) => {
    ctx.clearRect(0, 0, 500, 500);
    for (const user of snapshot.users) {
        draw(ctx, img, user.x, user.y, user.z);
    }
});