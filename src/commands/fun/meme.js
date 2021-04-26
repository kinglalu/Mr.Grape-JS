const { Collection } = require("discord.js");
const { RequestCommand, Embed } = require("../../../lib");
const memes = [];
const MemeProgress = new Collection();

module.exports =
    class extends RequestCommand {
        constructor(...args) {
            super(...args, {
                name: "meme",
                type: "fun",
                aliases: ["m"],
                description: "Get a reddit meme!",
                usage: "No arguments required",
                cooldown: 2,
                saying: "You're not dank."
            });
        }

        async init() {
            const res = await this.request({
               
                url: "https://www.reddit.com/r/meme/hot/.json", 
                params: {
                    limit: 100
                }
            });

            for (const { data } of res.data.children) {
                if (!data.url.substr(8).startsWith("i")) continue;
                memes.push([data.title, data.url]);
            }
        }

        getMeme(id) {
            const nextPos = MemeProgress.get(id) + 1 || 0;
            const meme = memes[nextPos];
            if (!meme) {
                MemeProgress.set(id, 1);
                return memes[0];
            }
            MemeProgress.set(id, nextPos);
            return meme;
        }

        main(msg) {
            const [title, url] = this.getMeme(msg.author.id);

            const memeEmbed = new Embed()
                .setTitle(title)
                .setImage(url);
            msg.send(memeEmbed);

            const date = new Date();
            if (date.getHours() === 12 && date.getMinutes === 0) this.init();
        }
    };