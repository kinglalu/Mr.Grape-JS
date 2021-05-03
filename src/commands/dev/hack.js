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

            const target = msg.mentions.users.first() || msg.author;

            if (msg.params[0] === "reset") {
                this.eco.users.add(target.id, -this.eco.users.getBalance(target.id));
                return msg.send(`Reset Balance for ${target.username}.`.toString());
            }
            else if (!+msg.params[0]) return msg.send("That's not a valid number!");

            this.eco.users.add(target.id, +msg.params[0]);

            msg.send("Done!");
        }
    };