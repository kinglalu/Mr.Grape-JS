const { Command } = require("../../../lib");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "ev",
                type: "dev",
                description: "Eval js.",
                usage: "<command to reload>",
                aliases: ["eval"],
                saying: "N/A.",
                cooldown: 0
            });
        }

        async main(msg) {
            
            if (!this.client.config.owners.has(msg.author.id)) return msg.send("Back off! Devs only!"); 
                
            let raw;

            try {
                raw = eval(msg.params.join(" ").replace(/process\.env/g, ""));
            } catch (err) {
                raw = err;
            }

            const output = require("util").inspect(raw).replace(this.client.token, "[redacted]");

            msg.send(output, { code: "bash", split: true });
        }
    };
