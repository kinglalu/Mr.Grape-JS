//Usage: `dig`, get golden stars by mining
let cooldown = false
for (let i = 0; i < cooldowns.length; i++) {
    if (cooldowns[i] === cmd + message.author.id) {
        const balnoEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('No mine for you')
					
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
				

				message.channel.send(balnoEmbed);
        cooldown = true;
    }
}
if (!cooldown) {
	let earn = Math.round(Math.random() * 6) + 1;
const mine = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(message.author.username + `'s mine`)
					.addFields (
						{name:'You dug up '+earn+' :star:s'  , value: '_'},
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Enterprises');
	message.channel.send(mine);
	for (let i = 0; i < currency.length; i++) {
            if (currency[i] === message.author.id) {           
               
		  currency[i + 1] = parseInt(currency[i + 1]) + earn;		     
            }
        }

}
