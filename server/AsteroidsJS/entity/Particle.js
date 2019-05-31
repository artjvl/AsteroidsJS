import Vector from "../../util/vector/Vector.js";

export default class Particle {
    LINEAR_ACCELERATION = 400;
    ANGULAR_VELOCITY = 4;
    ANGULAR_ACCELERATION = 12;
    constructor(position, attitude) {
        this._position = position;
        this._linVelocity = new Vector.Cartesian2(0, 0);
        this._linAcceleration = 0;
        this._attitude = attitude;
        this._angVelocity = 0;
        this._angAcceleration = 0;
    }

    /**
     * Getters and setters.
     */
    getPosition() {
        return this._position;
    }
    setLinAcceleration(linAcceleration) {
        this._linAcceleration = linAcceleration;
    }
    getAttitude() {
        return this._attitude;
    }
    setAttitude(attitude) {
        this._attitude = (attitude + (2 * Math.PI)) % (2 * Math.PI);
    }
    setAngAcceleration(angAcceleration) {
        this._angAcceleration = angAcceleration;
    }

    /**
     * Discrete physics update per time-step.
     */
    step(timeDelta) {
        this._stepLinear(timeDelta);
        this._stepAngular(timeDelta);
    }
    _stepLinear(timeDelta) {
        let velocity = this._linVelocity;
        if (this._linAcceleration > 0) {
            velocity = Vector.Cartesian2.add(
                velocity,
                Vector.Cartesian2.generate(
                    this._linAcceleration * timeDelta,
                    this._attitude
                )
            );
        } else if (this.LINEAR_ACCELERATION > 0) {
            velocity = Vector.Cartesian2.scale(
                velocity,
                Math.max(1 - ((this.LINEAR_ACCELERATION * timeDelta) / this._linVelocity.magnitude()), 0)
            );
        }
        const position = Vector.Cartesian2.add(
            this._position,
            Vector.Cartesian2.scale(
                velocity,
                timeDelta
            )
        );
        this._linVelocity = velocity;
        this._position = position;
    }
    _stepAngular(timeDelta) {
        let velocity;
        if (this._angAcceleration !== 0) {
            if (Math.abs(this._angVelocity) < this.ANGULAR_VELOCITY) {
                velocity = this._angVelocity + this._angAcceleration * timeDelta;
            } else {
                velocity = this._angVelocity;
            }

        } else {
            velocity = this._angVelocity * Math.max(1 - ((this.ANGULAR_ACCELERATION * timeDelta) / Math.abs(this._angVelocity)), 0);
        }
        const attitude = this._attitude + velocity * timeDelta;
        this._angVelocity = velocity;
        this.setAttitude(attitude);
    }
}