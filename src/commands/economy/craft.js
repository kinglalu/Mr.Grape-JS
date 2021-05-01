const { Op: { or } } = require("sequelize");
const { EconomyCommand, Embed } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "craft",
                type: "economy",
                description: "Craft an item using ores!.",
                usage: "<item> <amt>",
                aliases: ["make", "create"],
                saying: "Give yourself a rest.",
                cooldown: 2,
                fan: true
            });
        }

        async main(msg) {
            const [item, quantity] = super.getNameAmt(msg);

            const craft = await this.eco.shop.findOne({
                where: {
                    type: "craft",
                    [or]: {
                        name: item,
                        alias: item
                    }
                }
            });

            if (!craft) return msg.send`${item} isn't listed in the marketplace.`;

            const itemDescription = super.format(craft.name, quantity);

            for (const [ingredient, amount] of Object.entries(craft.recipe)) {
                const part = await this.eco.ores.getOre(msg.author.id, ingredient, true);

                if (!part || part.amount <= amount * quantity) return msg.send(`You don't have enough ${ingredient}s to make ${itemDescription}.`);

                part.amount -= amount * quantity;
                part.save();
            }

            await this.eco.items.addItem(msg.author.id, craft, quantity);

            const craftEmbed = new Embed()
                .setTitle("Crafting")
                .addField("Success!", `You crafted ${itemDescription}!`);
                
            msg.send(craftEmbed);
        }
    };
