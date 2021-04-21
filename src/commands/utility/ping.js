const { Command, Embed } = require("../../../lib");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "ping",
                type: "utility",
                description: "Get the bot's ping.",
                usage: "No arguments required.",
                aliases: ["pong"],
                saying: "Pong. There, I work.",
                cooldown: 2
            });
        }

        async main(msg) {
            const ping = await msg.send("Ping?");
            const pingNum = ping.createdTimestamp - msg.createdTimestamp;
            const pingEmbed = new Embed()
                .setTitle("Pong!")
                .addFields(
                    { name: "Bot ping", value: pingNum, inline: true },
                    { name: "API latency", value: this.client.ws.ping, inline: true },
                );
            ping.delete();
            msg.send(pingEmbed);
        }
    };