const { EconomyCommand, Embed } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "balance",
                type: "economy",
                description: "Get a user's balance.",
                usage: "<optional user>",
                aliases: ["bal", "wallet"],
                saying: "Your balance is fine.",
                cooldown: 2
            });
        }

        main(msg) {
            const target = msg.mentions.users.first() || msg.author;

            if (target.bot) return msg.send("No other bots (except me, cus im cool)");

            const balEmbed = new Embed()
                .setTitle("Balance")
                .addField(target.username, `${this.eco.users.getBalance(target.id)} :star:s`)
                .setFooter("Grape Bank Inc.");
            msg.send(balEmbed);
        }
    };
