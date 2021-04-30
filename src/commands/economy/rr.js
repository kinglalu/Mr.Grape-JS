const { EconomyCommand, Embed } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "russianroulette",
                type: "economy",
                description: "1/6 chance you lose all your money. 5/6 chance you multiply your bet by 2x.",
                usage: "No arguments required.",
                aliases: ["rr"],
                saying: "Pew pew.",
                cooldown: 2,
                fan: true
            });
        }

        async main(msg) {
            /*
            msg.send("Are you sure you want to do this?");
            
            const verification = await msg.channel.awaitMessages(m => m.author.id === msg.author.id, { max: 1, time: 3500 });

            if (!verification.size) return msg.reply("you're being a chicken");

            const message = verification.first().content.toLowerCase();

            if (message === "yes" || message === "y") {
                const balance = this.eco.users.getBalance(msg.author.id);

                if (super.randomize(6) + 1 === 1) {
                    const survivedEmbed = new Embed()
                        .setTitle(`${msg.author.username}'s revolver`)
                        .addField(`yay! You didn't die... this time... enjoy your ${balance} :star:s!`, "\u200b");

                    this.eco.users.add(msg.author.id, balance);
                    msg.send(survivedEmbed);
                }
                else {
                    const lostEmbed = new Embed()
                        .setTitle(`${msg.author.username}'s revolver`)
                        .addField("You died and lost all your money. RIP.", "\u200b");

                    this.eco.users.add(msg.author.id, -balance);
                    msg.send(lostEmbed);
                }
            }
            else {
                msg.send("Welp ok ig");
            }
        }
        */
        }
    };
