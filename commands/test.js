//Usage: `work`, get golden stars by helping people, 60s cooldown
let cooldown = true
for (let i = 0; i < cooldowns.length; i++) {
    if (cooldowns[i] === cmd + message.author.id) {
        message.channel.send("Sorry, i dont have any jobs for you");
        cooldown = true;
    }
}
if (!cooldown) {
    //what work will you have?
    let workSituation = Math.floor(Math.random() * 0) + 1
    //program embed for orange job 

    
    if (workSituation === 1) {
         
        let options = ["orange", "orange", "banana", "banana"];
        let choice = options[Math.floor(Math.random() * options.length)];
        let earn = Math.round(Math.random() * 19) + 1
        if (choice === "orange") {
            for (let i = 0; i < currency.length; i++) {
                if (currency[i] === message.author.id) {
                    currency[i + 1] += earn;
         
                    
                }
            }
            const orangeWin = new Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s job`)
            .addFields({name: 'Find that orange!', value: 'will you help me find my orange?\nit fell in a bush full of bananas over there, but i could not find it.\nPlease go there and find my orange. '}, 
                       {name: 'Yay, you got ' +earn+' :star:s', value: '_____'},
                      ) 
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Jobs Inc.');

                    message.channel.send(orangeWin)
        }
        cooldowns.push(cmd + message.author.id);
        cooldowns.push("c77");
    } else {
       const orangeLoss = new Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s job`)
            .addFields({name: 'Find that orange!', value: 'will you help me find my orange?\nit fell in a bush full of bananas over there, but i could not find it.\nPlease go there and find my orange. '}, 
                       {name: 'That is not my orange.', value: '_____'},
                      )
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Jobs Inc.');

        message.channel.send(orangeLoss)
    cooldowns.push(cmd + message.author.id);
    cooldowns.push("c17");
}
}
