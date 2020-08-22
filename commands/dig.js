//Usage: `work`, get golden stars by helping people, 60s cooldown
let cooldown = false
for (let i = 0; i < cooldowns.length; i++) {
    if (cooldowns[i] === cmd + message.author.id) {
        message.channel.send("Sorry, i dont have any jobs for you");
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
	for (let i = 0; i < currency.length; i++) {
            if (currency[i] === message.author.id) {           
                currency[i + 1] += earn;		     
            }
        }

}
