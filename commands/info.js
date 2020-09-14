//Usage: `info`, Returns some basic info about the bot
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

	let uptime = bot.uptime / 1000;
	let unit = "second(s)";
	if (uptime > 59 && unit === "second(s)")
	{
		uptime /= 60;
		unit = "minute(s)";
	}
	if (uptime > 59 && unit === "minute(s)")
	{
		uptime /= 60;
		unit = "hour(s)";
	}
	if (uptime > 23 && unit === "hour(s)")
	{
		uptime /= 24;
		unit = "day(s)";
	}
	//message.channel.send(`Version: \`${config.version}\`\nUptime: \`${Math.floor(uptime)}\` ${unit}\nTodo list:\n${config.todo.join("\n")}`);
	const balsoloEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('Info')
					.addFields(
						{ name: 'Version:', value: `${config.version}`},
						{ name: 'Uptime:', value: `${Math.floor(uptime)}` + ` ${unit}` },	
						{ name: 'To-do list:', value: `${config.todo.join("\n")}`  },
						{ name: 'Servers Mr grape is in:', value: `${client.guilds.cache.size}`  },
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Enterprises');

				message.channel.send(balsoloEmbed);
				
}
