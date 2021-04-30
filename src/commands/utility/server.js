const { Command, Embed } = require("../../../lib");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "server",
                type: "utility",
                description: "Get basic server info.",
                usage: "No arguments required.",
                aliases: ["guild"],
                saying: "Server.",
                cooldown: 2
            });
        }

        main(msg) {
            const guildEmbed = new Embed()
                .setAuthor(msg.guild.name, msg.guild.iconURL())
                .setThumbnail(msg.guild.iconURL())
                .addFields(
                    { name: "Owner", value: `<@!${msg.guild.ownerID}>`, inline: true },
                    { name: "Members", value: msg.guild.memberCount, inline: true },
                    { name: "Roles", value: msg.guild.roles.cache.size, inline: true },
                    { name: "Channels", value: msg.guild.channels.cache.size, inline: true },
                    { name: "Emojis", value: msg.guild.emojis.cache.size, inline: true },
                    { name: "Created", value: new Date(msg.guild.createdAt).toLocaleString(), inline: true },
                    { name: "Region", value: msg.guild.region, inline: true },
                    { name: "ID", value: msg.guild.id, inline: true }
                );
            msg.send(guildEmbed);
        }
    };