const { RequestCommand, Embed } = require("../../../lib");

module.exports =
    class extends RequestCommand {
        constructor(...args) {
            super(...args, {
                name: "yomomma",
                type: "fun",
                aliases: ["ym", "yomama"],
                usage: "No arguments required.",
                description: "Get a yo momma joke.",
                cooldown: 5,
                saying: "Yo momma so annoying, she spams commands.",
            });
        }

        async main(msg) {
            const { joke } = await this.request({ url: "https://api.yomomma.info" }).json();

            const embed = new Embed()
                .setTitle("Yo Momma")
                .setDescription(joke);
            msg.send(embed);
        }
    };