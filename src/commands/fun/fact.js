const { RequestCommand, Embed } = require("../../../lib");

module.exports =
    class extends RequestCommand {
        constructor(...args) {
            super(...args, {
                name: "fact",
                type: "fun",
                aliases: ["facts", "fax", "randomfacts", "randomfact"],
                description: "Get a fact!",
                usage: "No arguments required",
                cooldown: 3,
                saying: "Do you really need that many random facts?"
            });
        }

        async main(msg) {
            const { data } = await this.request({
                url: "https://useless-facts.sameerkumar.website/api",
            });

            const factEmbed = new Embed()
                .setTitle("Fact")
                .setDescription(`**${data}**`);
            msg.send(factEmbed);
        }
    };
