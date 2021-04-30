const { Collection } = require("discord.js");
const { Command } = require("../commands");
const { Store } = require("../base");

module.exports = class extends Store {
    constructor(client, { directory }) {
        super("commands", client, directory, Command);
        this._aliases = new Collection();
    }

    load(dir) {
        const command = super.load(dir);
        if (!command) return;
        if (!command.aliases) return;
        for (const alias of command.aliases) {
            const exists = this._aliases.get(alias);
            if (exists) throw new Error(`Alias "${alias}" used in ${command.name} intersects with ${exists}.`);
            this._aliases.set(alias, command.name);
        }
        return command;
    }

    get(name) {
        return super.get(name) || super.get(this._aliases.get(name));
    }

    has(name) {
        return super.has(name) || this._aliases.has(name);
    }

    clear() {
        super.clear();
        this._aliases.clear();
        return this;
    }

    delete(name) {
        const command = super.get(name);
        command?.aliases?.forEach(alias => this._aliases.delete(alias));
        return super.delete(name);
    }
};