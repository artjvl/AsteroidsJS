export default class Drawer {
    static drawImage(context, image, x, y, rotation) {
        context.setTransform(1, 0, 0, 1, x, y);
        context.rotate(rotation);
        context.drawImage(image, - 0.5 * image.width, - 0.5 * image.height);
        context.setTransform(1, 0, 0, 1, 0, 0);
    }
}