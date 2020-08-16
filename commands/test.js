//Usage: `work`, get golden stars by helping people, 60s cooldown
let cooldown = false
for (let i = 0; i < cooldowns.length; i++) {
    if (cooldowns[i] === cmd + message.author.id) {
        message.channel.send("Sorry, i dont have any jobs for you");
        cooldown = true;
    }
}
if (!cooldown) {
   //what work will you have?
    let workSituation = Math.floor(Math.random() * 0) + 1
   //program stuff for orange job 
    let options = ["orange", "orange", "banana", "banana"];
    let choice = options[Math.floor(Math.random() * options.length)];
    const orangeJobEmbed = new Discord.MessageEmbed()
        .setColor('#dd2de0')
        .setTitle(message.author.username + `'s job`)
        .addFields (
            {name: 'Find that orange!', value: 'will you help me find my orange?/nit fell in a bush full of bananas over there, but i could not find it./nPlease go there and find my orange. ' },
            )
        .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
        .setTimestamp()
        .setFooter('Grape Jobs Inc.');
 if (workSituation === 1) {
    if (choice === "orange")

    {
        cooldowns.push(cmd + message.author.id);
        cooldowns.push("c77");
    } else {
        cooldowns.push(cmd + message.author.id);
        cooldowns.push("c17");
    }
  
                                    for (let i = 0; i < currency.length; i++) {
                                        if (currency[i] === message.author.id) {
                                            let earn = Math.round(Math.random() * 19) + 1
                                            currency[i + 1] += earn;
                                            message.edit(orangeJobEmbed.addFields({
                                                name: 'You got ' + earn + 'gold :star:s!',
                                                value: ''
                                            }, ))

                                            message.channel.send(orangeJobEmbed).then(msg => {
                                                msg.delete({
                                                    timeout: 500
                                                })
                                            })
                                        }
                                    }
                                } else {
                                    //message.channel.send("Sorry, but I want my orange. Please try and find it again.");
                                    message.edit(jobEmbed.addFields({
                                        name: 'Sorry, please try to find my orange later.',
                                        value: ''
                                    }, ))

                                    message.channel.send(jobEmbed).then(msg => {
                                        msg.delete({
                                            timeout: 500
                                        })
                                    })
                                }                          
