const Timer = require("./Timer");
const { Collection } = require("discord.js");
const { UserItems } = require("../../database");

module.exports =
    class {
        constructor() {
            this.cooldowns = new Collection();
        }

        calculateCooldown(fans, cooldown) {
            const multiplier = (1 - 0.03 * fans) * (cooldown * 1000);
            return multiplier > 1.5 ? multiplier : 1500;
        }

        format(milliseconds) {
            const time = milliseconds / 1000;
            const pluralize = (amt) => { return amt !== 1 ? "s" : ""; };

            const hours = ~~(time / 3600);
            const minutes = ~~((time - 3600 * hours) / 60);
            const seconds = time - 3600 * hours - minutes * 60;

            const string = `${hours ? `${hours} hour${pluralize(hours)}` : ""} ${minutes ? `${minutes} minute${pluralize(minutes)}` : ""} ${seconds.toFixed(1)} seconds`;

            return string.trim();
        }

        async main(command, id) {
            if (!this.cooldowns.has(command.name)) this.cooldowns.set(command.name, new Collection());

            const now = Date.now();
            const cooldowns = this.cooldowns.get(command.name);
            const cooldown = cooldowns.get(id);

            const fans = command.fan ? await UserItems.getItem(id, "fan") : 0;
            const increment = command.fan ? this.calculateCooldown(fans, command.cooldown) : command.cooldown * 1000;

            if (!cooldown) {
                cooldowns.set(id, now + increment);

                const timer = new Timer(increment);

                timer.on("finish", () => { cooldowns.delete(id); });
            }

            else return cooldown - now;
        }
    };