import Cursor from "./ui/Cursor.js";
import Demo from "./demo/Demo.js";

export default class Client {
    constructor() {
        const canvas = document.getElementById("ctx"),
            ctx = canvas.getContext("2d"),
            slider = document.getElementById("slider"),
            checkbox = document.getElementById("checkbox");
        const cursor = new Cursor(),
            demo = new Demo(canvas.width, canvas.height, ctx, slider, checkbox, cursor);

        // updates the cursor whenever the mouse moves
        canvas.addEventListener("mousemove", (event) => {
            const rect = canvas.getBoundingClientRect(),
                x = event.clientX - rect.left,
                y = event.clientY - rect.top;
            cursor.setPosition(x, y);
        });

        // hides the cursor whenever the mouse leaves the canvas
        canvas.addEventListener("mouseenter", () => {
            cursor.setVisibility(true);
        });

        // reveals the cursor whenever the mouse enters the canvas
        canvas.addEventListener("mouseleave", () => {
            cursor.setVisibility(false);
        });

        // toggles the playback speed whenever the mouse releases from a click
        canvas.addEventListener("mouseup", () => {
            demo.toggle();
        });

        document.addEventListener("keyup", (event) => {
            // toggles the playback speed whenever the Escape key releases from a keypress
            if (event.key === "Escape") {
                demo.toggle();
            }
        });
    }
}