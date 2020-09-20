//Usage: `give <user> <amount>`, transfer golden stars from your account to anothers
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
if (!cooldown) {
try {
let item = args[0];
const itemCost = {'fan':100,'orangedetector':100,'mangodetector':50,'carrotdetector':50,'starmagnet':100,'starmill':400}
let gitCost = item.replace(/fan|orangedetector|mangodetector|carrotdetector|starmagnet|starmill/g,function(match) {return check[match];});
async function purchase() {
let cashHave = users.get(message.author.id);
let check = cashHave - gitCost;
if (Math.sign(check) === -1 || check === NaN) {message.channel.send('You don't have enough stars for your purchase or you specified an invalid item!');
else {

}




}
catch{
const usersoloEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('The Shop')
					.addFields(
						{ name: 'Error:', value: 'Invalid item specified'},
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Marketplaces');

				message.channel.send(usersoloEmbed); 
}
}
}
