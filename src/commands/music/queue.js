const { Util: { escapeMarkdown } } = require("discord.js");
const { MusicCommand } = require("../../../lib");

module.exports =
    class extends MusicCommand {
        constructor(...args) {
            super(...args, {
                name: "queue",
                type: "music",
                description: "Get music queue.",
                usage: "No arguments required.",
                aliases: ["q"],
                saying: "I just showed it to you!",
                cooldown: 2
            });
        }

        createEntry(pos, { title, url, duration, author }) {
            return ["‎", `**${pos}) [${escapeMarkdown(title)}](${url})\n\`${duration}\`| ${author}**`];
        }

        main(msg) {
            if (!this.musicQueues.get(msg.guild.id)) return msg.send("Get in a voice channel!")
            const { queue: { songs, currentSong: { title, url } } } = this.musicQueues.get(msg.guild.id);
            const entries = songs.map((s, i) => this.createEntry(i + 1, s));
            msg.paginate({ title: "Queue", description: `**__Now playing:__** **[${escapeMarkdown(title)}](${url})**` }, entries, 5);
        }
    };