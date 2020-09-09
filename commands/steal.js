//Usage: `steal <user> <amount>`, steal stars from another user
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
	let caught = Math.floor(Math.random()*99)+1;
	let randSteal = Math.floor(Math.random()*19)+1;
	 if (caught >= 70)
	{
		addMoni(message.author.id, randSteal);
		
		const balsoloEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(message.author.username + `robbery of ` + target.displayName)
					.addFields(
						{ name: 'Theft', value:  'you stole ' +randSteal+ ' :star:s' },
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Shady Grape Org');

				message.channel.send(balsoloEmbed);}
	else if (caught <= 30)
	{
		
		let loss = -1 * randSteal;
		addMoni(message.author.id, loss);
		const balsolooEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(message.author.username + ` robbery of ` + target.displayName)
					.addFields(
						{ name: 'You got caught!', value:  'You ended up paying ' +randSteal+" :star:s\nThat's karma for ya." },
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Shady Grape Org');

				message.channel.send(balsolooEmbed);
		
	}
	}

