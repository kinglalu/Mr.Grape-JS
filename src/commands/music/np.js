const { MusicCommand, Embed } = require("../../../lib");

module.exports =
    class extends MusicCommand {
        constructor(...args) {
            super(...args, {
                name: "np",
                type: "music",
                description: "See what is playing currently.",
                usage: "No arguments required.",
                aliases: ["nowplaying"],
                saying: "Listen.",
                cooldown: 2
            });
        }

        toSeconds(isoTime) { return isoTime.split(":").reduce((acc, time) => (60 * acc) + +time); }

        toISOTime(seconds) { return new Date(seconds * 1000).toISOString().substr(11, 8); }

        main(msg) {
            const { queue: { currentSong: song }, playTime } = this.musicQueues.get(msg.guild.id);
            const formattedDuration = song.duration.length === 4 ? `00:0${song.duration}` :
                song.duration.length === 5 ? `00:${song.duration}` : song.duration;
            const np = new Embed()
                .setDescription(`**Now playing\n[${song.title}](${song.url})**`)
                .setAuthor(`Requested by ${song.author.username}`, song.author.displayAvatarURL())
                .setThumbnail(song.thumbnail)
                .addFields(
                    { name: "Time elapsed", value: this.toISOTime(playTime + 1), inline: true },
                    { name: "Time remaining", value: this.toISOTime(this.toSeconds(song.duration) - playTime), inline: true },
                    { name: "Total Duration", value: formattedDuration, inline: true }
                );
            msg.send(np);
        }
    };