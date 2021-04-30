const { Module } = require("../base");

module.exports =
    class extends Module {
        constructor(client, opts = {}) {
            super(opts.name, client);
            this.type = opts.type;
            this.usage = opts.usage;
            this.aliases = opts.aliases;
            this.description = opts.description;
            this.cooldown = opts.cooldown || 2;
            this.saying = opts.saying;
            this.fan = opts.fan || false;
        }
    };