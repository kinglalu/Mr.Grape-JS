const Command = require("./Command");

module.exports =
    class extends Command {
        constructor(client, store, { requiredPermissions, botPermissions = requiredPermissions, ...args }) {
            super(client, store, args);
            this.requiredPermissions = requiredPermissions;
            this.botPermissions = botPermissions;
        }
    };