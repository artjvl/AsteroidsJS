export default class Vector2 {
    constructor(x, y) {
        this.__x = x;
        this.__y = y;
    }
    getX() {
        return this.__x;
    }
    setX(x) {
        this.__x = x;
    }
    getY() {
        return this.__y;
    }
    setY(y) {
        this.__y = y;
    }
    static add(a, b) {
        return new Vector2(
            a.__x + b.__x,
            a.__y + b.__y
        );
    }
    static subtract(a, b) {
        return new Vector2(
            a.__x - b.__x,
            a.__y - b.__y
        );
    }
    static scale(vector, scalar) {
        return new Vector2(
            vector.__x * scalar,
            vector.__y * scalar
        );
    }
    static dot(a, b) {
        return a.__x * b.__x + a.__y * b.__y;
    }
}