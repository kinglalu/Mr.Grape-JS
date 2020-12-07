const skip = require('./skip');
module.exports = {
    name: 'remove',
    description: 'get see what song is currently playin',
    cooldown: 2,
    aliases: ['rm'],
    cd: "If you keep removing like this, there won't be any songs",
    execute(message, args, d) {
        try {
            const serverQueue = message.client.queue.get(message.guild.id);
            if (isNaN(parseInt(args[0])) || !args[0]) return message.channel.send('Give me a valid number so I can remove that song!');
            if (!serverQueue) return message.channel.send('Nothin is playin');
            let remove = args[0] - 1;
            let arr = serverQueue.songs;
            if (remove > arr.length || remove < 0) { return message.channel.send('Bro that\'s not a valid song to remove.') }
            const rm = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle('Song Queue')
                .setDescription('Removal')
                .addField(`Removed **${arr[remove].title}**`, '_')
                .setTimestamp()
                .setFooter('DJ Grape');
            message.channel.send(rm)
            if (remove === 0) { skip.execute(message, args, d); }
            else { arr.splice(remove, 1); }
            message.client.queue.set(message.guild.id, serverQueue);
        } catch {
            message.channel.send('Bro that\'s not a valid song to remove.')
        }
    }
};


