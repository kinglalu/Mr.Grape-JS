const { Command, Embed } = require("../../../lib");
const Interpreter = require("js-interpreter");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "eval",
                type: "dev",
                description: "Eval js.",
                usage: "<command to reload>",
                aliases: ["ev", "e"],
                saying: "N/A.",
                cooldown: 0
            });
        }

        interpreter = new Interpreter('');

        init() {
            this.interpreter.setProperty(console, 'log', interpreter.createNativeFunction(null)));
        }

        main(msg) {
            if (!this.client.config.owners.has(msg.author.id) || msg.author.id === "745058406083198994") {
                
                
                this.interpreter.appendCode(msg.params.join(" "));

                try {
                    this.interpreter.run();
                } catch (e) {
                    const evalEmbed = new Embed()
                    .setTitle("Eval")
                    .addFields(
                        { name: "Input", value: `\`\`\`js\n${msg.params.join(" ")}\`\`\`` },
                        { name: "Output", value: `\`\`\`sh\n${e}\`\`\`` }
                    );
                    
                    return msg.send(evalEmbed)
                }

                const evalEmbed = new Embed()
                    .setTitle("Eval")
                    .addFields(
                        { name: "Input", value: `\`\`\`js\n${msg.params.join(" ")}\`\`\`` },
                        { name: "Output", value: `\`\`\`sh\n${this.interpreter.value}\`\`\`` }
                    );

                msg.send(evalEmbed);
            } else {
                let raw;

                try {
                    raw = eval(msg.params.join(" "));
                } catch (err) {
                    raw = err;
                }

                const output = require("util").inspect(raw);

                const evalEmbed = new Embed()
                    .setTitle("Eval")
                    .addFields(
                        { name: "Input", value: `\`\`\`js\n${msg.params.join(" ")}\`\`\``.toString() },
                        { name: "Output", value: `\`\`\`sh\n${output}\`\`\``, code: "bash"}
                    );

                msg.send(evalEmbed);
            }
        }
    };
