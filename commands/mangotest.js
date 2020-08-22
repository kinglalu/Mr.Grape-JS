//Usage: `work`, get golden stars by helping people, 60s cooldown
let cooldown = false
for (let i = 0; i < cooldowns.length; i++) {
    if (cooldowns[i] === cmd + message.author.id) {
        message.channel.send("Sorry, i dont have any jobs for you");
        cooldown = true;
    }
}
if (!cooldown) {
    let choices = Math.floor(Math.random() * (100 - 1) ) + 1;
	let earns = Math.round(Math.random() * 7) + 1;
    if (choices === "orange") {
        cooldowns.push(cmd + message.author.id);
        cooldowns.push("c77");
    } else {
        cooldowns.push(cmd + message.author.id);
        cooldowns.push("c17");
    }

    if (choices % 2 === 0) {
	     const mangoJobGood = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(message.author.username + `'s job`)
					.addFields (
						{name: 'Help Mr.Grape catch his mango!' , value: 'I am trying to catch a flying mango, but it keeps disappearing.\nSo will you catch him and bring him to me?'},
						{name: 'Yay, you found my mango! Here, take '+earns+' :star:s!', value: '_'},
						)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Enterprises');

		message.channel.send(mangoJobGood);
        for (let i = 0; i < currency.length; i++) {
            if (currency[i] === message.author.id) {           
                currency[i + 1] += earns;		     
            }
        }
    } else if (choices % 2 === 1 || choices === 1) {
         const orangeJobBad = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(message.author.username + `'s job`)
					.addFields (
          {name: 'Help Mr.Grape catch his mango!' , value: 'I amm trying to catch a flying mango, but it keeps disappearing.\nSo will you catch him and bring him to me?'},
						{name: 'You didnt find my mango? Too bad. Try again next time.' , value: '_'},
						
						)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Enterprises');
	    message.channel.send(orangeJobBad);
	    
    }
	else {message.channel.send('Uh oh, some fruit juice spilled. (Unknown error)')
}
}
