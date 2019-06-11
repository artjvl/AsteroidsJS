import Entity from "../Entity.js";
import Message from "../../../../client/AsteroidsJS/js/message/Message.js";

export default class SpaceShip extends Entity {

    _LINEAR_ACCELERATION = 400;
    _MAX_ANGULAR_VELOCITY = 4;
    _ANGULAR_ACCELERATION = 12;

    _RADIUS = 40;
    _sprite = Message.img.SHIP_COAST;
    _hitPoints = 100;

    constructor(position, linVelocity, attitude, angVelocity) {
        super(position, linVelocity, attitude, angVelocity);
    }
}