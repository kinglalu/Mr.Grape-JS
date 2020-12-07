module.exports = {
	name: 'stop',
	description: 'stop playing music',
	cooldown: 2,
	aliases: ['leave', 'disconnect', 'dc'],
	cd: "Why do you stop me so much?",
	execute(message, args, d) {
		const { channel } = message.member.voice;
		const myChannel = message.guild.me.voice.channel;
		if (!channel) return message.channel.send("Go to a voice channel to stop the music!");
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue && !myChannel) return message.channel.send("There ain't any music!");
		myChannel.leave();
		message.client.queue.delete(message.guild.id);
	}
};
