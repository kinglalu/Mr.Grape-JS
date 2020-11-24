module.exports = {
    name: 'gamble',
    description: 'gamble your stars 50/50 chance of losing or gaining your stars',
    cooldown: 5,
    async execute(message, args, d) {
        async function actualGamble(param) {
            let roll = Math.floor(Math.random() * 5) + 1;
            const gambleEmbed = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(message.author.username + `'s gambling table`)
                .addFields({
                    name: '--------------',
                    value: 'ok, if you roll an even number you win, if you roll an odd number, you lose'
                })
                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                .setTimestamp()
                .setFooter('Grape Gambling Club.');

            message.channel.send(gambleEmbed).then(msg => {
                msg.delete({
                    timeout: 1800
                })
            })
                .catch(console.error);

            setTimeout(function () {

                message.edit(gambleEmbed.addFields({
                    name: '--------------',
                    value: 'you rolled a...'
                }))

                message.channel.send(gambleEmbed).then(msg => {
                    msg.delete({
                        timeout: 2700
                    })
                })
                    .catch(console.error);
                setTimeout(function () {
                    message.edit(gambleEmbed.addFields({
                        name: '--------------',
                        value: roll
                    }))

                    message.channel.send(gambleEmbed).then(msg => {
                        msg.delete({
                            timeout: 0
                        })
                    })
                        .catch(console.error);
                    setTimeout(function () {
                        if (roll % 2 === 0) {

                            message.edit(gambleEmbed.addFields({
                                name: '--------------',
                                value: 'Congrats, you get ' + param + " :star:s"
                            }))

                            message.channel.send(gambleEmbed);
                            d.addMoni(message.author.id, param);
                        } else {

                            message.edit(gambleEmbed.addFields({
                                name: '--------------',
                                value: 'You lost...'
                            }))
                            message.channel.send(gambleEmbed);
                            d.addMoni(message.author.id, -param);

                        }
                    }, 1100)
                }, 3100)
            }, 2100)
        }
        let ask;
        let check = await d.users.get(message.author.id);
        if (args[0] === 'all') {
            message.channel.send('Are you sure about that?');
            let filter = m => m.author.id === message.author.id
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 7000,
                errors: ['time']
            })
                .then(async message => {
                    message = message.first()
                    if (message.content.toLowerCase() == 'yes' || message.content.toLowerCase() == 'y') {
                        ask = await d.users.get(message.author.id);
                        actualGamble(ask);
                    } else if (message.content.toLowerCase() == 'no' || message.content.toLowerCase() == 'n') {
                        message.channel.send('kk')
                    } else {
                        message.channel.send('bruh its yes or no')
                    }
                })
                .catch(collected => {
                    message.channel.send('ur slow');
                });
        } else if (!parseInt(args[0]) || parseInt(args[0]) < 1 || parseInt(args[0]) > check) {
            message.channel.send("thats not a valid number of stars to gamble");
        } else {
            ask = parseInt(args[0])
            actualGamble(ask);
        }
    }
};
