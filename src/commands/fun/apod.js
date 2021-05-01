const { RequestCommand, Embed } = require("../../../lib");

module.exports =
    class extends RequestCommand {
        constructor(...args) {
            super(...args, {
                name: "apod",
                type: "fun",
                aliases: ["nasapic", "npod", "nasapicoftheday", "nasa"],
                description: "See pictures of space!",
                usage: "No arguments required",
                cooldown: 5,
                saying: "There's only one NASA pic.",
            });
        }


        async main(msg) {
            const response = await this.request({
                url: "https://api.nasa.gov/planetary/apod",
                params: {
                    api_key: process.env.NASA
                }
            }).json();

            const pictureEmbed = new Embed()
                .setTitle("NASA Picture of the day!")

            response.picture ? pictureEmbed.setImage(response.picture) : pictureEmbed.addField("NASA Video of the Day", `[${response.title}](${response.url})`);

            msg.send(pictureEmbed);
        }
    };
