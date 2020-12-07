module.exports = {
	name: 'skip',
	description: 'skip the current song',
	aliases: ['s'],
	cooldown: 2,
	cd: "Stop skipping! ur being annoying",
	async execute(message, args, d) {
		const channel = message.member.voice;
		const queue = message.client.queue.get(message.guild.id)
		if (!channel) return message.channel.send('Get in a voice channel if you wanna do stuff');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send("There ain't any songs playin");
		if (queue.repeatMode === 1) { queue.repeatMode = 0; }
		serverQueue.connection.dispatcher.end('Skipped dat song!');
	}
};
