/**
 * A general 2-dimensional point class.
 */
export default class Point {

    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    getX() {
        return this._x;
    }

    getY() {
        return this._y;
    }
}