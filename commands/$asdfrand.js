//Usage: Gives you random events.
message.channel.send('Toggled!');
let random = Math.floor(Math.random*99)+1;
let earns = Math.floor(Math.random*99)+1;
function sendrandomevent() {

}
//asdf
client.on('message', msg => {
    if (random === 5) {
    const randomEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('Info')
					.addFields(
						{ name: 'Random Event', value: 'Quick, there is a flying orange in the night sky! Make a wish!\nThe first person to type `wish` in the chat gets '+earn+ ' :star:s' },			
					)
			     .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Enterprises');
        message.channel.send(randomEmbed);
	     
cooldowns.push(cmd + message.author.id);
 cooldowns.push("c4700000000000000");
        if (message.content === 'wish') {
         for (let i = 0; i < currency.length; i++) {
            if (currency[i] === message.author.id) {           
                
		  currency[i + 1] = parseInt(currency[i + 1]) + earns;		     
            }
        }
        
        }
    }
});



 
