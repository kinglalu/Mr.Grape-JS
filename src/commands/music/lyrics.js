const centra = require("centra");
const { MusicCommand, Embed } = require("../../../lib");

module.exports =
    class extends MusicCommand {
        constructor(...args) {
            super(...args, {
                name: "lyrics",
                type: "music",
                description: "Get the Lyrics of a song.",
                usage: "<song name>",
                aliases: ["lyr"],
                saying: "Chill on the karaoke.",
                cooldown: 2
            });
        }

        async main(msg) {
            const music = this.musicQueues.get(msg.guild.id);
            const query = msg.params.join(" ") || music.queue.currentSong.title ;

            if (!query) return msg.send("Give me a valid song to search up!");

            const lyricsRequest = await centra("https://api.ksoft.si/lyrics/search").header(
                "Authorization", `Bearer ${process.env.KSOFT}`
            ).query({
                q: query,
                limit: 1
            }).send();

            const { artist, name, lyrics, album_art, url } = (await lyricsRequest.json()).data[0];

            if (!lyrics) return msg.send("Lyrics could not be found for that song!");

            const lyrEmbed = new Embed()
                .setTitle("Lyrics")
                .setDescription("Powered by [KSoft](https://ksoft.si)")
                .setThumbnail(album_art)
                .addFields(
                    { name: "Title", value: name, inline: true },
                    { name: "Artist", value: artist, inline: true },
                );

            if (name.length + lyrics.length > 6000) lyrEmbed.addField("Lyrics", `[Click here!](${url})`);

            else for (const lyric of lyrics.split("\n\n")) lyrEmbed.addField("\u200b", lyric);

            msg.send(lyrEmbed);
        }
    };