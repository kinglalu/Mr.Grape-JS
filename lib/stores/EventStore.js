const { Event } = require("../events");
const { Store } = require("../base");

module.exports = class extends Store {
    constructor(client, { directory }) {
        super("events", client, directory, Event);
    }

    load(dir) {
        const event = super.load(dir);
        const func = event.main.bind(event);
        this.client[event.once ? "once" : "on"](event.name, func);
        return event;
    }
};