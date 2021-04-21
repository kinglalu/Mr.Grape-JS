const { Collection } = require("discord.js");

module.exports =
    class {
        constructor() {
            this.cooldowns = new Collection();
        }

        calculateCooldown(now, fans, { cooldown }) {
            const multiplier = Math.pow(0.03, fans) * cooldown;
            console.log(multiplier);
            return multiplier < 1.5 ? now + 1500 : now + (multiplier * 1000);
        }

        format(milliseconds) {
            const time = milliseconds / 1000;
            const pluralize = (amt) => { return amt ? "s" : "" };
            
            const hours = ~~(time / 3600)
            const minutes = ~~((time - 3600 * hours) / 60)
            const seconds = time - 3600 * hours - minutes * 60
        
            const string = `${hours ? `${hours} hour${pluralize(hours)}` : ""} ${minutes ? `${minutes} minute${pluralize(minutes)}` : ""} ${seconds.toFixed(1)} seconds`;
        
            return string.trim();
        }

        main(command, { id, fans }) {
            if (!this.cooldowns.has(command.name)) this.cooldowns.set(command.name, new Collection());

            const now = Date.now();
            const cooldowns = this.cooldowns.get(command.name);
            const cooldown = cooldowns.get(id);

            const setCooldown = command.fan ? this.calculateCooldown(now, fans, command) : now + command.cooldown * 1000;

            if (!cooldown) cooldowns.set(id, setCooldown);

            else if (cooldown > now) return cooldown - now;

            else cooldowns.delete(id);
        }
    };