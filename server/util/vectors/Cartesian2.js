import Vector2 from "./Vector2.js";

export default class Cartesian2 extends Vector2 {
    constructor(x, y) {
        super(x, y);
    }
    magnitude() {
        return Math.sqrt(Math.pow(this.getX(),2) + Math.pow(this.getY(), 2));
    }
    angle() {
        return Math.asin(- this.getX()/this.getY());
    }
    static generate(magnitude, angle) {
        return new this(
            - Math.sin(angle) * magnitude,
            Math.cos(angle) * magnitude
        )
    }
}