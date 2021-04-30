const { MusicCommand, Embed } = require("../../../lib");

module.exports =
    class extends MusicCommand {
        constructor(...args) {
            super(...args, {
                name: "volume",
                type: "music",
                description: "Set the music's volume.",
                usage: "<volume (between 0-100)>",
                aliases: ["vol"],
                saying: "Stop cranking it all over the place.",
                cooldown: 2
            });
        }

        main(msg, args) {
            const musicPlayer = this.musicQueues.get(msg.guild.id);
            const number = parseInt(msg.params[0].split('%')[0]);
            let connection;
            if (!musicPlayer) connection = msg.guild.me.voice.connection.dispatcher;
            if (!connection) return msg.send("I'm not playing anything!");

            let title, info;

            if (!number) [title, info] = ["**Volume**", musicPlayer ? musicPlayer.settings.volume : connection.volumeLogarithmic * 100];

            else if (isNaN(number) || number < 0 || number > 100) return msg.send(`Setting volume to ${msg.params[0]}, not.`);
            else if (number === 0) return msg.send("That's what the pause command is for!");

            else {
                [title, info] = ["**Set Volume**", number];
                musicPlayer ? musicPlayer.volume = number : connection.setVolumeLogarithmic(number / 100);
            }

            const volEmbed = new Embed()
                .setTitle(`${title}: **${info}**`);
            return msg.send(volEmbed);
        }
    };
