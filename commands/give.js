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
	async function check() {
	let a = await users.get(message.author.id);
	if (a < parseInt(args[1])) {return true;}
	}
	let targets = message.mentions.members.first();
        let targetss = targets.id;
	if (!targets)
	{
		message.channel.send("who u givin golden stars to");
	}
	else if (!parseInt(args[1]) || parseInt(args[1]) < 1 || check())
	{
		message.channel.send("thats not a valid number of golden stars to give")
		
	}
	else if (targets.id === message.author.id)
	{
		message.channel.send("bruh you cant give golden stars to yourself smh")
	}
	else if (targets.user.bot)
	{
		message.channel.send("bruh you cant give golden stars to a bot smh")
	}
	else
	{
		let give = parseInt(args[1]);
		let subGive = -1 * give;
		addMoni(message.author.id, subGive);
		addMoni(target.id, give);
		const balsoloEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(message.author.username + ` donation to ` + targets.displayName)
					.addFields(
						{ name: 'Donation', value:  'you gave ' + `${targets.displayName} `+ `${parseInt(args[2])} ` + ':star:s' },
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Charity Org.');

				message.channel.send(balsoloEmbed);
	}

}
