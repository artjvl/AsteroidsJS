import Entity from "../Entity.js";

export default class Asteroid extends Entity {

    _LINEAR_ACCELERATION = 100;
    _MAX_ANGULAR_VELOCITY = 10;
    _ANGULAR_ACCELERATION = 0;

    _RADIUS = 40;
    _hitPoints = 40;

    constructor(position, linVelocity, attitude, angVelocity, size) {
        super(position, linVelocity, attitude, angVelocity);
        this._RADIUS = size;
    }
}