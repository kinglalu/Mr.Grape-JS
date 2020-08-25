// Usage: `8ball`, just a fortune-teller.
let cooldown = false
for (let i = 0; i < cooldowns.length; i++) {
    if (cooldowns[i] === cmd + message.author.id) {
        let reject = ['Ask again later','Cannot predict now.','Concentrate and ask again','Reply hazy, try again.'];
        let random =  Math.floor(Math.random() * reject.length);
        const rejectEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(message.author.username + `'s crystal ball`)
					.addFields(
						{ name: reject[random], value: '(Cooldown)'}
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Fortune-Telling');
        message.channel.send(rejectEmbed);
        cooldown = true;
    }
}
if (!cooldown) {
let wordsOfWisdom = ['Better not tell you now.', 'Don’t count on it.',
 'It is certain.',
 'It is decidedly so.',
 'Most likely.',
' My reply is no.',
 'My sources say no.',
 'Outlook not so good.',
 'Outlook good.',
 'Signs point to yes.',
 'Very doubtful.',
 'Without a doubt.',
 'Yes.',
 'Yes – definitely.',
 'You may rely on it.'];
 let randoms =  Math.floor(Math.random() * wordsOfWisdom.length);
        const ballEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(message.author.username + `'s crystal ball`)
					.addFields(
						{ name: wordsOfWisdom[randoms], value: '_'}
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Fortune-Telling');
        message.channel.send(ballEmbed);
 
cooldowns.push(cmd + message.author.id);
 cooldowns.push("c47");
}
 
