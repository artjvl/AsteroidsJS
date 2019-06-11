/**
 * A bounded rectangular plane used in a quad-tree.
 */
export default class Plane {

    constructor(x, y, width, height) {
        this._x = x;
        this._y = y;
        this.width = width;
        this.height = height;
    }

    /**
     * Private getters and setters.
     */
    _getXCenter() {
        return this._x + 0.5 * this.width;
    }
    _getYCenter() {
        return this._y + 0.5 * this.height;
    }
    _getXMinus() {
        return this._x;
    }
    _setXMinus(x) {
        const delta = this._x - x;
        this._x = x;
        this.width += delta;
    }
    _getXPlus() {
        return this._x + this.width;
    }
    _setXPlus(x) {
        this.width = x - this._getXMinus();
    }
    _getYMinus() {
        return this._y;
    }
    _setYMinus(y) {
        const delta = this._y - y;
        this._y = y;
        this.height += delta;
    }
    _getYPlus() {
        return this._y + this.height;
    }
    _setYPlus(y) {
        this.height = y - this._getYMinus();
    }

    /**
     * Public interface.
     */
    coversPoint(x, y) {
        return this._covers(new this.constructor(x, y, 0, 0));
    }
    coversPlane(x, y, width, height) {
        return this._covers(new this.constructor(x, y, width, height));
    }
    coversCircle(x, y, radius) {
        return this._covers(this.createFromCircle(x, y, radius));
    }

    extendToPoint(x, y) {
        this._extend(new this(x, y, 0, 0));
    }
    extendToPlane(x, y, width, height) {
        this._extend(new this(x, y, width, height));
    }
    extendToCircle(x, y, radius) {
        this._extend(this.constructor.createFromCircle(x, y, radius));
    }

    createQuadrant(num) {
        const width = 0.5 * this.width,
            height = 0.5 * this.height;
        switch (num) {
            case 1:
                return new Plane(this._getXCenter(), this._getYCenter(), width, height);
            case 2:
                return new Plane(this._getXMinus(), this._getYCenter(), width, height);
            case 3:
                return new Plane(this._getXMinus(), this._getYMinus(), width, height);
            case 4:
                return new Plane(this._getXCenter(), this._getYMinus(), width, height);
        }
    }
    findQuadrant(x, y) {
        console.assert(this.coversPoint(x, y));
        const xPlus = (x >= this._getXCenter()),
            yPlus = (y >= this._getYCenter());
        if (xPlus && yPlus) return 1;
        if (!xPlus && yPlus) return 2;
        if (!xPlus && !yPlus) return 3;
        if (xPlus && !yPlus) return 4;
    }

    draw(context) {
        context.strokeRect(
            this._getXMinus(),
            this._getYMinus(),
            this.width,
            this.height
        );
    }

    /**
     * Private helper methods.
     */
    _covers(plane) {
        return (
            plane._getXMinus() >= this._getXMinus() &&
            plane._getXPlus() <= this._getXPlus() &&
            plane._getYMinus() >= this._getYMinus() &&
            plane._getYPlus() <= this._getYPlus()
        );
    }
    _extend(plane) {
        this._setXMinus(Math.min(plane._getXMinus(), this._getXMinus()));
        this._setXPlus(Math.max(plane._getXPlus(), this._getXPlus()));
        this._setYMinus(Math.min(plane._getYMinus(), this._getYMinus()));
        this._setYPlus(Math.max(plane._getYPlus(), this._getYPlus()));
    }

    /**
     * Static method.
     */
    static createFromCircle(x, y, radius) {
        return new Plane(
            x - radius,
            y - radius,
            2 * radius,
            2 * radius
        );
    }
}