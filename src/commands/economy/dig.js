const { EconomyCommand, Embed } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "dig",
                type: "economy",
                description: "Dig in the mines for ores and more!",
                usage: "No arguments required",
                aliases: ["mine"],
                saying: "Mines will be bare. Chill.",
                cooldown: 30,
                fan: true
            });
        }

        async randOre(id, tier, max) {
            const query = await this.eco.oreStore.findAll({
                where: {
                    tier: tier
                }
            });

            const ore = query[super.randomize(query.length)];
            const randNum = super.randomize(max) + 1;

            await this.eco.ores.addOre(id, ore, randNum);

            return [ore.name, randNum];
        }

        async main(msg) {
            const earn = Math.round(Math.random() * await this.eco.items.getItem(msg.author.id, "shovel") ? 15 : 6) + 1;

            const mineEmbed = new Embed()
                .setTitle(`${msg.author.username}'s mine`)
                .addField(`You dug up ${earn} :star:s!`, "\u200b");

            const choose = async (tier, amt) => {
                const [name, amount] = await this.randOre(msg.author.id, tier, amt);
                mineEmbed.addField(`You got ${super.format(name, amount)}! ${msg.emojis[name]}`, "\u200b");
            };

            const chances = {
                "rainbonite pick": [1, 6, 4, 150],
                "tierthreepick": [2, 3, 7, 100],
                "tiertwopick": [3, 5, 35, 50],
                "tieronepick": [4, 25, 0, 25]
            };

            const amt = {
                "rainbonite pick": [7, 6, 4],
                "tierthreepick": [7, 5, 2],
                "tiertwopick": [5, 3, 1],
                "tieronepick": [3, 1, 0]
            };

            let pickaxe;

            for (const pick of Object.keys(chances)) {
                if (await this.eco.items.getItem(msg.author.id, pick)) pickaxe = pick;
            }

            if (pickaxe) {
                const prob = chances[pickaxe];
                const amts = amt[pickaxe];

                for (const entry in chances[pickaxe]) {
                    if (entry == 3) break;
                    if (super.randomize(prob[entry]) + 1 === 1) await choose(+entry + 1, amts[entry]);
                }

                if (super.randomize(prob[3]) + 1 === 1) {
                    mineEmbed.addField("Uh oh!", "Your pickaxe broke, buy a new one from the shop!");
                    await this.eco.items.deleteItem(msg.author.id, pickaxe);
                }
            }

            this.eco.users.add(msg.author.id, earn);

            msg.send(mineEmbed);
        }
    };