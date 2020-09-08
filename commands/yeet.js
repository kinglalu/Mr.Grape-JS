//Usage: `bal <user>`, returns the number of stars that a user has
let cooldown = false
for (let i = 0; i < cooldowns.length; i++) {
    if (cooldowns[i] === cmd + message.author.id) {
        const balnoEmbed = new Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle('bro chill out and wait a bit')

            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()


        message.channel.send(balnoEmbed);
        cooldown = true;
    }
}
if (!cooldown) {

    async function bal() {
          if (await users.get(message.author.id) === undefined) {
                users.set(message.author.id, 0);
                  const balsolooEmbed = new Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(message.author.username + `'s balance`)
                .addFields({
                    name: 'Balance',
                    value: 'you have 0 :star:s'
                }, )
                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                .setTimestamp()
                .setFooter('Grape Bank Inc.');
                message.channel.send(balsolooEmbed);
            }
            else {  
                const balsoloEmbed = new Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(message.author.username + `'s balance`)
                .addFields({
                    name: 'Balance',
                    value: 'you have '+`${await users.get(message.author.id)}`+' :star:s'
                }, )
                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                .setTimestamp()
                .setFooter('Grape Bank Inc.');
            message.channel.send(balsoloEmbed);
            }
    }


    async function balTarg() {
          if (await users.get(target) === undefined) {
                users.set(target, 0);
                  const balsolooEmbed = new Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(target.displayName + `'s balance`)
                .addFields({
                    name: 'Balance',
                    value: 'you have 0 :star:s'
                }, )
                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                .setTimestamp()
                .setFooter('Grape Bank Inc.');
                message.channel.send(balsolooEmbed);
            }
            else {  
                const balsoloEmbed = new Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(target.displayName + `'s balance`)
                .addFields({
                    name: 'Balance',
                    value: 'you have '+`${await users.get(target)}`+' :star:s'
                }, )
                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                .setTimestamp()
                .setFooter('Grape Bank Inc.');
            message.channel.send(balsoloEmbed);
            }
    
    }
	
	if (args[0]) {
		const usery = getUserFromMention(args[0]);
		if (!usery) {
			return message.reply('Please use a proper mention if you want to see someone else\'s avatar.');
		}

		return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
	}

	return message.channel.send(`${message.author.username}, your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`);
}
    
}
    
    
    
    


