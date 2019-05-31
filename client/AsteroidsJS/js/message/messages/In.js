const keyboard = (key) => ({
    key: key
});
const mouse = (x, y) => ({
    x: x,
    y: y
});

export default {
    keyboard: {
        down: {
            id: "KEYBOARD_DOWN",
            data: keyboard
        },
        up: {
            id: "KEYBOARD_UP",
            data: keyboard
        }
    },
    mouse: {
        move: {
            id: "MOUSE_MOVE",
            data: mouse
        },
        down: {
            id: "MOUSE_DOWN",
            data: mouse
        },
        up: {
            id: "MOUSE_UP",
            data: mouse
        }
    }
};