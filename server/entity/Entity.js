import Particle from "./Particle.js";
import Vector2 from "../../client/js/shared/util/vectors/Vector2.js";

export default class Entity extends Particle {
    constructor(position, attitude) {
        super(position, attitude);
    }
    setLinAcceleration(linAcceleration) {
        super.setLinAcceleration(new Vector2(
            - Math.sin(this.getAttitude()) * linAcceleration,
            Math.cos(this.getAttitude()) * linAcceleration
        ));
    }
}