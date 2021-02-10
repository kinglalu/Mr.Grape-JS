module.exports = {
	name: 'invite',
	description: 'get invite link for the bot',
	cooldown: 2,
	cd: "I just gave you the link!",
	execute(message, args, d) {
		const invite = 'https://discord.com/oauth2/authorize?client_id=743833062265323651&scope=bot&permissions=0';
		const sever ='https://discord.gg/ZVyzbZfUqr'
		const inviteEmbed = new d.Discord.MessageEmbed()
			.setColor('#dd2de0')
			.setTitle('invites to discord sever and bot')
			.setURL(invite)
			.seturl (sever)
			.setTimestamp()
            .setFooter('Night');
		message.channel.send(inviteEmbed);
	}
};

	
