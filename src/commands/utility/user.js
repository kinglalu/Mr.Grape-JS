const { Command, Embed } = require("../../../lib");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "user",
                type: "utility",
                description: "Get basic user info.",
                usage: "<optional user>",
                aliases: ["usr"],
                saying: "Stop stalking.",
                cooldown: 2
            });
        }

        formatDate(date) {
            const dateOptions = { dateStyle: "full", timeStyle: "short" };
            return new Date(date).toLocaleString("en-US", dateOptions).split(" at").join("\n");
        }

        main(msg) {
            const person = msg.mentions.users.first() || msg.author;
            const personAsGuild = msg.guild.member(person);
            const personEmbed = new Embed()
                .setAuthor(person.tag, person.displayAvatarURL())
                .setThumbnail(person.displayAvatarURL())
                .addFields(
                    { name: "Joined", value: super.formatDate(personAsGuild.joinedAt), inline: true },
                    { name: "Created", value: super.formatDate(person.createdAt), inline: true },
                    { name: "Highest Role", value: personAsGuild.roles.highest },
                    { name: "ID", value: person.id }
                );
            if (person.id === msg.client.user.id) personEmbed.setFooter("That's me!");
            msg.send(personEmbed);
        }
    };