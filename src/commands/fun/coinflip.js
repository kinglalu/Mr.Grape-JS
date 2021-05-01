const { Command, Embed } = require("../../../lib");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "coinflip",
                type: "fun",
                aliases: ["coin", "cf"],
                description: "Flip a coin!",
                usage: "No arguments required",
                cooldown: 5,
                saying: "One flip is more than enough.",
            });
        }

        main(msg) {
            const coinFlip = new Embed()
                .setTitle(`${msg.author.username}'s coinflip`)
                .addField("It landed on", `${Math.round(Math.random()) ? "Heads!" : "Tails!"}`);
            
                msg.send(coinFlip);
        }
    };