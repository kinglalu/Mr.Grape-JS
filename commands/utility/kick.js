const Discord = require('discord.js');
module.exports = {
    name: 'kick',
    description: 'fortune telling is cool',
    cooldown: 0,
    execute(message, args, d) {
        let target = message.mentions.members.first;
        let boolean = message.member.hasPermission("KICK_MEMBERS");
        if (boolean) {
            if (target) {
                try {
                    target.kick();
                    message.channel.send(":wave: " + target.displayName + " has been kicked, what a noob lol ");
                } catch {
                    message.reply("I don't got permissions to kick people, how about you give me it? ");
                }
            }
        } else if (!boolean) {
            message.reply("bruh you dont even have permission to kick people, stop trying smh ");
        } else {
            message.channel.send("Cannot kick " + target.displayName);
        }

    }
};
