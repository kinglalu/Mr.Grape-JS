const { MusicCommand, Embed } = require("../../../lib");

module.exports =
    class extends MusicCommand {
        constructor(...args) {
            super(...args, {
                name: "remove",
                type: "music",
                description: "Remove a song from the queue.",
                usage: "<index of song>.",
                aliases: ["rm"],
                saying: "You might be removed if you don't stop removing.",
                cooldown: 2
            });
        }

        main(msg) {
            const { queue } = this.musicQueues.get(msg.guild.id);

            const index = (+msg.params[0] || queue.songs.length) - 1;

            if (index > queue.songs.length) return msg.send("That's not a valid song to remove!");

            const removedSong = queue.remove(index);

            const removeEmbed = new Embed()
                .setDescription(`Removed [${removedSong.title}] from the queue!`);
            msg.send(removeEmbed);
        }
    };