const { Op: { or } } = require("sequelize");
const { EconomyCommand, Embed } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "buy",
                type: "economy",
                description: "Buy junk.",
                usage: "<item> <number>",
                aliases: ["purchase"],
                saying: "You have enough junk.",
                cooldown: 5
            });
        }

        async main(msg) {
            const [itemName, number] = super.getNameAmt(msg);

            const item = await this.eco.shop.findOne({
                where: {
                    type: "shop",
                    [or]: {
                        name: itemName,
                        alias: itemName
                    }
                }
            });

            if (!item) return msg.send("That's not a valid item bruh");

            const cost = item.price * number;

            if (cost > this.eco.users.getBalance(msg.author.id)) return msg.send("Ur too broke to buy that");

            await this.eco.items.addItem(msg.author.id, item, number);
            this.eco.users.add(msg.author.id, -cost);

            const receipt = new Embed()
                .setTitle("Purchase")
                .addField("Receipt", `You purchased ${super.format(item.name, number)}!`)
                .setFooter("Grape Marketplaces");
            msg.send(receipt);
        }
    };
