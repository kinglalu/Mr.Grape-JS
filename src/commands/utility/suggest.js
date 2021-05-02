const { Command, Embed } = require("../../../lib");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "suggest",
                type: "utility",
                description: "Suggest something.",
                usage: "<suggestion>",
                aliases: ["sg"],
                saying: "Love the enthusiasm, but chill.",
                cooldown: 120
            });
        }

        async main(msg) {
            const suggestion = msg.params.join(" ");
            if (suggestion.length < 15) return msg.send("Your suggestion is too short.");
            else if (suggestion.length > 1800) return msg.send("Your suggestion is wayyy too long. Tone it down.");

            const channel = await this.client.channels.fetch(this.client.config.defaultChannels.suggestions);

            const suggestionEmbed = new Embed()
                .setTitle("Suggestion")
                .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: "Author", value: `Username: ${msg.author.username}\nID: ${msg.author.id}`, inline: true },
                    { name: "Guild", value: msg.guild.name, inline: true },
                    { name: "Suggestion", value: suggestion }
                );
            channel.send(suggestionEmbed);

            const suggestedEmbed = new Embed()
                .setTitle("Suggestion Sent!")
                .addField("‎", `View your suggestion [here](${this.client.config.serverInvite})`);
            msg.send(suggestedEmbed);
        }
    };
