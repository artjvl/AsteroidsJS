import QuadTree from "./quadtree/QuadTree.js";

export default class Client {
    constructor() {
        this.self = this;
        const canvas = document.getElementById("ctx")
        this._ctx = canvas.getContext("2d");
        this._tree = new QuadTree(canvas.width, canvas.height, 4, 4);
        this._n = 400;
        this.build();
        // window.requestAnimationFrame(this.draw);
    }
    draw = () => {
        for (let i = 0; i < this._n; i++) {
            const x = Math.random() * 800,
                y = Math.random() * 800,
                radius = 10 + Math.random() * 10;
            this._tree.insert(x, y, radius);
            this._ctx.beginPath();
            this._ctx.arc(x, y, radius, 0, 2 * Math.PI);
            this._ctx.stroke()
        }
        this._tree.draw(this._ctx);
    };
    build = () => {

        setInterval(() => {
            this._ctx.clearRect(0, 0, 800, 800);
            const x = Math.random() * 800,
                y = Math.random() * 800,
                radius = 10 + Math.random() * 10;
            this._tree.insert(x, y, radius);
            this._tree.draw(this._ctx);
        }, 500);
    }
}