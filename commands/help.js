//Usage: `help`, returns a list of each command, and it's usage
let cooldown = false
for(let i = 0; i < cooldowns.length; i++)
{
	if (cooldowns[i] === cmd + message.author.id)
	{
		const balnoEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('bro chill out and wait a bit')
					
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					

				message.channel.send(balnoEmbed);
		cooldown = true;
	}
}
if (!cooldown)
{
	cooldowns.push(cmd + message.author.id);
	cooldowns.push("c5");
	let helpArg = args[0];
	if (helpArg === undefined) {
		const balnoEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('Help')
					.addFields (
						{name: 'Help' , value: 'For more help in a specific area, do help <category'},
						{name: 'Moni' , value: 'Help for stuff that get you stars'},
						{name: 'Fun' , value: 'Fun stuff you can do'},
						{name: 'Utility' , value: 'Just some other, somewhat useful, commands.'}
						)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					

				message.channel.send(balnoEmbed);
	}
	else if (helpArg === 'moni') {
		
		const balnoEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('Help')
					.addFields (
						{name: 'Bal' , value: 'Check your $$$. To check the balance of another user, do '+`${config.prefix}`+'bal <usermention>.'},
						{name: 'Daily' , value: 'Get a daily amount of stars.'},
						{name: 'Dig' , value: 'Dig to get more stars!'},
						{name: 'Gamble' , value: 'Gamble the stars you have to get double (or nothing). 50/50 chance.'},
						{name: 'Give' , value: 'Feeling Charitable? Give money to another user! '+`${config.prefix}`+'give <user> <amount>.'},
						{name: 'Shop' , value: 'Display the shop!'},
						{name: 'Steal' , value: 'Steal from the big grape himself! There is a chance of losing some of your stars.'},
						{name: 'Work' , value: 'Do some honest work to get stars! There is a chance of getting no stars (you do not lose any).'}
						)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					

				message.channel.send(balnoEmbed);	
		
	}
	else if (helpArg === 'utility') {
		
		const balnoEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('Help')
					.addFields (
						{name: 'Info' , value: 'Get some info about the bot.'},
						{name: 'Invite' , value: 'Get the invite link for Mr. Grape!'},
						{name: 'Kick' , value: 'Kick that noob from your server!'},
						{name: 'Server' , value: 'Get some basic info about your server.'},
						{name: 'Userinfo' , value: 'Get some basic info about your user id.'},
						)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					

				message.channel.send(balnoEmbed);	
		
	}
	else if (helpArg === 'fun') {
		
		const balnoEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('Help')
					.addFields (
						{name: '8ball' , value: 'Ask Mr. Grape what the future holds in store for you! Use like this: '+`${config.prefix}`+ '8ball <question>'},
						)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					

				message.channel.send(balnoEmbed);	
		
	}
	else {message.channel.send('Invalid help argument dummy')}
}
