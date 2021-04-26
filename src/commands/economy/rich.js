const { EconomyCommand } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "rich",
                type: "economy",
                description: "Idk.",
                usage: "No arguments required.",
                saying: "You can't get that rich!",
                cooldown: 2
            });
        }

        main(msg) {
            msg.send(msg.emojis["starbait"]);
        }
    };
