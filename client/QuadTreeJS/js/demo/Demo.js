import QuadTree from "../quadtree/QuadTree.js";
import Element from "./Element.js";
import Timer from "../util/timer/Timer.js";

export default class Demo {
    MIN_RADIUS = 10;
    MAX_RADIUS = 20;
    MAX_SPEED = 40;
    _timer = new Timer();
    constructor(width, height, context, slider, cursor) {
        this.width = width;
        this.height = height;
        this._context = context;
        this._slider = slider;
        this._cursor = cursor;

        this._tree = new QuadTree(width, height, 4, 6);

        this._elements = [];
        for (let i = 0; i < slider.max; i++) {
            this._elements.push(this._generateRandomNode());
        }
        // setInterval(() => {this.draw()}, 20)
        window.requestAnimationFrame(this.draw);
    }
    draw = () => {
        // time-step elements
        const delta = this._timer.delta();
        for (const element of this._elements) {
            element.step(delta);
            element.setX((element.getX() + this.width) % this.width);
            element.setY((element.getY() + this.height) % this.height);
        }

        // fill QuadTree
        this._tree.clear();
        for (const element of this._elements.slice(0, this._slider.value)) {
            this._tree.insert(element.getX(), element.getY(), element.getRadius(), element);
        }

        // find cursor-selected elements
        let selected = [];
        if (this._cursor.isVisibile()) {
            selected = this._tree.find(this._cursor.getX(), this._cursor.getY());
        }

        // draw QuadTree
        this._context.clearRect(0, 0, this.width, this.height);
        this._tree.draw(this._context);

        // draw cursor-selected elements
        for (const element of selected) {
            element.getObject().draw(this._context);
        }
        window.requestAnimationFrame(this.draw);
    };
    _generateRandomNode() {
        return new Element(
            this.MIN_RADIUS + (this.MAX_RADIUS - this.MIN_RADIUS) * Math.random(),
            this.width * Math.random(),
            this.height * Math.random(),
            this.MAX_SPEED * Math.random(),
            2 * Math.PI * Math.random()
        );
    }
}