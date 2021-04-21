const { Op: { or } } = require("sequelize");
const { EconomyCommand, Embed } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "sell",
                type: "economy",
                description: "Get a user's balance.",
                usage: "<ore> <amount>",
                saying: "This ain't a bazaar bud.",
                cooldown: 2
            });
        }

        async main(msg) {
            const all = msg.params.some(p => p === "all");
            const parse = all ? msg.params.filter(p => p !== "all") : super.getNameAmt(msg);
            const parsedItem = all ? parse : parse[0];

            const refined = parsedItem.startsWith("refined");

            const oreName = refined ? parsedItem.substr(8) : parsedItem;

            const sale = { type: "shop", item: null };

            const item = await this.eco.shop.findOne({
                where: {
                    [or]: {
                        name: parsedItem,
                        alias: parsedItem
                    }
                }
            });

            const ore = await this.eco.ores.getOre(msg.author.id, oreName, refined);

            ore ? sale.type = "ore" : null;
            ore ? sale.item = await ore.getData() : sale.item = item;

            if (!sale.item) return msg.send("That's not a valid item!");

            const itemEntry =
                sale.type === "shop" ?
                    await this.eco.items.findOne({ where: { user_id: msg.author.id, item_id: sale.item.id } }) : ore;

            const quantity = all ? itemEntry.amount : parse[1];

            if (quantity > itemEntry.amount) return msg.send(`You don't have that many ${sale.item.name}'s!`);

            itemEntry.amount -= quantity;
            itemEntry.amount ? itemEntry.save() : itemEntry.destroy();

            let profit = quantity * sale.item.price;

            refined ? profit *= 2 : sale.type === "shop" ? profit /= 2 : null;

            this.eco.users.add(msg.author.id, profit);

            const sellEmbed = new Embed()
                .setTitle("Sale")
                .addField(`${msg.author.username} sold`, `${super.format(parsedItem, quantity)} ${sale.type === "ore" ? msg.emojis[oreName] : " "} for ${profit} :star:s!`);
            msg.send(sellEmbed);
        }
    };
