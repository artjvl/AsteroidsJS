export default class Element {
    _color = 'yellow';
    constructor(id, radius, x, y, velocity, angle) {
        this._id = id;
        this._radius = radius;
        this._xPosition = x;
        this._yPosition = y;
        this._xVelocity = velocity * Math.cos(angle);
        this._yVelocity = velocity * Math.sin(angle);
    }
    getId() {
        return this._id;
    }
    setColor(color) {
        this._color = color;
    }
    getRadius() {
        return this._radius;
    }
    getX() {
        return this._xPosition;
    }
    setX(x) {
        this._xPosition = x;
    }
    getY() {
        return this._yPosition;
    }
    setY(y) {
        this._yPosition = y;
    }
    step(timeDelta) {
        this._xPosition += this._xVelocity * timeDelta;
        this._yPosition += this._yVelocity * timeDelta;
    }
    draw(context) {
        context.fillStyle = this._color;
        context.beginPath();
        context.arc(this._xPosition, this._yPosition, this._radius, 0, 2 * Math.PI);
        context.fill();
        // context.fillText(this._id, this._xPosition, this._yPosition)
    }
}