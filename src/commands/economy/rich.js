const { EconomyCommand } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "rich",
                type: "economy",
                description: "Idk.",
                usage: "<optional user>",
                saying: "Wait for the riches.",
                cooldown: 2
            });
        }

        main(msg) {
            msg.send(msg.emojis["starbait"]);
        }
    };
