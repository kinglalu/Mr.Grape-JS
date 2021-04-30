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
            switch (musicPlayer.settings.repeatMode) {
                case 0:
                    musicPlayer.settings.repeatMode = 1;
		    break;
                case 1:
                    musicPlayer.settings.repeatMode = 2;
		    break;
                case 2:
                    musicPlayer.settings.repeatMode = 0;
		    break;
            }
            const settingsEmbed = new Embed()
                .setTitle(`**Looping set to: ${mode[musicPlayer.settings.repeatMode]}**`);
            return msg.send(settingsEmbed);
        }
    };

