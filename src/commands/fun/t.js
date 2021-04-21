const { Command } = require("../../../lib");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "t",
                type: "fun",
                aliases: ["tee"],
                description: "T chat.",
                usage: "No arguments required.",
                cooldown: 2,
                saying: "Don't spam.",
            });
        }

        main(msg) {
            msg.send("t");
        }
    };