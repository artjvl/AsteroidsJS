import Vector2 from "../../client/js/shared/util/vectors/Vector2.js";

export default class Particle {
    constructor(position, attitude) {
        this.__position = position;
        this.__linVelocity = new Vector2(0, 0);
        this.__linAcceleration = new Vector2(0, 0);
        this.__attitude = attitude;
        this.__angVelocity = 0;
        this.__angAcceleration = 0;
    }
    getPosition() {
        return this.__position;
    }
    getLinVelocity() {
        return this.__linVelocity;
    }
    setLinAcceleration(linAcceleration) {
        this.__linAcceleration = linAcceleration;
    }
    getAttitude() {
        return this.__attitude;
    }
    setAttitude(attitude) {
        this.__attitude = (attitude + (2 * Math.PI)) % (2 * Math.PI);
    }
    getAngVelocity() {
        return this.__angVelocity;
    }
    setAngAcceleration(angAcceleration) {
        this.__angAcceleration = angAcceleration;
    }
    step(timeDelta) {
        this.__linVelocity = Vector2.add(this.__linVelocity, Vector2.scale(this.__linAcceleration, timeDelta));
        this.__position = Vector2.add(this.__position, Vector2.scale(this.__linVelocity, timeDelta));

        this.__angVelocity = this.__angVelocity + this.__angAcceleration * timeDelta;
        this.setAttitude(this.__attitude + this.__angVelocity * timeDelta);

        // this.__velocity.setX(this.__velocity.getX() + this.__acceleration.getX() * timeDelta);
        // this.__position.setX(this.__position.getX() + this.__velocity.getX() * timeDelta);

        // this.__velocity.setY(this.__velocity.getY() + this.__acceleration.getY() * timeDelta);
        // this.__position.setY(this.__position.getY() + this.__velocity.getY() * timeDelta);
    }
}