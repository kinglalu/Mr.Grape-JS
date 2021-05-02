const { EconomyCommand } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "hack",
                type: "dev",
                description: "Devs get free money!",
                usage: "<number>",
                aliases: ["hk"],
                saying: "N/A.",
                cooldown: 0
            });
        }

        main(msg) {
            if (!this.client.config.owners.has(msg.author.id)) return msg.send("Back off! Devs only!");

            /*
            const target = message.mentions.users.first();

            if (msg.params[0] === "reset") {
                if (typeof target != "undefined") {
                    this.eco.users.add(target.id, -this.eco.users.getBalance(target.id));
                    return msg.send`Reset Balance for ${target.username}.`;
                } else {
                    this.eco.users.add(msg.author.id, -this.eco.users.getBalance(msg.author.id));
                    return msg.send`Reset Balance for ${msg.author.username}.`;
                }
            }
            if (!+msg.params[0]) return msg.send("That's not a valid number!");
            */

            this.eco.users.add(msg.author.id, +msg.params[0]);

            msg.send("Done!");
        }
    };