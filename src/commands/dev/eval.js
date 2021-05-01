const { Command } = require("../../../lib");
const Interpreter = require('js-interpreter');

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "eval",
                type: "dev",
                description: "Eval js.",
                usage: "<command to reload>",
                aliases: ["evaluation", "ev", "e"],
                saying: "N/A.",
                cooldown: 0
            });
        }

        async main(msg) {
            
            if (!this.client.config.owners.has(msg.author.id)) {
                const interpreter = new Interpreter(msg.params.join(" "));
                interpreter.run();
                msg.send(interpreter.value, { code: "javascript", split: true });
            } else {
                let raw;

                try {
                    raw = eval(msg.params.join(" "));
                } catch (err) {
                    raw = err;
                }

                const output = require("util").inspect(raw);

                msg.send(output, { code: "javascript", split: true });
            }
        }
    };
