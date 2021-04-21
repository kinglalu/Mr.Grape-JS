const { Event } = require("../../../lib");

module.exports =
    class extends Event {
        constructor(...args) {
            super(...args, {
                name: "guildCreate",
            });
        }

        main(guild) {
            this.client.console.log(`I joined ${guild.name}!`);
            super.updatePresence();
        }
    };