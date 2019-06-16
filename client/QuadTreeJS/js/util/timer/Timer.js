/**
 * Timer class.
 */
export default class Timer {
    constructor() {
        this._lastUpdate = Date.now();
    }

    /**
     * Determines the time-difference (delta) between now and the last update in seconds.
     * @returns {number}    Time since last update in seconds.
     */
    delta() {
        return this.deltaMilliseconds() * 0.001;
    }

    /**
     * Determines the time-difference (delta) between now and the last update in milliseconds.
     * @returns {number}    Time since last update in milliseconds.
     */
    deltaMilliseconds() {
        const now = Date.now(),
            delta = now - this._lastUpdate;
        this._lastUpdate = now;
        return delta;
    }
}