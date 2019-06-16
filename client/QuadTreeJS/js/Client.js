import Cursor from "./ui/Cursor.js";
import Demo from "./demo/Demo.js";

export default class Client {
    constructor() {
        const canvas = document.getElementById("ctx"),
            ctx = canvas.getContext("2d"),
            slider = document.getElementById("slider");
        const cursor = new Cursor(),
            demo = new Demo(canvas.width, canvas.height, ctx, slider, cursor);

        canvas.addEventListener("mousemove", (event) => {
            const rect = canvas.getBoundingClientRect(),
                x = event.clientX - rect.left,
                y = event.clientY - rect.top;
            cursor.setPosition(x, y);
        });
        canvas.addEventListener("mouseenter", () => {
            cursor.setVisibility(true);
        });
        canvas.addEventListener("mouseleave", () => {
            cursor.setVisibility(false);
        });
    }
}