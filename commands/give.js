//Usage: `give <user> <amount>`, transfer golden stars from your account to anothers
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

	if (!target)
	{
		message.channel.send("who u givin golden stars to");
	}
	else if (!parseInt(args[2]) || parseInt(args[2]) < 1 || parseInt(args[2]) > parseInt(currency[currency.indexOf(message.author.id) + 1]))
	{
		message.channel.send("thats not a valid number of golden stars to give")
	}
	else if (target.id === message.author.id)
	{
		message.channel.send("bruh you cant give golden stars to yourself smh")
	}
	else if (target.user.bot)
	{
		message.channel.send("bruh you cant give golden stars to a bot smh")
	}
	else
	{
		currency[currency.indexOf(message.author.id) + 1] -= parseInt(args[2]);
		currency[currency.indexOf(target.id) + 1] = parseInt(currency[currency.indexOf(target.id) + 1]) + parseInt(args[2]);
		
		const balsoloEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(message.author.username + ` donation to ` + target.displayName)
					.addFields(
						{ name: 'Donation', value:  'you gave ' + `${target.displayName} `+ `${parseInt(args[2])} ` + ':star:s' },
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Charity Org.');

				message.channel.send(balsoloEmbed);
	}
}
