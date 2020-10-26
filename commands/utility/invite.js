module.exports = {
	name: 'invite',
	description: 'get invite link for the bot',
	cooldown: 2,
	execute(message, args, d) {
	message.channel.send('https://discord.com/oauth2/authorize?client_id=743833062265323651&scope=bot&permissions=0');
	}
};
