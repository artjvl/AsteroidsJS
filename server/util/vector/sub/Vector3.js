export default class Vector3 {
    constructor(x, y, z) {
        this.__x = x;
        this.__y = y;
        this.__z = z;
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
    getZ() {
        return this.__z;
    }
    setZ(z) {
        this.__z = z;
    }
    static add(a, b) {
        return new Vector3(
            a.__x + b.__x,
            a.__y + b.__y,
            a.__z + b.__z
        );
    }
    static subtract(a, b) {
        return new Vector3(
            a.__x - b.__x,
            a.__y - b.__y,
            a.__z - b.__z
        );
    }
    static scale(vector, scalar) {
        return new Vector3(
            vector.__x * scalar,
            vector.__y * scalar,
            vector.__z * scalar
        );
    }
    static cross(a, b) {
        return new Vector3(
            a.__y * b.__z - a.__z * b.__y,
            a.__z * b.__x - a.__x * b.__z,
            a.__x * b.__y - a.__y * b.__x
        );
    }
    static dot(a, b) {
        return a.__x * b.__x + a.__y * b.__y + a.__z * b.__z;
    }
}