const { MusicCommand, Embed } = require("../../../lib");

module.exports =
    class extends MusicCommand {
        constructor(...args) {
            super(...args, {
                name: "repeat",
                type: "music",
                description: "Loop music.",
                usage: "<song, queue, or off>\nIf you want to view settings, leave this field",
                aliases: ["loop", "rp", "lp", "rpt"],
                saying: "Don't go loopy.",
                cooldown: 2
            });
        }

        main(msg) {
            const musicPlayer = this.musicQueues.get(msg.guild.id);
            const mode = ["Off", "Song", "Queue"];
            /* eslint-disable no-case-declarations */
            switch (msg.params[0]) {
            case undefined:
                const loopEmbed = new Embed()
                    .setTitle(`**Current loop mode: ${mode[musicPlayer.settings.repeatMode]}**`);
                return msg.send(loopEmbed);
            case "o":
            case "off":
                musicPlayer.settings.repeatMode = 0;
                break;
            case "s":
            case "song":
                musicPlayer.settings.repeatMode = 1;
                break;
            case "q":
            case "queue":
                musicPlayer.settings.repeatMode = 2;
                break;
            default:
                const settingsEmbed = new Embed()
                    .setTitle(`**Valid settings are: ${mode.join(", ")}**`);
                return msg.send(settingsEmbed);
            }
            const settingsEmbed = new Embed()
                .setTitle(`**Looping set to: ${mode[musicPlayer.settings.repeatMode]}**`);
            return msg.send(settingsEmbed);
        }
    };