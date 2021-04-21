const { Event } = require("../../../lib");

module.exports =
    class extends Event {
        constructor(...args) {
            super(...args, {
                name: "commandRun"
            });
        }

        main(name, person) {
            this.client.console.log(`Command "${name}" used by ${person.username} | ID: ${person.id}`);
        }
    };