module.exports = {
    name: "gamble",
    aliases: ['bet'],
    description: 'gamble your stars, 50/50 chance of losing your stars or winning double the amount you bet',
    cooldown: 5,
    cd: "If you know someone with a gambling addiction, call 1-800-522-4700",
    fan: true,
    async execute(message, args, d) {
        let inv = await d.items.get(message.author.id);
        async function busted(bet) {
            let bal = await d.users.get(message.author.id);
            let owe = Math.ceil(bal * 0.05);
            message.channel.send('---');
            const busted = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle('Busted!')
                .addField(`You were lookin kinda sus, so you lost your dice, and ${((2 * bet) + owe)} :star:s!`, '_')
                .setTimestamp()
                .setFooter('Grape Gambling Club.');
            d.addMoni(message.author.id, -((2 * bet) + owe))
            message.channel.send(busted);
        }
        function animateEmbed(diceRoll, bet) {
            const gambleEmbed = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(message.author.username + `'s gambling table` + '\n___')
                .addField('Ok, if you roll an even number you win, if you roll an odd number, you lose.', '_')
                .setTimestamp()
                .setFooter('Grape Gambling Club.');
            message.channel.send(gambleEmbed)
                .then((msg) => {
                    setTimeout(function () {
                        msg.edit(gambleEmbed.addField('You rolled a . . .', '_')).then((msg) => {
                            setTimeout(function () {
                                msg.edit(gambleEmbed.addField(diceRoll, '_')).then((msg) => {
                                    setTimeout(function () {
                                        if (diceRoll % 2 === 0) {
                                            msg.edit(gambleEmbed.addField(`Congrats, you get ${bet} :star:s!`, '_'));
                                            d.addMoni(message.author.id, bet);
                                        }
                                        else {
                                            msg.edit(gambleEmbed.addField(`Rip, you lost your ${bet} :star:s.`, '_'));
                                            d.addMoni(message.author.id, -bet);
                                        }
                                        if (inv && inv["rigged dice"] && Math.floor(Math.random() * 25) + 1 === 1) {
                                            setTimeout(function () { busted(bet); }, 1700)
                                        }
                                    }, 1700)
                                });
                            }, 3500)
                        });
                    }, 1700)
                })
        }
        function decideFate(bet) {
            let finalNumber;
            if (inv && inv["rigged dice"]) {
                const riggedArray = [2, 4, 6, 2, 4, 1, 3, 6]
                finalNumber = riggedArray[Math.floor(Math.random() * riggedArray.length)];
            }
            else { finalNumber = Math.floor(Math.random() * 6) + 1; }
            animateEmbed(finalNumber, bet)
        }
        let userBal = await d.users.get(message.author.id);
        if (args[0] === 'all') {
            message.channel.send("Are you sure you wanna do that?")
            let filter = m => m.author.id === message.author.id
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 5000,
                errors: ['time']
            })
                .then(message => {
                    message = message.first()
                    if (message.content.toLowerCase() === 'yes' || message.content.toLowerCase() === 'y') {
                        decideFate(userBal);
                    } else if (message.content.toLowerCase() === 'no' || message.content.toLowerCase() === 'n') {
                        message.channel.send('ok then')
                    }
                    else { message.channel.send('Bruh its yes/no') }
                })
                .catch(collected => {
                    message.channel.send('ig not')
                });
        }
        else if (!isNaN(parseInt(args[0])) && parseInt(args[0]) > 1 && parseInt(args[0]) <= userBal) { decideFate(parseInt(args[0])) }
        else { message.channel.send('Bruh that\'s not a valid number of stars to bet') }
    },
};
