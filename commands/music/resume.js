module.exports = {
	name: 'resume',
	description: 'resume a song that\'s paused',
	cooldown: 2,
	cd: "No need to check, you can hear it already",
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
				.setFooter('DJ Grape')
				.addField('⠀', 'Sponsered by Nodeclusters');
			return message.channel.send(p);
		}
		else if (serverQueue.playing) return message.channel.send("Can't resume if its already playing smh")
		else { return message.channel.send('There is nothing playin'); }
	}
};
