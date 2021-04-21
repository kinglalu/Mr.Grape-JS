const { MusicCommand, Embed } = require("../../../lib");

module.exports =
    class extends MusicCommand {
        constructor(...args) {
            super(...args, {
                name: "resume",
                type: "music",
                description: "Resume the music.",
                usage: "No arguments required.",
                aliases: ["rs", "cont", "continue"],
                saying: "Don't keep pausing and resuming.",
                cooldown: 2
            });
        }

        main(msg) {
            const musicPlayer = this.musicQueues.get(msg.guild.id);
            if (musicPlayer.playing) return msg.send("The music is already playing!");
            musicPlayer.resume();
            const resumeEmbed = new Embed()
                .setTitle(":white_check_mark: Resumed Music!");
            return msg.send(resumeEmbed);
        }
    };