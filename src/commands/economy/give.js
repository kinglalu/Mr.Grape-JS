// FIXED COMMAND

const { EconomyCommand, Embed } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "give",
                type: "economy",
                description: "Give :star:s to a user!",
                usage: "<optional user>",
                aliases: ["gift", "donate"],
                saying: "Chill on the genorosity.",
                cooldown: 5
            });
        }

        main(msg) {
            const target = msg.mentions.users.first();
            const balance = this.eco.users.getBalance(msg.author.id);
            const limit = 1000;

            const number = msg.params.find(e => e === "all" || e === "max") ? balance : +msg.params.find(n => parseInt(n));

            if (!number || number < 0 || number > balance) return msg.send(`~~ur too broke to give that much away~~`);
            if (target.id === msg.author.id) return msg.send("That's not a valid person to give :star:s to.")
            if (number >= limit) return msg.send`You can't send more or equal to ${limit}`;

            this.eco.users.add(target.id, number);

            this.eco.users.add(msg.author.id, -number);

            const giveEmbed = new Embed()
                .setTitle("Donation")
                .addField(`${msg.author.username}`, `gave ${number} :star:s to ${target.username}.`);

            msg.send(giveEmbed);
        }
    };