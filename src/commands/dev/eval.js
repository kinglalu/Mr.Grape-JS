const { Command } = require("../../../lib");
const Interpreter = require("js-interpreter");

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

        interpreter = new Interpreter('');

        main(msg) {
            if (!this.client.config.owners.has(msg.author.id) || msg.author.id === "745058406083198994") {
                console.log(msg.params.join(" "));
                this.interpreter.appendCode(msg.params.join(" "));
                this.interpreter.run();
                return msg.send(this.interpreter.value, { code: "javascript", split: true });
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
