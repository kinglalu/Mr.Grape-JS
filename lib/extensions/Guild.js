const { Structures } = require("discord.js");
const { prefix } = require("../../config");
const { Guilds: guilds } = require("../../database");

Structures.extend("Guild", Guild => {
    return class extends Guild {
        get settings() {
            return guilds.cache.get(this.id);
        }

        async setPrefix(newPrefix) {
            const isSamePrefix = newPrefix === prefix;

            if (this.settings) {
                if (isSamePrefix) {
                    this.settings.destroy();
                    return guilds.cache.delete(this.id);
                }

                this.settings.prefix = newPrefix;
                return this.settings.save();
            }

            else {
                if (isSamePrefix) return;
                const guildEntry = await guilds.create({ id: this.id, prefix: newPrefix });
                return guilds.cache.set(this.id, guildEntry);
            }
        }
    };
});