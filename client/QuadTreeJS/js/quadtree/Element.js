import Point from "./Point.js";


/**
 * QuadTree element storing the midpoint (x, y) and the radius signifying the extreme points from the midpoint
 * of the given object.
 */
export default class Element extends Point {

    constructor(x, y, radius, object) {
        super(x, y);
        this._radius = radius;
        this._object = object;
    }

    getRadius() {
        return this._radius;
    }

    getObject() {
        return this._object;
    }

    draw(context) {
        context.beginPath();
        context.arc(this._x, this._y, this._radius, 0, 2 * Math.PI);
        context.stroke()
    }
}