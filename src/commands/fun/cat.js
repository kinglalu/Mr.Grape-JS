const { RequestCommand, Embed } = require("../../../lib");

module.exports =
    class extends RequestCommand {
        constructor(...args) {
            super(...args, {
                name: "cat",
                type: "fun",
                aliases: ["meow"],
                description: "Get cat pictures!",
                usage: "No arguments required",
                cooldown: 2,
                saying: "Cats are cute, but chill.",
            });
        }

        async main(msg) {
            const picture = await this.request({
                url: "https://api.thecatapi.com/v1/images/search",
                params: {
                    mime_types: "jpg,png",
                    limit: 1,
                    size: "small"
                }
            });

            const pictureEmbed = new Embed()
                .setTitle("Meow!")
                .setImage(picture[0].url);
            msg.send(pictureEmbed);
        }
    };