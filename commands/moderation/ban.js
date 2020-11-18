const Discord = require('discord.js');
module.exports = {
    name: 'ban',
    description: 'ban ppl',
    cooldown: 0,
    execute(message, args, d) {
        let rawTarget = message.mentions.members.first();
        let target = message.guild.member(rawTarget);
        let boolean = message.member.hasPermission("BAN_MEMBERS");
        if (boolean) {
            if (target) {
                try {
                    target.ban();
                    message.channel.send(":hammer: " + target.displayName + " has been banned with an iron fist!");
                }
                catch {
                    message.channel.send("I don't got permissions (or high enough role) to ban ppl. How about ya give me it?")
                }
            }
        } else if (!boolean) {
            message.reply("bruh you dont even have permission to ban people, stop trying smh ");
        } else {
            message.channel.send("Cannot ban " + target.displayName + " maybe use a valid mention?");
        }

    }
};
