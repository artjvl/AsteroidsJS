export default class Timer {
    constructor() {
        this._lastUpdate = Date.now();
    }
    delta() {
        const now = Date.now(),
            delta = now - this._lastUpdate;
        this._lastUpdate = now;
        return delta;
    }
}