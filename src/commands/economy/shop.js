const { EconomyCommand, Embed } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "shop",
                type: "economy",
                description: "Display the shop.",
                usage: "No arguments required.",
                aliases: ["mall", "imadivaandiloveshopping"],
                saying: "You dont need to buy that much.",
                cooldown: 2
            });
        }

        async main(msg) {
            const shop = await this.eco.shop.findAll({ where: { type: "shop" } });

            const shopEntry = shop
                .sort((a, b) => a.price - b.price)
                .map(item => [item.name, item.description, item.price]);

            const shopEmbed = new Embed()
                .setTitle("Shop")
                .setDescription(`Buy an item by using ${msg.prefix}buy <itemname>!`);

            for (const [name, description, price] of shopEntry) {
                shopEmbed.addField(`${name.charAt(0).toUpperCase()}${name.slice(1)}`,
                    `${description}\nCost: **${price}:star:s**`
                );
            }

            msg.send(shopEmbed);
        }
    };