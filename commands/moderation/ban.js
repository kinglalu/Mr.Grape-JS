const Discord = require('discord.js');
module.exports = {
    name: 'ban',
    description: 'ban ppl',
    cooldown: 1,
    cd: "Don't bully",
    execute(message, args, d) {
        let rawTarget = message.mentions.members.first();
        let target = message.guild.member(rawTarget);
        let boolean = message.member.hasPermission("BAN_MEMBERS");
        let myBoolean = message.guild.me.hasPermission("BAN_MEMBERS");
        if (boolean && myBoolean) {
            if (target) {
                if (message.author.id === rawTarget.id) {
                    return message.channel.send('Bruh imagine banning yourself');
                }
                if (message.client.user.id === rawTarget.id) {
                    return message.channel.send('Woah there, im too cool to ban')
                }
                try {
                    target.ban();
                    message.channel.send("\:hammer: " + target.displayName + " has been banned, with an iron fist");
                } catch {
                    message.channel.send("I don't got permissions (or high enough role) to kick ppl. How about ya give me it?")
                }
            }
        } else if (!target) {
            message.channel.send('who you gonna hammer? (mention)');
        } else if (!boolean) {
            message.reply("bruh you dont even have permission to kick people, stop trying smh ");
        } else if (!myBoolean) {
            message.channel.send("I don't have perms to ban")
        } else {
            message.channel.send("Cannot kick " + target.displayName + " maybe use a valid mention?");
        }

    }
};
