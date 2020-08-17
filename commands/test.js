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
    if (choice === "orange") {
        cooldowns.push(cmd + message.author.id);
        cooldowns.push("c77");
    } else {
        cooldowns.push(cmd + message.author.id);
        cooldowns.push("c17");
    }

    if (choice === "orange") {
        for (let i = 0; i < currency.length; i++) {
            if (currency[i] === message.author.id) {
                let earn = Math.round(Math.random() * 19) + 1
                currency[i + 1] += earn;
		      const dailystarEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(message.author.username + `'s daily reward`)
					.addFields(
<<<<<<< HEAD
						{ name: 'Find that orange!', value:'will you help me find my orange?\nit fell in a bush full of bananas over there, but i could not find it.\nPlease go there and find my orange.'  },
						{name: 'Yay! You found my orange! Here take ' + ` ${random} ` + ' :star:s!', value '____'},
=======
						{ name: 'Daily Reward', value: 'here is ' },
>>>>>>> parent of 3f3e10e... Update test.js
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Bank Inc.');

		message.channel.send(dailystarEmbed);
            }
        }
    } else {
        message.channel.send("Sorry, but I want my orange. Please try and find it again.");
    }
