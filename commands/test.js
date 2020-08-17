//Usage: `work`, get golden stars by helping people, 60s cooldown
let cooldown = false
for (let i = 0; i < cooldowns.length; i++) {
    if (cooldowns[i] === cmd + message.author.id) {
        message.channel.send("Sorry, i dont have any jobs for you");
        cooldown = true;
    }
}
if (!cooldown) {
	let random = Math.floor(Math.random() * 19) + 1;
    let options = ["orange", "orange", "banana", "banana"];
    let choice = options[Math.floor(Math.random() * options.length)];
    if (choice === "orange") {
        cooldowns.push(cmd + message.author.id);
        cooldowns.push("c77");
    } else {
        cooldowns.push(cmd + message.author.id);
        cooldowns.push("c17");
    }

    if (choice === "orange") {
	    const dailystarEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(message.author.username + `'s daily reward`)
					.addFields(
						{ name: 'Daily Reward', value: 'here is ' + ` ${random} ` + ' :star:s' },
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Bank Inc.');

		message.channel.send(dailystarEmbed);
         for(let i = 0; i < currency.length; i++)
    {
        if (currency[i] === message.author.id)
        {
            currency[i + 1] = parseInt(currency[i + 1]) + random;
        }
    }
    } else {
        message.channel.send("Sorry, but I want my orange. Please try and find it again.");
    }
}
