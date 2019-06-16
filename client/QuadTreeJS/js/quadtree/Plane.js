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
    _getCenterX() {
        return this._x + 0.5 * this.width;
    }
    _getCenterY() {
        return this._y + 0.5 * this.height;
    }
    _getLeft() {
        return this._x;
    }
    _setLeft(x) {
        const delta = this._x - x;
        this._x = x;
        this.width += delta;
    }
    _getRight() {
        return this._x + this.width;
    }
    _setRight(x) {
        this.width = x - this._getLeft();
    }
    _getTop() {
        return this._y;
    }
    _setTop(y) {
        const delta = this._y - y;
        this._y = y;
        this.height += delta;
    }
    _getBottom() {
        return this._y + this.height;
    }
    _setBottom(y) {
        this.height = y - this._getTop();
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
        return this._covers(this.constructor.createFromCircle(x, y, radius));
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
                return new Plane(this._getCenterX(), this._getCenterY(), width, height);
            case 2:
                return new Plane(this._getLeft(), this._getCenterY(), width, height);
            case 3:
                return new Plane(this._getLeft(), this._getTop(), width, height);
            case 4:
                return new Plane(this._getCenterX(), this._getTop(), width, height);
        }
    }
    findQuadrant(x, y) {
        console.assert(this.coversPoint(x, y));
        const xPlus = (x >= this._getCenterX()),
            yPlus = (y >= this._getCenterY());
        if (xPlus && yPlus) return 1;
        if (!xPlus && yPlus) return 2;
        if (!xPlus && !yPlus) return 3;
        if (xPlus && !yPlus) return 4;
    }

    draw(context) {
        context.strokeRect(
            this._getLeft(),
            this._getTop(),
            this.width,
            this.height
        );
    }

    /**
     * Private helper methods.
     */
    _covers(plane) {
        return (
            plane._getLeft() >= this._getLeft() &&
            plane._getRight() <= this._getRight() &&
            plane._getTop() >= this._getTop() &&
            plane._getBottom() <= this._getBottom()
        );
    }
    _extend(plane) {
        this._setLeft(Math.min(plane._getLeft(), this._getLeft()));
        this._setRight(Math.max(plane._getRight(), this._getRight()));
        this._setTop(Math.min(plane._getTop(), this._getTop()));
        this._setBottom(Math.max(plane._getBottom(), this._getBottom()));
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