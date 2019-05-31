import assert from 'assert';

export default class QuadTree {
    constructor(width, height, maxSize, maxDepth) {
        this._maxSize = maxSize;
        this._maxDepth = maxDepth;
        this._root = new Node(this, null, 0, new Plane(0, 0, width, height));
    }
    insert(element) {
        this._root.insert(element);
    }
    find(element) {
        return this._root.find(element);
    }
    clear() {
        this._root.reset();
    }
    draw() {
        this._root.draw();
    }
    getMaxDepth() {
        return this._maxDepth;
    }
    getMaxSize() {
        return this._maxSize;
    }
}

class Node {
    _children = [null, null, null, null];
    _elements = new Array();
    _area = null;
    constructor(tree, parent, depth, bounds) {
        this._tree = tree;
        this._parent = parent;
        this._depth = depth;
        this._bounds = bounds;
    }
    find(element) {
        let nearby = new Array();
        if (this._elements === null) {
            for (const child of this._children) {
                if (child !== null && child._covers(element)) {
                    nearby = nearby.concat(child.find(element));
                }
            }
        } else {
            nearby = nearby.concat(this._elements);
        }
        return nearby;
    }
    insert(element) {
        assert(this._bounds.contains(element.getPosition()));

        this._extend(element);

        if (this._elements === null) {
            this._delegate(element);
        } else {
            this._elements.push(element);
            if (this._elements.length > this._tree.getMaxSize() && this._depth < this._tree.getMaxDepth()) {
                this._convert();
            }
        }
    }
    reset() {
        this._children = [null, null, null, null];
        this._elements = new Array();
        this._area = null;
    }
    draw(context) {
        context.strokeRect(
            this._area._getXMinus(),
            this._area._getYMinus(),
            this._area.width,
            this._area.height
        );
        if (this._elements === null) {
            for (const child of this._children) {
                if (child !== null) {
                    child.draw(context);
                }
            }
        }
    }
    _covers(element) {
        return this._area.contains(element.getPosition());
    }
    _extend(element) {
        const plane = Plane.create(
            element.getPosition(),
            element.getRadius()
        );
        if (this._area === null) {
            this._area = plane;
        } else {
            this._area.extend(plane);
        }
    }
    _convert() {
        assert(this._elements !== null);

        for (const element of this._elements) {
            this._delegate(element);
        }
        this._elements = null;
    }
    _delegate(element) {
        assert(this._elements === null);

        const quadrant = this._bounds.findQuadrant(element.getPosition());
        if (this._children[quadrant - 1] === null) {
            this._expand(quadrant);
        }
        this._children[quadrant - 1].insert(element);
    }
    _expand(quadrant) {
        assert(this._children[quadrant - 1] === null);
        assert(this._depth < this._tree.getMaxDepth());

        this._children[quadrant - 1] = new Node(
            this._tree,
            this,
            this._depth + 1,
            this._bounds.getQuadrant(quadrant)
        );
    }
}

class Plane {
    constructor(x, y, width, height) {
        this._x = x;
        this._y = y;
        this.width = width;
        this.height = height;
    }
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
    extend(plane) {
        this._setXMinus(Math.min(plane._getXMinus(), this._getXMinus()));
        this._setXPlus(Math.max(plane._getXPlus(), this._getXPlus()));
        this._setYMinus(Math.min(plane._getYMinus(), this._getYMinus()));
        this._setYPlus(Math.max(plane._getYPlus(), this._getYPlus()));
    }
    contains(point) {
        return (
            point.getX() >= this._getXMinus() &&
            point.getX() <= this._getXPlus() &&
            point.getY() >= this._getYMinus() &&
            point.getY() <= this._getYPlus()
        );
    }
    getQuadrant(num) {
        switch (num) {
            case 1:
                return new Plane(this._getXCenter(), this._getYCenter(), 0.5 * this.width, 0.5 * this.height);
            case 2:
                return new Plane(this._getXMinus(), this._getYCenter(), 0.5 * this.width, 0.5 * this.height);
            case 3:
                return new Plane(this._getXMinus(), this._getYMinus(), 0.5 * this.width, 0.5 * this.height);
            case 4:
                return new Plane(this._getXCenter(), this._getYMinus(), 0.5 * this.width, 0.5 * this.height);
        }
    }
    findQuadrant(point) {
        assert(this.contains(point));
        const xPlus = point.getX() >= this._getXCenter(),
            yPlus = point.getY() >= this._getYCenter();
        if (xPlus && yPlus) return 1;
        if (!xPlus && yPlus) return 2;
        if (!xPlus && !yPlus) return 3;
        if (xPlus && !yPlus) return 4;
    }
    static create(center, radius) {
        return new Plane(
            center.getX() - radius,
            center.getY() - radius,
            2 * radius,
            2 * radius
        );
    }
}