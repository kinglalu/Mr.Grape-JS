const { RequestCommand, Embed } = require("../../../lib");

module.exports =
    class extends RequestCommand {
        constructor(...args) {
            super(...args, {
                name: "wolfram",
                type: "fun",
                aliases: ["wa", "wolf", "ask", "question", "givethquestion"],
                description: "Ask a question!",
                usage: "<question>",
                cooldown: 5,
                saying: "Use google nerd."
            });
        }

        async main(msg) {
            if (!msg.params.length) return msg.send("Give me a question to answer!");

            const queryMsg = await msg.send("Gimme a sec . . .");
            const { queryresult } = await this.request({
                url: "https://api.wolframalpha.com/v2/query",
                params: {
                    appid: process.env.WOLFRAM,
                    input: msg.params.join(" "),
                    output: "JSON",
                    format: "plaintext"
                }
            });

            if (!queryresult.success) {
                queryMsg.delete();
                return msg.send("Dunno about that one.");
            }

            const answer = queryresult.pods[1].subpods[0].plaintext;

            const wolframEmbed = new Embed()
                .setTitle("Answer")
                .setDescription(answer.endsWith(".") ? answer : `${answer}.`)
                .setFooter("Powered by Wolfram|Alpha");
            queryMsg.delete();
            msg.send(wolframEmbed);
        }
    };