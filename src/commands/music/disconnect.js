const { MusicCommand } = require("../../../lib");

module.exports =
    class extends MusicCommand {
        constructor(...args) {
            super(...args, {
                name: "leave",
                type: "music",
                description: "Tell the bot to disconnect from the voice channel.",
                usage: "No arguments required.",
                aliases: ["dc", "disconnect", "stop"],
                saying: "Stop disconnecting me, its annoying.",
                cooldown: 2
            });
        }

        main(msg) {
            const { connection } = msg.guild.voice

            connection.disconnect();
            this.musicQueues.delete(msg.guild.id);

            // TODO: Only run when actually left
            return msg.send("Cya!");
        }
    };