const { Command, Embed } = require("../../../lib");

const responses = [
    "Better not tell you now.",
    "Don’t count on it.",
    "It is certain.",
    "It is decidedly so.",
    "Most likely.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Outlook good.",
    "Signs point to yes.",
    "Very doubtful.",
    "Without a doubt.",
    "Yes.",
    "Yes – definitely.",
    "You may rely on it."
];

const rejections = [
    "Ask again later",
    "Cannot predict now.",
    "Concentrate and ask again",
    "Reply hazy, try again."
];

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "8ball",
                type: "fun",
                aliases: ["8b"],
                usage: "<question (must end with ?)>",
                description: "Fortune-telling is cool.",
                cooldown: 5,
                saying: "Even a fortune-teller could tell you to chill.",
            });
        }

        getResponse(failure) {
            const array = failure ? rejections : responses;
            return array[super.randomize(array.length)];
        }

        main(msg) {
            let invalid;

            if (!msg.params.length || !msg.params.pop().endsWith("?")) invalid = true;

            const embed = new Embed()
                .setTitle(`${msg.author.username}'s crystal ball`)
                .setDescription(this.getResponse(invalid));
            msg.send(embed);
        }
    };