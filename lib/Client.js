const { Client } = require("discord.js");
const { CommandStore, EventStore } = require("./stores");
const { Console } = require("./utils");

require("./extensions");

module.exports =
    class extends Client {
        constructor(...opts) {

            super(...opts);

            this._registry = ["commands", "events"];

            this.config = require("../config");

            this.console = new Console();

            this.commands = new CommandStore(this, {
                directory: "./commands"
            });

            this.events = new EventStore(this, {
                directory: "./events"
            });
        }

        get invite() {
            return `https://discord.com/oauth2/authorize?client_id=${this.user.id}&scope=bot&permissions=0`;
        }

        get mention() {
            return `<@!${this.user.id}>`;
        }

        async login() {
            try {
                this._registry.forEach(store => {
                    this.console.success(`Loaded ${this[store].init().size} modules in ${store}!`);
                });
            } catch (err) {
                this.console.error(err);
            }

            super.login();
        }
    };