const { EventEmitter } = require("events");

module.exports =
    class extends EventEmitter {
        constructor(time) {
            super();

            if (!time) throw new Error("Timer must have a set time!");

            this.time = time;
            this._setTimer();
        }

        _setTimer() {
            this.timer = setTimeout(() => { this.emit("finish"); }, this.time);
        }

        restart() {
            clearTimeout(this.timer);
            this._setTimer();
        }
    };