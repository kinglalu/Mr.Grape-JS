const { RequestCommand, Embed } = require("../../../lib");

module.exports =
    class extends RequestCommand {
        constructor(...args) {
            super(...args, {
                name: "dog",
                type: "fun",
                aliases: ["woof"],
                description: "Get dog pictures!",
                usage: "No arguments required",
                cooldown: 2,
                saying: "Dogs = epic, but chill.",
            });
        }

        async main(msg) {
            const picture = await this.request({
                url: "https://api.thedogapi.com/v1/images/search",
                params: {
                    mime_types: "jpg,png",
                    limit: 1,
                    size: "small"
                }
            }).json();

            const dogEmbed = new Embed()
                .setTitle("Woof!")
                .setImage(picture[0].url);
            msg.send(dogEmbed);
        }
    };