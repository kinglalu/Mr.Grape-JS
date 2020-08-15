//Usage: `bal <user>`, returns the number of stars a user has
let cooldown = false
for(let i = 0; i < cooldowns.length; i++)
{
	if (cooldowns[i] === cmd + message.author.id)
	{
		message.channel.send("bro chill out and wait a bit");
		cooldown = true;
	}
}
if (!cooldown)
{
	cooldowns.push(cmd + message.author.id);
	cooldowns.push("c5");

	if (target)
	{
		for(let i = 0; i < currency.length; i++)
		{
			if (currency[i] === target.id)
			{
				const exampleEmbed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Some title')
					.setURL('https://discord.js.org/')
					.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
					.setDescription('Some description here')
					.setThumbnail('https://i.imgur.com/wSTFkRM.png')
					.addFields(
						{ name: 'Regular field title', value: 'Some value here' },
						{ name: '\u200B', value: '\u200B' },
						{ name: 'Inline field title', value: 'Some value here', inline: true },
						{ name: 'Inline field title', value: 'Some value here', inline: true },
					)
					.addField('Inline field title', 'Some value here', true)
					.setImage('https://i.imgur.com/wSTFkRM.png')
					.setTimestamp()
					.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

				message.channel.send(exampleEmbed);
			}
		}
	}
	else
	{
		for(let i = 0; i < currency.length; i++)
		{
			if (currency[i] === message.author.id)
			{
				message.channel.send(`you have \`${currency[i + 1]}\` golden star(s)`);
			}
		}
	}
}
