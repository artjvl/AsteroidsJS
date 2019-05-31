import Particle from "./Particle.js";

export default class Entity extends Particle {
    constructor(position, radius, attitude) {
        super(position, attitude);
        this._radius = radius;
    }
    getRadius() {
        return this._radius;
    }
}