module.exports = {
	name: 'resume',
	description: 'resume a song that\'s paused',
	cooldown: 2,
	execute(message, args, d) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('Resumin music');
		}
		return message.channel.send('There is nothing playin');
	}
};
