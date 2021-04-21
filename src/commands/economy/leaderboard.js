const { EconomyCommand } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "leaderboard",
                type: "economy",
                description: "See your server's leaderboard.",
                usage: "No arguments required.",
                aliases: ["lb"],
                saying: "Scrub.",
                cooldown: 2
            });
        }

        main(msg) {
            const collection = [...msg.guild.members.cache.intersect(this.eco.users.cache).sort((a, b) => b.balance - a.balance).first(10).values()];

            const entries = collection
                .filter(p => p > 0)
                .map((p, i) => [`${i + 1}) \`${msg.guild.members.cache.get(p.id).user.tag}\` | \`${p.balance}\` :star:s`, "\u200b"]);

            if (!entries.length) return msg.send("Y'all are poor.");

            msg.paginate({ title: `${msg.guild.name}'s Leaderboard` }, entries, 5);
        }
    };
