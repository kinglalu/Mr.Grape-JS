const { Module } = require("../base");

module.exports =
    class extends Module {
        constructor(client, store, { name, once = false }) {
            super(name, client);
            this.once = once;
        }

        updatePresence() {
            this.client.user.setPresence({
                activity: {
                    name: `${this.client.config.prefix}help in ${this.client.guilds.cache.size} servers`,
                    type: "STREAMING",
                    url: "https://www.twitch.tv/MrGrapeTwitch",
                },
            });
        }
    };