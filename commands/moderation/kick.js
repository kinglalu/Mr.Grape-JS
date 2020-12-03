const Discord = require('discord.js');
module.exports = {
    name: 'kick',
    description: 'kick ppl',
    cooldown: 0,
    execute(message, args, d) {
        let rawTarget = message.mentions.members.first();
        let target = message.guild.member(rawTarget);
        let boolean = message.member.hasPermission("KICK_MEMBERS");
        if (boolean) {
            if (target) {
                if (message.author.id === rawTarget.id) {
                    return message.channel.send('Bruh imagine kicking yourself');
                }
                try {
                    target.kick();
                    message.channel.send(":wave: " + target.displayName + " has been kicked, what a noob lol ");
                } catch {
                    message.channel.send("I don't got permissions (or high enough role) to kick ppl. How about ya give me it?")
                }
            }
        } else if (!target) {
            message.channel.send('who you gonna give the boot to?');
        } else if (!boolean) {
            message.reply("bruh you dont even have permission to kick people, stop trying smh ");
        } else {
            message.channel.send("Cannot kick " + target.displayName + " maybe use a valid mention?");
        }

    }
};
