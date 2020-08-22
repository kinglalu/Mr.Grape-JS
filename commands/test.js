//Usage: `work`, get golden stars by helping people, 60s cooldown
let cooldown = false
for (let i = 0; i < cooldowns.length; i++) {
    if (cooldowns[i] === cmd + message.author.id) {
        message.channel.send("Sorry, i dont have any jobs for you");
        cooldown = true;
    }
}
if (!cooldown) {
	function orange() {  let options = ["orange", "orange", "banana", "banana"];
    let choice = Math.floor(Math.random() * (100 - 1) ) + 1;
	let earn = Math.round(Math.random() * 7) + 1;
    if (choice === "orange") {
        cooldowns.push(cmd + message.author.id);
        cooldowns.push("c77");
    } else {
        cooldowns.push(cmd + message.author.id);
        cooldowns.push("c17");
    }

    if (choice % 2 === 0) {
	     const orangeJobGood = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(message.author.username + `'s job`)
					.addFields (
						{name: 'Find that orange!' , value: 'will you help me find my orange?\nit fell in a bush full of bananas over there, but i could not find it.\nPlease go there and find my orange.'},
						{name: 'Yay, you found my orange! Here, take '+earn+' :star:s!', value: '_'},
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
    } else if (choice % 2 === 1 || choice === 1) {
         const orangeJobBad = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(message.author.username + `'s job`)
					.addFields (
						{name: 'Find that orange!' , value: 'will you help me find my orange?\nit fell in a bush full of bananas over there, but i could not find it.\nPlease go there and find my orange.'},
						{name: 'That is not my orange, that is a banana! Please try again later.' , value: '_'},
						
						)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Enterprises');
	    message.channel.send(orangeJobBad);
	    
    }
	else {message.channel.send('Uh oh, some fruit juice spilled. (Unknown error)')
}}
	function mango() { let choices = Math.floor(Math.random() * (100 - 1) ) + 1;
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
	else {message.channel.send('Uh oh, some fruit juice spilled. (Unknown error)')}}
	function rabbit() {
    let choicess = Math.floor(Math.random() * (100 - 1) ) + 1;
	let earnss = Math.round(Math.random() * 7) + 1;
  

    if (choicess % 2 === 0) {
	     const limeJobGood = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(message.author.username + `'s job`)
					.addFields (
						{name: 'Help Mr.Grape find his rabbit.' , value: 'my pet rabbit has escaped!\nhe really like carrots\ncan you help lure him home?'},
						{name: 'Yay, you found my rabbit! Here, take '+earnss+' :star:s!', value: '_'},
						)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Enterprises');

		message.channel.send(limeJobGood);
        for (let i = 0; i < currency.length; i++) {
            if (currency[i] === message.author.id) {           
                currency[i + 1] += earnss;		     
            }
        }
    } else if (choicess % 2 === 1 || choicess === 1) {
         const limeJobBad = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(message.author.username + `'s job`)
					.addFields (
{name: 'Help Mr.Grape find his rabbit.' , value: 'my pet rabbit has escaped!\nhe really like carrots\ncan you help lure him home?'},
						{name: 'Sorry, I was asking for a carrot, not a lime.' , value: '_'},
						
						)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Enterprises');
	    message.channel.send(limeJobBad);
	    
    }
	else {message.channel.send('Uh oh, some fruit juice spilled. (Unknown error)')
}}
	let chooseWork = Math.round(Math.random() * 2) + 1;
	if (chooseWork === 1) {orange();}
	else if (chooseWork === 2) {mango();}
	else if (chooseWork === 3) {rabbit();}
	else {message.channel.send('Big oof. (Unspecified Error)');}
}
