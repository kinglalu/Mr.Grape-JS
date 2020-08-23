//Usage: `daily`, gives you a random number of stars between 25 and 50, can be used once per 24 hours
let cooldown = false;
for(let i = 0; i < cooldowns.length; i++)
{
	if (cooldowns[i] === cmd + message.author.id)
	{
		const balnoEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(`it's called \`${args[0].toLowerCase()}\` for a reason smh`)
					
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Bank Inc.');

				message.channel.send(balnoEmbed);
		cooldown = true;
	}
}
if (!cooldown)
{
    let random = Math.floor(Math.random() * 25) + 25;
    const dailystarEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(message.author.username + `'s daily reward`)
					.addFields(
						{ name: 'Daily Reward', value: 'here is ' + ` ${random} ` + ' :star:s' },
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Bank Inc.');

		message.channel.send(dailystarEmbed);
    cooldowns.push(cmd + message.author.id);
    cooldowns.push("c86400");
    for(let i = 0; i < currency.length; i++)
    {
        if (currency[i] === message.author.id)
        {
            currency[i + 1] = parseInt(currency[i + 1]) + random;
        }
    }
}
				
