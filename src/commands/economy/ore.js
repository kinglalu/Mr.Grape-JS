const { EconomyCommand, Embed } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "ore",
                type: "economy",
                description: "Display ores you can buy.",
                usage: "No arguments required.",
                aliases: ["ores"],
                saying: "Ore you ok.",
                cooldown: 2
            });
        }

        async main(msg) {
            const ores = await this.eco.oreStore.findAll();

            const getOres = (tier) => {
                return ores
                    .filter(o => o.tier === tier)
                    .sort((o, p) => o.name.localeCompare(p.name))
                    .map(o => `${o.name.charAt(0).toUpperCase()}${o.name.slice(1)} ${msg.emojis[o.name]}`)
                    .join(", ");
            };

            const oreEmbed = new Embed()
                .setTitle("Ores")
                .setDescription("A list of ores you can obtain by mining.")
                .addFields(
                    { name: "Tier 1", value: getOres(1) },
                    { name: "Tier 2", value: getOres(2) },
                    { name: "Tier 3", value: getOres(3) },
                    { name: "Pickaxes", value: "Check out the shop for a list of pickaxes!" }
                );

            msg.send(oreEmbed);
        }
    };
