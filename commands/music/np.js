module.exports = {
    name: 'nowplaying',
    description: 'see what song is currently playin',
    cooldown: 2,
    aliases: ['np'],
    cd: "I just showed you what was playing!",
    execute(message, args, d) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send("Bruh wdym there is nothing playin");
        const q = serverQueue.songs[0];
        if (!q) return message.channel.send("Bruh wdym there is nothing playin");
        const duration = q.duration.split(':').reverse().reduce((prev, curr, i) => prev + curr * Math.pow(60, i), 0)
        const actualSeek = Math.floor((serverQueue.connection.dispatcher.streamTime - serverQueue.connection.dispatcher.pausedTime) / 1000) + 1;
        const seek = new Date(actualSeek * 1000).toISOString().substr(11, 8);
        const timeLeft = new Date((duration - actualSeek) * 1000).toISOString().substr(11, 8);
        let finalTotal;
        if (q.duration.length === 4) { finalTotal = "00:0" + q.duration }
        else { finalTotal = q.duration }
        const np = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle('Now Playing')
            .setURL(q.url)
            .setThumbnail(q.thumbnail)
            .addFields(
                { name: `${q.title}`, value: '_' },
                { name: 'Time elapsed', value: seek },
                { name: 'Time remaining', value: timeLeft },
                { name: 'Total Duration', value: finalTotal },

            )
            .setTimestamp()
            .setFooter('DJ Grape');
        message.channel.send(np);
    }
};
