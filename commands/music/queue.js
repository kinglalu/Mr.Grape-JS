const guild = require('discord.js');
module.exports = {
	name: 'queue',
	description: 'get your server\'s music queue',
	cooldown: 2,
	aliases: ['q'],
	cd: "I just showed you the queue!",
	execute(message, args, d) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send("There isn't a song playin");
		let loop;
		switch (serverQueue.repeatMode) {
			case 1:
				loop = "Looping the **song**"
				break;
			case 2:
				loop = "Looping the **queue**"
				break;
			default:
				loop = " "
		}
		const q = serverQueue.songs;
		const queue = new d.Discord.MessageEmbed()
			.setColor('#dd2de0')
			.setTitle('Song Queue')
			.setDescription(loop + '\n⠀')
			.setTimestamp()
			.setFooter('DJ Grape')
			.addField('⠀', 'Sponsored by [NodeClusters](https://nodeclusters.com/billing/link.php?id=8)');
		for (var key in q) { queue.addFields({ name: '\u200b' + `${parseInt(key) + 1}` + '. ' + q[key].title, value: '⠀' }) }
		message.channel.send(queue);
	}
};
