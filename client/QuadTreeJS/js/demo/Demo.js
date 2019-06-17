import QuadTree from "../quadtree/QuadTree.js";
import Element from "./Element.js";
import Timer from "../util/timer/Timer.js";

export default class Demo {
    MIN_RADIUS = 12;
    MAX_RADIUS = 24;
    MAX_SPEED = 40;
    _timer = new Timer();
    constructor(width, height, context, slider, checkbox, cursor) {
        this.width = width;
        this.height = height;
        this._context = context;
        this._slider = slider;
        this._checkbox = checkbox;
        this._cursor = cursor;

        this._tree = new QuadTree(width, height, 4, 6);

        this._elements = [];
        for (let i = 0; i < slider.max; i++) {
            this._elements.push(this._generateRandomNode(i));
        }
        // setInterval(() => {this.draw()}, 20)

        window.requestAnimationFrame(this.step);
    }
    step = () => {
        const elements = this._elements.slice(0, this._slider.value);

        // time-step elements
        const delta = this._timer.delta();
        for (const element of elements) {
            element.step(delta);
            element.setX((element.getX() + this.width) % this.width);
            element.setY((element.getY() + this.height) % this.height);
        }

        // fill QuadTree
        this._tree.clear();
        for (const element of elements) {
            element.setColor('yellow');
            this._tree.insert(element.getX(), element.getY(), element.getRadius(), element);
        }

        // detect collisions and change color of colliders to red
        for (const element of elements) {
            const nearby = this._tree.find(element.getX(), element.getY(), element.getRadius());
            for (const neighbour of nearby) {
                if (neighbour.getId() > element.getId() && this._collision(element, neighbour)) {
                    element.setColor('red');
                    neighbour.setColor('red');
                }
            }
        }

        // find cursor-selected elements and change color to blue
        let selected = [];
        if (this._cursor.isVisibile()) {
            selected = this._tree.find(this._cursor.getX(), this._cursor.getY());
        }
        for (const element of selected) {
            element.setColor('blue');
        }

        this.draw(this._context, elements);

        window.requestAnimationFrame(this.step);
    };
    _collision(a, b) {
        return (
            Math.abs(a.getX() - b.getX())**2 + Math.abs(a.getY() - b.getY())**2
            <= (a.getRadius() + b.getRadius())**2
        );
    }
    draw(context, elements) {
        // draw QuadTree
        context.clearRect(0, 0, this.width, this.height);
        if (this._checkbox.checked) {
            this._tree.draw(context);
        }

        // draw active elements
        context.globalAlpha = 0.4;
        for (const element of elements) {
            element.draw(context);
        }
    }
    _generateRandomNode(id) {
        return new Element(
            id,
            this.MIN_RADIUS + (this.MAX_RADIUS - this.MIN_RADIUS) * Math.random(),
            this.width * Math.random(),
            this.height * Math.random(),
            this.MAX_SPEED * Math.random(),
            2 * Math.PI * Math.random()
        );
    }
}