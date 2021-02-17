module.exports = {
    name: 'volume',
    description: 'set volume of the bot',
    aliases: ['vol'],
    cd: "Enough volume cranking!",
    execute(message, args, d) {
        let title, number;
        let argument = args.join(' ');
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send('Get in a voice channel if you wanna pump it up!')
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return message.channel.send('There ain\'t any music!')
        if (!argument) { title = 'Current Volume'; number = queue.volume }
        else {
            let set = parseInt(argument)
			if (isNaN(set)) return message.channel.send("Give me a number nerd");
            else if (set > 100) return message.channel.send("Let's not earrape ppl ok?")
			else if (set < 0) return message.channel.send("Imagine negative volume");
            queue.volume = set;
            queue.connection.dispatcher.setVolumeLogarithmic(set / 100);
            title = 'Volume set to'
            number = set
        }
        const volumeEmbed = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(title)
            .setDescription(number)
            .addField('_', 'Sponsered by nodeclusters');
        message.channel.send(volumeEmbed);
    }
};