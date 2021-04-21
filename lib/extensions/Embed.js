const { MessageEmbed } = require("discord.js");
const Timer = require("../utils/Timer");
const [left, right] = ["⬅️", "➡️"];
const sponsor = "Powered by [NodeClusters](https://nodeclusters.com/billing/link.php?id=8)";
const color = "PURPLE";

class Embed extends MessageEmbed {
    constructor() {
        super({
            description: sponsor,
            color: color,
            footer: {
                text: "Grape Enterprises"
            },
            timestamp: new Date()
        });
    }
}


class PaginatedEmbed {
    constructor(msg, { title, description }, entries, pageLength) {
        this.page = 0;
        this.pages = [];
        this.embed = {
            title: title,
            color: color,
            description: description ? description : sponsor,
            fields: [],
        };
        this.pageLength = pageLength;
        this.main(msg, entries);
    }

    async main(msg, entries) {
        while (entries.length > 0) this.pages.push(entries.splice(0, this.pageLength));
        const embedMsg = await msg.send(this.renderPage());
        if (this.pages.length === 1) return;
        await embedMsg.react(left);
        await embedMsg.react(right);
        this.collector(embedMsg);
    }

    renderPage() {
        const embed = new MessageEmbed({
            ...this.embed, footer: { text: `${this.page + 1} of ${this.pages.length}` }
        });

        for (const [title, value] of this.pages[this.page]) embed.addField(title, value);

        return embed;
    }

    flipPage(inc) {
        if (this.page === 0 && inc === -1) this.page = this.pages.length - 1;
        else if (this.page + 1 === this.pages.length && inc === 1) this.page = 0;
        else this.page += inc;
    }

    collector(message) {
        const filter = (reaction) => {
            return reaction.emoji.name === left || reaction.emoji.name === right;
        };
        const timer = new Timer(20000);
        const collector = message.createReactionCollector(filter);

        collector.on("collect", (reaction, user) => {
            reaction.users.remove(user.id);
            timer.restart();

            if (reaction.emoji.name === left) this.flipPage(-1);
            else if (reaction.emoji.name === right) this.flipPage(1);

            message.edit(this.renderPage());
        });

        timer.on("finish", () => {
            collector.stop();
            message.reactions.removeAll();
        });
    }
}

module.exports = { Embed, PaginatedEmbed };