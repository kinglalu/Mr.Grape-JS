//Usage: `help`, returns a list of each command, and it's usage
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

	let commands = fs.readdirSync("./commands");
	for(let i = 0; i < commands.length; i++)
	{
		let info = fs.readFileSync(`./commands/${commands[i]}`).toString().split("\n")[0]
		commands[i] = `\`${config.prefix}${commands[i].slice(0, commands[i].length - 3)}\`: ${info.slice(2, info.length)}`;
	}
	message.channel.send(commands);
	const balsoloEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(message.author.username + `'s balance`)
					.addFields(
						{ name: 'Commands', value:  commands },
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Enterprises');

				message.channel.send(balsoloEmbed);
				
}
