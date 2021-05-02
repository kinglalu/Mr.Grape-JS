// FIXED COMMAND
// TODO: Merge with inventory command

const { EconomyCommand } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "invore",
                type: "economy",
                description: "See your ore inventory.",
                usage: "<optional user>",
                aliases: ["io"],
                saying: "Your ore inventory is fine.",
                cooldown: 2
            });
        }

        async main(msg) {
            const target = msg.mentions.users.first() || msg.author;

            const inventory = await this.eco.ores.findAll({
                where: { user_id: target.id },
                include: "data"
            });

            const items = inventory
                .sort((a, b) => a.data.name.localeCompare(b.data.name))
                .map(ore => [`${msg.emojis[ore.data.name]} - ${ore.refined ? "Refined" : ""} ${ore.data.name.charAt(0).toUpperCase()}${ore.data.name.slice(1)}`, ore.amount]);

            const entries = items.length ? items : [["nothing but cobwebs and pebbles m8", "‎"]];

            msg.paginate({ title: `${target.username}'s inventory` }, entries, 5);
        }
    };