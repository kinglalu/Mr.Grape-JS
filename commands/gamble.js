//Usage: `gamble <amount>`, 50/50 chance of doubling your bet or losing it
let cooldown = false
for (let i = 0; i < cooldowns.length; i++) {
    if (cooldowns[i] === cmd + message.author.id) {
        const balnoEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('bro chill out and wait a bit')
					
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					

				message.channel.send(balnoEmbed);
        cooldown = true;
    }
}
if (!cooldown) {
    cooldowns.push(cmd + message.author.id);
    cooldowns.push("c5");
	async function gamble() {
	let ask = parseInt(args[0]);
	let check = await users.get(message.author.id);
    if (!ask || ask < 1 || ask > check) {
        message.channel.send("thats not a valid number of stars to gamble");
    } else {
        let roll = Math.floor(Math.random() * 5) + 1;
        const gambleEmbed = new Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s gambling table`)
            .addFields({
                name: '--------------',
                value: 'ok, if you roll an even number you win, if you roll an odd number, you lose'
            }, )
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Gambling Club.');

        message.channel.send(gambleEmbed).then(msg => {
                msg.delete({
                    timeout: 1800
                })
            })
            .catch(console.error);

        setTimeout(function() {

            message.edit(gambleEmbed.addFields({
                name: '--------------',
                value: 'you rolled a...'
            }, ))

            message.channel.send(gambleEmbed).then(msg => {
                    msg.delete({
                        timeout: 2700
                    })
                })
                .catch(console.error);
            setTimeout(function() {
                message.edit(gambleEmbed.addFields({
                    name: '--------------',
                    value: roll
                }, ))

                message.channel.send(gambleEmbed).then(msg => {
                        msg.delete({
                            timeout: 1000
                        })
                    })
                    .catch(console.error);
                setTimeout(function() {
                    if (roll % 2 === 0) {

                        message.edit(gambleEmbed.addFields({
                            name: '--------------',
                            value: 'Congrats, you get ' + ask + " :stars:s"
                        }, ))
			
                        message.channel.send(gambleEmbed);
                        
			    addMoni(message.author.id, ask);
                    } else {

                        message.edit(gambleEmbed.addFields({
                            name: '--------------',
                            value: 'You lost...'
                        }, ))
                        message.channel.send(gambleEmbed);
			let lose = parseInt(args[1]);
			    let loss = -1 * ask;
			    addMoni(message.author.id, loss);
                        
                    }
                }, 1100)
            }, 3100)
        }, 2100)
    }
}
gamble();
}
