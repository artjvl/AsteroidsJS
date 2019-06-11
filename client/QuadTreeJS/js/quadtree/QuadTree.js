import Element from "./Element.js";
import Plane from "./Plane.js";

/**
 * An implementation of a loose quad-tree.
 */
export default class QuadTree {
    constructor(width, height, maxSize, maxDepth) {
        this._maxSize = maxSize;
        this._maxDepth = maxDepth;
        this._root = new Node(this, null, 0, new Plane(0, 0, width, height));
    }
    insert(x, y, radius, object=null) {
        const element = new Element(x, y, radius, object);
        this._root.insert(element);
    }
    find(x, y, radius=0) {
        return this._root.find(x, y);
    }
    clear() {
        this._root.reset();
    }
    draw(context) {
        this._root.draw(context);
    }
    getMaxDepth() {
        return this._maxDepth;
    }
    getMaxSize() {
        return this._maxSize;
    }
}

/**
 * A node in the loose quad-tree that can be a leaf ({@link _children} equal to null), or an inner node
 * ({@link _children} not equal to null).
 */
class Node {
    _children = [null, null, null, null];
    _elements = [];
    _area = null;
    constructor(tree, parent, depth, bounds) {
        this._tree = tree;
        this._parent = parent;
        this._depth = depth;
        this._bounds = bounds;
    }
    find(x, y, radius) {
        let nearby = [];
        if (this._elements === null) {
            for (const child of this._children) {
                if (child !== null && child._area.coversCircle(x, y, radius)) {
                    nearby = nearby.concat(child.find(x, y, radius));
                }
            }
        } else {
            nearby = nearby.concat(this._elements);
        }
        return nearby;
    }
    insert(element) {
        console.assert(this._bounds.coversPoint(element.getX(), element.getY()));

        // modifies node area to contain the inserted element
        if (this._area === null) {
            this._area = Plane.createFromCircle(element.getX(), element.getY(), element.getRadius());
        } else {
            this._area.extendToCircle(element.getX(), element.getY(), element.getRadius());
        }

        // adds the element to the tree by either adding it to itself or delegating it to a child node
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
        this._elements = [];
        this._area = null;
    }
    draw(context) {
        this._area.draw(context);
        if (this._elements === null) {
            for (const child of this._children) {
                if (child !== null) {
                    child.draw(context);
                }
            }
        } else {
            for (const element of this._elements) {
                element.draw(context);
            }
        }
    }
    _convert() {
        console.assert(this._elements !== null);

        for (const element of this._elements) {
            this._delegate(element);
        }
        this._elements = null;
    }
    _delegate(element) {
        const quadrant = this._bounds.findQuadrant(element.getX(), element.getY());
        if (this._children[quadrant - 1] === null) {
            this._expand(quadrant);
        }
        this._children[quadrant - 1].insert(element);
    }
    _expand(quadrant) {
        console.assert(this._children[quadrant - 1] === null);
        console.assert(this._depth < this._tree.getMaxDepth());

        this._children[quadrant - 1] = new Node(
            this._tree,
            this,
            this._depth + 1,
            this._bounds.createQuadrant(quadrant)
        );
    }
}