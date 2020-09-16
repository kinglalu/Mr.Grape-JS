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

	let commands = fs.readdirSync("./commands");
	for(let i = 0; i < commands.length; i++)
	{
		let info = fs.readFileSync(`./commands/${commands[i]}`).toString().split("\n")[0]
		commands[i] = `\`${config.prefix}${commands[i].slice(0, commands[i].length - 3)}\`: ${info.slice(2, info.length)}`;
	}
	
	const balsoloEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('Help')
					.addFields(
						{ name: 'Commands', value: commands[0] },
						{ name: 'Commands', value: commands[1] },
						{ name: 'Commands', value: commands[2] },
						{ name: 'Commands', value: commands[3] },
						{ name: 'Commands', value: commands[4] },
						{ name: 'Commands', value: commands[5] },
						{ name: 'Commands', value: commands[6] },
						{ name: 'Commands', value: commands[7] },
						{ name: 'Commands', value: commands[8] },
						{ name: 'Commands', value: commands[9] },
						{ name: 'Commands', value: commands[10] },
						{ name: 'Commands', value: commands[11] },
						{ name: 'Commands', value: commands[12] },
						{ name: 'Commands', value: commands[13] },
						{ name: 'Commands', value: commands[14] }
						
						
						
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Enterprises');

				message.channel.send(balsoloEmbed);
				
}
