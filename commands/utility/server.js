module.exports = {
	name: 'server',
	aliases: ['serverinfo'],
	description: 'get some basic info about your server',
	cooldown: 2,
	cd: 'Its just ur server name and count chill',
	execute(message, args, d) {
		const serversoloEmbed = new d.Discord.MessageEmbed()
			.setColor('#dd2de0')
			.setAuthor(message.guild.name, message.guild.iconURL())
			.addFields(
				{ name: 'Server ID', value: message.guild.id },
				{ name: 'Members', value: message.guild.memberCount },
				{ name: 'Created', value: message.guild.createdAt.toString().split(' ').slice(1, 4).join(' ') }
			)
			.setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
			.setTimestamp()
			.setFooter('Grape Databases');

		message.channel.send(serversoloEmbed);
	}
};
