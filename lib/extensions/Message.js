const { Structures } = require("discord.js");
const { PaginatedEmbed } = require("./Embed");
const emojis = require("../../config/emojis");

Structures.extend("Message", Message => {
    return class extends Message {

        get prefix() {
            return this.guild.settings?.prefix || this.client.config.prefix;
        }

        get emojis() {
            return emojis;
        }

        _patch(data) {
            super._patch(data);

            this._parseCommand();
        }

        _parseCommand() {
            const prefix = this.content.startsWith(this.client.mention) ? this.client.mention : this.prefix;

            if (!this.content.startsWith(prefix)) return;

            const [cmd, ...params] = this.content.slice(prefix.length).trim().split(/ +/);
            const command = this.client.commands.get(cmd.toLowerCase());

            if (!command) return;

            [this.command, this.params] = [command, params];
        }

        send(...opts) {
            return this.channel.send(...opts);
        }

        paginate(opts, entries, pageLength) {
            return new PaginatedEmbed(this, opts, entries, pageLength);
        }
    };
});