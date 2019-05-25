export default class Mouse {
    static MOVE = "MOUSE MOVE";
    static DOWN = "MOUSE_DOWN";
    static UP = "MOUSE UP";
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}