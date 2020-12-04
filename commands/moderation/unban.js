const Discord = require('discord.js');
module.exports = {
    name: 'unban',
    description: 'unban ppl',
    cooldown: 0,
    execute(message, args, d) {
        let unbanUser = args[0];
        let boolean = message.member.hasPermission("BAN_MEMBERS");
        if (boolean) {
            if (unbanUser) {
                if (message.author.id === unbanUser) {
                    return message.channel.send('I don\'t think ur banned');
                }
                if (message.client.user.id === unbanUser) {
                    return message.channel.send('Bruh im not banned')
                }
                try {
                    message.guild.members.unban(unbanUser)
                    message.channel.send("User unbanned!");
                } catch {
                    message.channel.send("I don't got permissions (or high enough role) to unban ppl. How about ya give me it?")
                }
            }
        } else if (!unbanUser) {
            message.channel.send('who are we unbanning? (you gotta give me their id bro)');
        } else if (!boolean) {
            message.reply("bruh you dont even have permission to unban people, stop trying smh ");
        } else {
            message.channel.send("Cannot unban that user");
        }

    }
};
