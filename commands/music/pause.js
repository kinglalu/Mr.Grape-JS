module.exports = {
	name: 'pause',
	description: 'pause a song that\'s playing',
	cooldown: 2,
	execute(message, args, d) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('Its paused now');
		}
		return message.channel.send("Can't pause if its playing or if there\'s no music bruh");
	}
};
