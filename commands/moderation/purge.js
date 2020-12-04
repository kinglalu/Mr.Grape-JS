module.exports = {
    name: 'purge',
    description: 'purge messages from a channel',
    cooldown: 0,
    execute(message, args, d) {
        try {
            if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send('You don\'t have perms!')
            if (!args[0]) return message.channel.send('Bruh how many messages should I purge?');
            let number = parseInt(args[0]);
            let iteration = ~~(number / 100);
            let leftover = number - (iteration * 100);
            for (let i = 0; i < iteration; i++) { message.channel.bulkDelete(100); }
            if (leftover > 0) { message.channel.bulkDelete(leftover); }
        }
        catch {
            message.channel.send('Discord prevents me from deleting messages that are more than 2 weeks old')
        }
    }
};
