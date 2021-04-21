const { MusicCommand } = require("../../../lib");

module.exports =
    class extends MusicCommand {
        constructor(...args) {
            super(...args, {
                name: "skip",
                type: "music",
                description: "Skip tracks.",
                usage: "No arguments required.",
                aliases: ["s"],
                saying: "Skipping is annoying.",
                cooldown: 2
            });
        }

        main(msg) {
            const musicPlayer = this.musicQueues.get(msg.guild.id);
            const number = +msg.params[0] - 1 || musicPlayer.queue.position + 1;

            if (number < 0 || number < musicPlayer.queue.position || number > musicPlayer.queue.songs.length) {
                return msg.send("You can't skip to that song!");
            }
            if (!musicPlayer.playing) musicPlayer.resume();
            if (musicPlayer.settings.repeatMode === 1) musicPlayer.settings.repeatMode = 0;
            
            musicPlayer.queue.skip(number);
        }
    };