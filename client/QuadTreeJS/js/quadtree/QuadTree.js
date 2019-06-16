import Element from "./Element.js";
import Plane from "./Plane.js";


/**
 * An implementation of a loose quad-tree.
 */
export default class QuadTree {

    _root;

    constructor(width, height, maxSize, maxDepth) {
        this.width = width;
        this.height = height;
        this._maxSize = maxSize;
        this._maxDepth = maxDepth;
        this.clear();
    }

    /**
     * Inserts a new element to the quad-tree.
     * @param x         The x-position of the new element.
     * @param y         The y-position of the new element.
     * @param radius    The radius of the new element.
     * @param object    The object linked to the element.
     */
    insert(x, y, radius, object=null) {
        const element = new Element(x, y, radius, object);
        this._root.insert(element);
    }

    /**
     * Finds the elements nearby to the circle described by the given parameters.
     * @param x         The x-position of the circle.
     * @param y         The y-position of the circle.
     * @param radius    The radius of the circle.
     * @returns {*}     The array containing the nearby elements.
     */
    find(x, y, radius=0) {
        return this._root.find(x, y, radius);
    }

    /**
     * Draws the quad-tree on the given context
     * @param context   The context to be drawn on.
     * @param alpha     The alpha (i.e., opacity) value of the drawing.
     */
    draw(context, alpha=0.5) {
        context.globalAlpha = alpha;
        this._root.draw(context);
        context.globalAlpha = 1.0;
    }

    /**
     * Assigns a new node to the quad-tree root.
     * @param node      The new node.
     */
    setRoot(node) {
        this._root = node;
    }

    /**
     * Clears the quad-tree by replacing the root with a new leaf.
     */
    clear() {
        this._root = new Leaf(this, null, 0, new Plane(0, 0, this.width, this.height));
    }

    getMaxDepth() {
        return this._maxDepth;
    }

    getMaxSize() {
        return this._maxSize;
    }
}

/**
 * A node in the loose quad-tree.
 */
class Node {

    _area = null;

    constructor(tree, parent, depth, bounds) {
        this._tree = tree;
        this._parent = parent;
        this._depth = depth;
        this._bounds = bounds;
    }

    /**
     * Inserts an element this node.
     * @param element   The element to be inserted.
     */
    insert(element) {
        throw new TypeError("Subclasses must implement insert()!");
    }

    /**
     * Finds the elements nearby to the circle described by the given parameters.
     * @param x         The x-position of the circle.
     * @param y         The y-position of the circle.
     * @param radius    The radius of the circle.
     */
    find(x, y, radius) {
        throw new TypeError("Subclasses must implement find()!");
    }

    /**
     * Draws the node on the given context.
     * @param context   The context to be drawn on.
     */
    draw(context) {
        this._area.draw(context);
    }
}


/**
 * A leaf-node of the loose quad-tree.
 */
class Leaf extends Node {

    _elements = [];

    constructor(tree, parent, depth, bounds) {
        super(tree, parent, depth, bounds);
    }

    insert(element) {
        console.assert(this._bounds.coversPoint(element.getX(), element.getY()));

        // modifies node area to contain the inserted element
        if (this._area === null) {
            this._area = Plane.createFromCircle(element.getX(), element.getY(), element.getRadius());
        } else {
            this._area.extendToCircle(element.getX(), element.getY(), element.getRadius());
        }

        // adds the element to the tree
        this._elements.push(element);
        if (this._elements.length > this._tree.getMaxSize() && this._depth < this._tree.getMaxDepth()) {
            this._convert();
        }
    }

    find(x, y, radius) {
        return this._elements;
    }

    draw(context) {
        super.draw(context);
        for (const element of this._elements) {
            element.draw(context);
        }
    }

    /**
     * Converts this inner-node to a leaf-node.
     * @private
     */
    _convert() {
        const inner = new Inner(this._tree, this._parent, this._depth, this._bounds, this._area);
        for (const element of this._elements) {
            inner.insert(element);
        }
        if (this._parent === null) {
            this._tree.setRoot(inner);
        } else {
            this._parent._setNode(this, inner);
        }
    }
}

/**
 * An inner-node of the loose quad-tree.
 */
class Inner extends Node {

    _children = [null, null, null, null];

    constructor(tree, parent, depth, bounds, area) {
        super(tree, parent, depth, bounds);
        this._area = area;
    }

    insert(element) {
        console.assert(this._bounds.coversPoint(element.getX(), element.getY()));

        // modifies node area to contain the inserted element
        this._area.extendToCircle(element.getX(), element.getY(), element.getRadius());

        // adds the element to the tree
        this._delegate(element);
    }

    find(x, y, radius) {
        let nearby = [];
        for (const child of this._children) {
            if (child !== null && child._area.coversCircle(x, y, radius)) {
                nearby = nearby.concat(child.find(x, y, radius));
            }
        }
        return nearby;
    }

    draw(context) {
        super.draw(context);
        for (const child of this._children) {
            if (child !== null) {
                child.draw(context);
            }
        }
    }

    /**
     * Delegates insertion of the given element to a child node.
     * @param element   The element to be delegated.
     * @private
     */
    _delegate(element) {
        const quadrant = this._bounds.findQuadrant(element.getX(), element.getY());
        if (this._children[quadrant - 1] === null) {
            this._expand(quadrant);
        }
        this._children[quadrant - 1].insert(element);
    }

    /**
     * Expands this node by 'giving birth' to a child.
     * @param quadrant  The quadrant at which the child should reside.
     * @private
     */
    _expand(quadrant) {
        console.assert(this._children[quadrant - 1] === null);
        console.assert(this._depth < this._tree.getMaxDepth());

        this._children[quadrant - 1] = new Leaf(
            this._tree,
            this,
            this._depth + 1,
            this._bounds.createQuadrant(quadrant)
        );
    }

    /**
     * Replaces a child node {@code old} by another {@code replacement}.
     * @param old           The child node that is replaced.
     * @param replacement   The replacement node.
     * @private
     */
    _setNode(old, replacement) {
        for (let i = 0; i < this._children.length; i++) {
            if (this._children[i] === old) {
                this._children[i] = replacement;
            }
        }
    }
}