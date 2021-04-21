const { EconomyCommand } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "inventory",
                type: "economy",
                description: "See your inventory.",
                usage: "<optional user>",
                aliases: ["inv"],
                saying: "Your inventory is fine.",
                cooldown: 2
            });
        }

        format(item, amt) {
            const string = `${item.charAt(0).toUpperCase()}${item.slice(1)}`;
            return `${string}${amt > 1 ? "s" : ""}`;
        }

        async main(msg) {
            const target = msg.mentions.users.first() || msg.author;

            if (target.bot) return msg.send("No other bots (except me, cus im cool)");

            const inventory = await this.eco.items.findAll({
                where: { user_id: target.id },
                include: "data"
            });

            const items = inventory
                .sort((a, b) => a.data.name.localeCompare(b.data.name))
                .map(item => [this.format(item.data.name, item.amount), item.amount]);

            const entries = items.length ? items : [["nothing but cobwebs and dust m8", "\u200b"]];

            msg.paginate({ title: `${target.username}'s inventory` }, entries, 5);
        }
    };