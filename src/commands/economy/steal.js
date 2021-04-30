const { EconomyCommand, Embed } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "steal",
                type: "economy",
                description: "Get a user's balance.",
                usage: "<user>",
                aliases: ["rob", "mug"],
                saying: "Your balance is fine.",
                cooldown: 60
            });
        }

        async main(msg) {
            const target = msg.mentions.users.first();

            if (!target || target.bot) return msg.send("That's not a valid person to ~~steal~~ forcefully borrow from!");

            const robber = this.eco.users.getBalance(msg.author.id);
            const mugged = this.eco.users.getBalance(target.id);

            if (robber < 10) return msg.send("Get at least 10 :star:s to rob some n00bs");
            if (mugged < 10) return msg.send("Don't mug the poor guy.")


            const hasLockpick = await this.eco.items.getItem(msg.author.id, "lockpick");

            if (!hasLockpick) {
                const number = super.randomize(3) + 1;
                const lockEmbed = new Embed()
                    .setTitle(`${msg.author.username}'s heist against ${target.username}`)
                    .addField("Crack the safe!", "Pick a number from 1 - 3, if you pick the right number the safe will be cracked, if not then rip\nYou have 7 seconds, go!");
                msg.send(lockEmbed);

                const collector = await msg.channel.awaitMessages(m => m.author.id === msg.author.id, { max: 1, time: 7100 });

                const message = collector.first().content;

                if (!collector.size || +message !== number) {
                    const loss = Math.floor(0.05 * robber);

                    const lockEmbed = new Embed()
                        .setTitle("Lock Failed!")
                        .addField("Fail", `You couldn't crack it correctly, and you lost ${loss} :star:s!`);
                    msg.send(lockEmbed);

                    return this.eco.users.add(msg.author.id, -loss);
                }
            }

            const chances = hasLockpick ? super.randomize(2) : super.randomize(4);
            const percentage = +(Math.random() * 0.06 + 0.01).toFixed(2);

            if (!chances) {
                const earnings = Math.floor(percentage * mugged) + 2;

                const successEmbed = new Embed()
                    .setTitle(`${msg.author.username}'s heist against ${target.username}`)
                    .addField("Success", `You got through and got ${earnings} :star:s!`);
                msg.send(successEmbed);

                return this.eco.users.add(msg.author.id, earnings);
            }

            else {
                const losses = Math.floor(percentage * robber) + 2;

                const successEmbed = new Embed()
                    .setTitle(`${msg.author.username}'s heist against ${target.username}`)
                    .addField("Fail", `RIP, despite ur effort, you got caught and lost ${losses} :star:s.`);
                msg.send(successEmbed);

                return this.eco.users.add(msg.author.id, -losses);
            }
        }
    };