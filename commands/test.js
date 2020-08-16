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
    const jobEmbed = new Discord.MessageEmbed()
        .setColor('#dd2de0')
        .setTitle(message.author.username + `'s gambling table`)
        .addFields({
            name: '--------------',
            value: 'hello kind human'
        }, )
        .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
        .setTimestamp()
        .setFooter('Grape Jobs Inc.');
    message.channel.send(jobEmbed);
    if (choice === "orange")

    {
        cooldowns.push(cmd + message.author.id);
        cooldowns.push("c77");
    } else {
        cooldowns.push(cmd + message.author.id);
        cooldowns.push("c17");
    }
    //message.channel.send("hello kind human");
    message.edit(jobEmbed.addFields({
        name: '--------------',
        value: 'hello kind human'
    }, ))

    message.channel.send(jobEmbed).then(msg => {
        msg.delete({
            timeout: 2700
        })
    })
    setTimeout(function() {
        //message.channel.send("will you help me find my orange?");
        message.edit(jobEmbed.addFields({
            name: '--------------',
            value: 'will you help me find my orange?'
        }, ))

        message.channel.send(jobEmbed).then(msg => {
            msg.delete({
                timeout: 2700
            })
        })
        setTimeout(function() {
            //message.channel.send("great! it fell in a bush full of bananas over there, but i couldnt find it. Please go there and find my orange");
            message.edit(jobEmbed.addFields({
                name: '--------------',
                value: 'great! it fell in a bush full of bananas over there, but i couldnt find it. Please go there and find my orange'
            }, ))

            message.channel.send(jobEmbed).then(msg => {
                msg.delete({
                    timeout: 2700
                })
            })
            setTimeout(function() {
                //message.channel.send("did you find it yet?");
                message.edit(jobEmbed.addFields({
                    name: '--------------',
                    value: 'did you find it yet?'
                }, ))

                message.channel.send(jobEmbed).then(msg => {
                    msg.delete({
                        timeout: 2700
                    })
                })
                setTimeout(function() {
                    //message.channel.send("you did? great!");
                    message.edit(jobEmbed.addFields({
                        name: '--------------',
                        value: 'you did? great!'
                    }, ))

                    message.channel.send(jobEmbed).then(msg => {
                        msg.delete({
                            timeout: 2700
                        })
                    })
                    setTimeout(function() {
                        message.edit(jobEmbed.addFields({
                            name: '--------------',
                            value: 'lets see what you found!'
                        }, ))

                        message.channel.send(jobEmbed).then(msg => {
                            msg.delete({
                                timeout: 2700
                            })
                        })
                        setTimeout(function() {
                            message.edit(jobEmbed.addFields({
                                name: '--------------',
                                value: choice
                            }, ))

                            message.channel.send(jobEmbed).then(msg => {
                                msg.delete({
                                    timeout: 2700
                                })
                            })
                            setTimeout(function() {
                                if (choice === "orange") {
                                    //message.channel.send("Yay! you found my orange! Here's some golden stars.");
                                    message.edit(jobEmbed.addFields({
                                        name: '--------------',
                                        value: 'Yay! you found my orange! Take these gold stars!'
                                    }, ))

                                    message.channel.send(jobEmbed).then(msg => {
                                        msg.delete({
                                            timeout: 2700
                                        })
                                    })
                                    for (let i = 0; i < currency.length; i++) {
                                        if (currency[i] === message.author.id) {
                                            let earn = Math.round(Math.random() * 19) + 1
                                            currency[i + 1] += earn;
                                            message.edit(jobEmbed.addFields({
                                                name: '--------------',
                                                value: 'You got ' + earn + 'gold :star:s!'
                                            }, ))

                                            message.channel.send(jobEmbed).then(msg => {
                                                msg.delete({
                                                    timeout: 2700
                                                })
                                            })
                                        }
                                    }
                                } else {
                                    //message.channel.send("Sorry, but I want my orange. Please try and find it again.");
                                    message.edit(jobEmbed.addFields({
                                        name: '--------------',
                                        value: 'Sorry, please try to find my orange later.'
                                    }, ))

                                    message.channel.send(jobEmbed).then(msg => {
                                        msg.delete({
                                            timeout: 2700
                                        })
                                    })
                                }
                            }, 1000);
                        }, 3000);
                    }, 2000);
                }, 2000);
            }, 5000);
        }, 2000);
    }, 2000);
}
