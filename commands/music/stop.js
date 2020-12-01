module.exports = {
	name: 'stop',
	description: 'stop playing music',
	cooldown: 2,
	aliases: ['leave', 'disconnect', 'dc'],
	execute(message, args, d) {
		const channel = message.member.voice;
		if (!channel) return message.channel.send("Go to a voice channel to do stuff");
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send("There ain't any music!");
		serverQueue.voiceChannel.leave();
		message.client.queue.delete(message.guild.id);
	}
};
