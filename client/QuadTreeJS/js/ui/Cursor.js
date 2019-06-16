export default class Cursor {
    _x = 0;
    _y = 0;
    _visible = false;

    setPosition(x, y) {
        this._x = x;
        this._y = y;
    }
    getX() {
        return this._x;
    }
    getY() {
        return this._y;
    }
    isVisibile() {
        return this._visible;
    }
    setVisibility(visibility) {
        this._visible = visibility;
    }
}