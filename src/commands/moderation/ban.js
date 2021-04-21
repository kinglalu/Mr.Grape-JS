const { ModerationCommand } = require("../../../lib");

module.exports =
    class extends ModerationCommand {
        constructor(...args) {
            super(...args, {
                name: "ban",
                type: "moderation",
                aliases: ["hammer"],
                description: "Ban people.",
                usage: "<mention|userID> <reason>",
                cooldown: 1,
                saying: "Don't spam this command.",
                requiredPermissions: ["BAN_MEMBERS"]
            });
        }

        async main(msg) {
            if (!msg.params[0]) return msg.send("Who should I ban?");

            const target = msg.mentions.members.first() ||
                await msg.guild.members.fetch(msg.params[0]).catch(() => { null; });

            if (!target) return msg.send("Give me a valid user that I can ban!");
            else if (target.id === msg.author.id) return msg.send("Imagine banning urself");
            else if (target.id === this.client.user.id) return msg.send("Woah there, I'm too cool for the hammer");
            else if (!target.bannable) return msg.send("That isn't a bannable user!");

            const reason = msg.params.slice(1).join(" ") || "No reason given";

            target.ban({ reason: reason });

            msg.send(`:hammer: ${target.user.username} has been banned with an iron fist.`);

            target.send(`You were banned from \`${msg.guild.name}\` for \`${reason}\`.`).catch(() => null);
        }
    };