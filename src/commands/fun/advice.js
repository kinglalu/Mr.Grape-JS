const { RequestCommand, Embed } = require("../../../lib");

module.exports =
    class extends RequestCommand {
        constructor(...args) {
            super(...args, {
                name: "advice",
                type: "fun",
                aliases: ["adv"],
                usage: "No arguments required.",
                description: "Get gud, get advice.",
                cooldown: 5,
                saying: "Surely you aren't that clueless.",
            });
        }

        async main(msg) {
            const { slip } = await this.request({ url: "https://api.adviceslip.com/advice" });

            const embed = new Embed()
                .setTitle("Advice")
                .setDescription(slip.advice);
            msg.send(embed);
        }
    };