module.exports = {
	name: 'resume',
	description: 'resume a song that\'s paused',
	cooldown: 2,
	execute(message, args, d) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			const p = new d.Discord.MessageEmbed()
				.setColor('#dd2de0')
				.setTitle('Song')
				.addField(`Resumin Tunes!`, '_')
				.setTimestamp()
				.setFooter('DJ Grape');
			return message.channel.send(p);
		}
		return message.channel.send('There is nothing playin');
	}
};
