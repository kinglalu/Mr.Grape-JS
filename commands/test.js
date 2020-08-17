//Usage: `work`, get golden stars by helping people, 60s cooldown
let cooldown = false
for (let i = 0; i < cooldowns.length; i++) {
    if (cooldowns[i] === cmd + message.author.id) {
        message.channel.send("Sorry, i dont have any jobs for you");
        cooldown = true;
    }
}
if (!cooldown) {
    let options = ["orange", "orange", "banana", "banana"];
    let choice = options[Math.floor(Math.random() * options.length)];
	let earn = Math.round(Math.random() * 19) + 1
    if (choice === "orange") {
        cooldowns.push(cmd + message.author.id);
        cooldowns.push("c77");
    } else {
        cooldowns.push(cmd + message.author.id);
        cooldowns.push("c17");
    }

    if (choice === "orange") {
	     const orangeJobGood = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(message.author.username + `'s job`)
					.addFields (
						{name: 'Find that orange!' , value: 'will you help me find my orange?\nit fell in a bush full of bananas over there, but i could not find it.\nPlease go there and find my orange.'},
						{name: 'Yay, you found my orange! Here, take'+earn+' :star:s!', value: ''},
						)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Enterprises');

		message.channel.send(orangeJobGood);
        for (let i = 0; i < currency.length; i++) {
            if (currency[i] === message.author.id) {           
                currency[i + 1] += earn;		     
            }
        }
    } else {
         const orangeJobBad = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(message.author.username + `'s job`)
					.addFields (
						{name: 'You failed.' , value: 'That is not my orange, that is a banana! Please try again later.'},
						
						)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Enterprises');
	    message.channel.send(orangeJobBad);
	    
    }
}
