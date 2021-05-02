const { Command, Embed } = require("../../../lib");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "avatar",
                type: "utility",
                description: "See a person's avatar.",
                usage: "<optional user>",
                aliases: ["pfp"],
                saying: "I just showed it to you!.",
                cooldown: 2
            });
        }

        getPic(avatar, format) {
            const opts = { size: 1024 };
            return avatar.displayAvatarURL(format ? { format: format, ...opts } : { dynamic: true, ...opts });
        }

        async main(msg) {
            const avatar = msg.mentions.users.first() || msg.author;

            const avatarEmbed = new Embed()
                .setTitle(`${avatar.username}'s avatar`)
                .addFields(
                    { name: "‎", value: `**[jpg](${this.getPic(avatar, "jpg")})**`, inline: true },
                    { name: "‎", value: `**[png](${this.getPic(avatar, "png")})**`, inline: true },
                    { name: "‎", value: `**[webp](${this.getPic(avatar, "webp")})**`, inline: true }
                )
                .setImage(this.getPic(avatar));
            msg.send(avatarEmbed);
        }
    };