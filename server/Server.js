export default class Server {
    constructor(sockets) {
        sockets.on('connection', function(socket) {
            const user = new User(game, socket, Math.random());
            game.addUser(user);
        });
    }
}