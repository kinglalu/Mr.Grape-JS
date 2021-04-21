const { MusicCommand, Embed } = require("../../../lib");

module.exports =
    class extends MusicCommand {
        constructor(...args) {
            super(...args, {
                name: "pause",
                type: "music",
                description: "Pause the music.",
                usage: "No arguments required.",
                aliases: ["ps"],
                saying: "Pause your pausing.",
                cooldown: 2
            });
        }

        main(msg) {
            const musicPlayer = this.musicQueues.get(msg.guild.id);
            if (!musicPlayer.playing) return msg.send("The music is already paused!");
            musicPlayer.pause();
            const pauseEmbed = new Embed()
                .setTitle(":pause_button: Paused Music!");
            msg.send(pauseEmbed);
        }
    };