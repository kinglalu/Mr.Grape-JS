const { Event } = require("../../../lib");

module.exports =
    class extends Event {
        constructor(...args) {
            super(...args, {
                name: "guildDelete",
            });
        }

        main(guild) {
            this.client.console.log(`I left ${guild.name}.`);
            super.updatePresence();
        }
    };