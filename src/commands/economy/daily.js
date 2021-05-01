const { EconomyCommand, Embed } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "daily",
                type: "economy",
                description: "Get your daily stars!",
                usage: "No arguments required",
                aliases: ["dail"],
                saying: "It's called daily for a reason smh.",
                cooldown: 86400
            });
        }

        main(msg) {
            const randStars = super.randomize(25) + 25;

            this.eco.users.add(msg.author.id, randStars);

            const dailyEmbed = new Embed()
                .setTitle("Daily stars!")
                .addField(`${msg.author.username} got`, `**${randStars} :star:s!**`);
                
            msg.send(dailyEmbed);
        }
    };