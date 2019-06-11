import Particle from "./Particle.js";
import Message from "../../../client/AsteroidsJS/js/message/Message.js";

export default class Entity extends Particle {

    _RADIUS;
    _sprite;
    _hitPoints;

    constructor(id, position, linVelocity, attitude, angVelocity) {
        super(position, linVelocity, attitude, angVelocity);
        this.id = id;
    }
    getId() {
        return this.id;
    }
    getRadius() {
        return this._RADIUS;
    }
    getSprite() {
        return this._sprite;
    }
    reduceHitPoints(delta) {
        this._hitPoints = Math.max(0, this._hitPoints - delta);
    }
    generateSnapshot() {
        return Message.game.util.entity(
            this.getId(),
            Math.round(this.getPosition().getX()),
            Math.round(this.getPosition().getY()),
            this.getAttitude(),
            this.getSprite()
        );
    }

}