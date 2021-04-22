const { ModerationCommand } = require("../../../lib");

module.exports =
    class extends ModerationCommand {
        constructor(...args) {
            super(...args, {
                name: "unban",
                type: "moderation",
                aliases: ["unhammer"],
                description: "Unban people.",
                usage: "<userID|username>",
                cooldown: 2,
                saying: "Don't spam this command.",
                requiredPermissions: ["BAN_MEMBERS"]
            });
        }

        async main(msg) {
            if (!msg.params[0]) return msg.send("Who should I ban?");

            const bans = await msg.guild.fetchBans();
            
            const ban = bans.find(e => e.user.id === msg.params[0] || e.user.username === msg.params.join(" "))?.user;

            if (!ban) return msg.send("That isn't a valid user to unban!");
            else if (ban.id === msg.author.id) return msg.send("I don't think you're banned?");
            else if (ban.id === this.client.user.id) return msg.send("I'm not banned.");

            await msg.guild.members.unban(ban.id);

            msg.send(`${ban.username} was unbanned!`);
        }
    };