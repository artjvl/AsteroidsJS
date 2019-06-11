import Entity from "../Entity.js";

export default class Projectile extends Entity {

    _LINEAR_ACCELERATION = 100;
    _MAX_ANGULAR_VELOCITY = 0;
    _ANGULAR_ACCELERATION = 0;

    _RADIUS = 10;
    _hitPoints = 10;

    constructor(position, linVelocity, attitude, angVelocity) {
        super(position, linVelocity, attitude, angVelocity);
    }
}