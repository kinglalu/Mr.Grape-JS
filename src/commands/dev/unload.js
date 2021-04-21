const { Command } = require("../../../lib");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "unload",
                type: "dev",
                description: "Unload commands.",
                usage: "<command to reload>",
                aliases: ["unl"],
                saying: "N/A.",
                cooldown: 0
            });
        }
		
        main(msg) {
            if (!this.client.config.owners.has(msg.author.id)) return msg.send("Back off! Devs only!");
            const command = this.client.commands.delete(msg.params[0].toLowerCase());
            if (!command) return msg.send("Invalid command!");
            return msg.send("Command unloaded!");
        }
    };