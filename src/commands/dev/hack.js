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

            if (msg.params[0] === "reset") {
                this.add(msg.author.id, -this.getBalance(msg.author.id));
                return msg.send("Reset Balance!");
            }
            if (!+msg.params[0]) return msg.send("That's not a valid number!");

            this.eco.users.add(msg.author.id, +msg.params[0]);

            msg.send("Done!");
        }
    };