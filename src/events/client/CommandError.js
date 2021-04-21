const { Event } = require("../../../lib");

module.exports =
    class extends Event {
        constructor(...args) {
            super(...args, {
                name: "commandError"
            });
        }

        main(name, err) {
            this.client.console.error(`Command "${name}" failed.\n${err.stack}`);
        }
    };