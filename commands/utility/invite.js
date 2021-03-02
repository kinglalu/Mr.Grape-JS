module.exports = {
	name: 'invite',
	description: 'get invite link for the bot',
	cooldown: 2,
	cd: "I just gave you the link!",
	execute(message, args, d) {
		const invite = 'https://discord.com/oauth2/authorize?client_id=743833062265323651&scope=bot&permissions=0';
		const server = 'https://discord.gg/2RKPmDg2A6';
		const inviteEmbed = new d.Discord.MessageEmbed()
			.setColor('#dd2de0')
			.setTitle('Invites')
			.addFields(
				{ name: 'Bot Invite', value: '[Invite](https://discord.com/oauth2/authorize?client_id=743833062265323651&scope=bot&permissions=0)' },
				{ name: 'Support Server Invite', value: '[Invite](https://discord.gg/2RKPmDg2A6)'}
			)
			//.setURL(server)
			.setDescription('Sponsored by [NodeClusters](https://nodeclusters.com/billing/link.php?id=8)');
		message.channel.send(inviteEmbed);
	}
};
