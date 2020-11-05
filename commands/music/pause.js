module.exports = {
	name: 'pause',
	description: 'pause a song that\'s playing',
	cooldown: 2,
	execute(message, args, d) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('Music Paused.');
		}
		return message.channel.send("There's no music playin");
	}
};
