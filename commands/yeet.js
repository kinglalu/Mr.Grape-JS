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
         let targets = message.mentions.members.first();	
	    if (await users.get(targets) === undefined) {
                users.set(targets, 0);
                  const balsolooEmbed = new Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(targets.displayName + `'s balance`)
                .addFields({
                    name: 'Balance',
                    value: 'they have 0 :star:s'
                }, )
                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                .setTimestamp()
                .setFooter('Grape Bank Inc.');
                message.channel.send(balsolooEmbed);
            }
            else {  
                const balsoloEmbed = new Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(targets.displayName + `'s balance`)
                .addFields({
                    name: 'Balance',
                    value: 'they have '+`${await users.get(targets)}`+' :star:s'
                }, )
                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                .setTimestamp()
                .setFooter('Grape Bank Inc.');
            message.channel.send(balsoloEmbed);
            }
    
    }
	var noice = args[0];
	if (noice.includes("<@")) {
		balTarg();
	}
	else if (noice === undefined) {bal();}
	else {message.channel.send("Unknown error my guy.");}
}
    

    
    
    
    


