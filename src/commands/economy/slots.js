const { EconomyCommand } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "slots",
                type: "economy",
                description: ".",
                usage: "<number of :star:s>",
                saying: "Slots.",
                cooldown: 2
            });
        }

        async main(message) {
            const balance = this.eco.users.getBalance(message.author.id);
            const betAmount = message.params[0] === "all" || message.params[0] === "max" ? balance : +message.params[0];


            if (!balance) return message.send("You are an idiot. You have 0 :star:s.");
            if (!betAmount || betAmount < 0 || betAmount > balance) return message.send("You are an idiot. Give a valid number.");

        }
    };
