import Vector from "../../util/vector/Vector.js";

export default class Particle {

    _LINEAR_ACCELERATION;
    _MAX_ANGULAR_VELOCITY;
    _ANGULAR_ACCELERATION;

    constructor(position, linVelocity, attitude, angVelocity) {
        this._position = position;
        this._linVelocity = linVelocity;
        this._linAcceleration = 0;
        this._attitude = attitude;
        this._angVelocity = angVelocity;
        this._angAcceleration = 0;
    }

    /**
     * Public getters and setters.
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
    setAngAcceleration(angAcceleration) {
        this._angAcceleration = angAcceleration;
    }

    /**
     * Private setter.
     */
     _setAttitude(attitude) {
        this._attitude = (attitude + (2 * Math.PI)) % (2 * Math.PI);
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
        } else if (this._LINEAR_ACCELERATION > 0) {
            velocity = Vector.Cartesian2.scale(
                velocity,
                Math.max(1 - ((this._LINEAR_ACCELERATION * timeDelta) / this._linVelocity.magnitude()), 0)
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
            if (Math.abs(this._angVelocity) < this._MAX_ANGULAR_VELOCITY) {
                velocity = this._angVelocity + this._angAcceleration * timeDelta;
            } else {
                velocity = this._angVelocity;
            }

        } else {
            velocity = this._angVelocity * Math.max(1 - ((this._ANGULAR_ACCELERATION * timeDelta) / Math.abs(this._angVelocity)), 0);
        }
        const attitude = this._attitude + velocity * timeDelta;
        this._angVelocity = velocity;
        this._setAttitude(attitude);
    }
}