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
	if (!target)
	{
		const yEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('who u stealin from?')
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
		message.channel.send(yEmbed);
	}
	
	else if (target.id === message.author.id)
	{
		const yazEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('imagine trying to steal from yourself smh')
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
		message.channel.send(yazEmbed);
	}
	else if (target.user.bot)
	{
		const ayazEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('do not steal from bots')
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
		message.channel.send(ayazEmbed);
	}
	else if (caught >= 70)
	{
		currency[currency.indexOf(message.author.id) + 1] += parseInt(args[2]);
		currency[currency.indexOf(target.id) + 1] = parseInt(currency[currency.indexOf(target.id) + 1]) - parseInt(args[2]);
		
		const balsoloEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(message.author.username + `robbery of ` + target.displayName)
					.addFields(
						{ name: 'Theft', value:  'you stole from ' + `${target.displayName} `+' and got '+ `${parseInt(args[2])} ` + ':star:s' },
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Shady Grape Org');

				message.channel.send(balsoloEmbed);}
	else if (caught <= 30)
	{
		
		let loss = Math.floor(Math.random()*14)+1;
		const balsolooEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(message.author.username + ` robbery of ` + target.displayName)
					.addFields(
						{ name: 'You got caught!', value:  'You ended up paying ' +loss+" :star:s\nThat's karma for ya." },
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Shady Grape Org');

				message.channel.send(balsolooEmbed);
		for (let i = 0; i < currency.length; i++) {
            if (currency[i] === message.author.id) {           
                
		  currency[i + 1] = parseInt(currency[i + 1]) - loss;	     
            }
        }
	}
	}

