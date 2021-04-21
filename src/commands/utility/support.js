const { Command, Embed } = require("../../../lib");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "support",
                type: "utility",
                description: "View the people that helped support Mr Grape!",
                usage: "No arguments required.",
                aliases: ["donators", "supporters", "boosters", "donor", "donors"],
                saying: "They are cool people.",
                cooldown: 2
            });
        }

        main(msg) {
            const supporterEmbed = new Embed()
                .setTitle("Supporters")
                .addFields(
                    { name: "To be put on here, join the discord!", value: `**[Invite](${this.client.config.serverInvite})**` },
                    { name: "Donators", value: "Neon#3333, Zyphex✨#7464", inline: true},
                    { name: "Boosters", value: "Karlee Rae#7317", inline: true }
                );
            msg.send(supporterEmbed);
        }
    };