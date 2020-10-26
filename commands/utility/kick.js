const Discord = require('discord.js');
module.exports = {
    name: 'kick',
    description: 'fortune telling is cool',
    cooldown: 0,
    execute(message, args, d) {
        let rawTarget = message.mentions.members.first;
        let target = message.guild.member(target);
        let boolean = message.member.hasPermission("KICK_MEMBERS");
        if (boolean) {
            if (target) {
                    target.kick();
                    message.channel.send(":wave: " + target.displayName + " has been kicked, what a noob lol ");
               
            }
        } else if (!boolean) {
            message.reply("bruh you dont even have permission to kick people, stop trying smh ");
        } else {
            message.channel.send("Cannot kick " + target.displayName);
        }

    }
};
