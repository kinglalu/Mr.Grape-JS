const { EconomyCommand, Embed } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "refine",
                type: "economy",
                description: "Get a user's balance.",
                usage: "<ore> <amount>",
                aliases: ["rf"],
                saying: "Chill on the refining.",
                cooldown: 2
            });
        }

        async main(msg) {
            const details = {
                cost: 0,
                amount: 0,
                data: ""
            };

            if (msg.params[0] === "all" && msg.params.length === 1) {
                const ores = await this.eco.ores.findAll({ 
                    where: { user_id: msg.author.id, refined: false },
                    include: "data"
                });

                if (!ores.length) return msg.send("There's nothing to refine!");

                details.cost = ores.reduce((a, r) => a + r.amount * r.data.price, 0);
            
                if (details.cost > this.eco.users.getBalance(msg.author.id)) return msg.send("~~ur too broke to do that~~");

                for (const ore of ores) {
                    details.amount += ore.amount;
                    ore.refine();
                }

                details.data += "all";
            }
            else {
                const all = msg.params.some(p => p === "all");

                const parsedText = all ? msg.params.filter(p => p !== "all").join("") : super.getNameAmt(msg);
                const ore = await this.eco.ores.getOre(msg.author.id, all ? parsedText : parsedText[0]);

                if (!ore) return msg.send("That's not a valid item to refine!");

                const amount = all ? ore.amount : parsedText[1];
                const oreData = await ore.getData();

                details.cost += amount * oreData.price;

                if (amount > ore.amount) return msg.send("That's more ores than you have!");
                if (details.cost > this.eco.users.getBalance(msg.author.id)) return msg.send(`You can't refine your ${amount} ${ore.name} ores!`);

                details.amount += ore.amount;
                details.data += oreData.name;

                ore.refine(amount);
            }

            if (await this.eco.items.getItem(msg.author.id, "personal refinery")) details.cost = 0;

            this.eco.users.add(msg.author.id, -details.cost);

            const refinedEmbed = new Embed()
                .setTitle("Refinement")
                .addField(msg.author.username,
                    `Refined their ${details.amount} ${details.data === "all" ? "ore" : details.data}${details.amount > 1 ? "s" : ""} for 
                    ${details.cost} :star:s ${!details.cost ? "because they have a personal refiner (flexx)" : ""}
                    `
                );
            msg.send(refinedEmbed);
        }
    };
