  module.exports = {
    name: "russianroulette",
    aliases: ['rr'],
    description: '1/6 chance you lose all your money. 5/6 chance you multiply your bet by 2x.',
    cooldown: 1,
    cd: "pew pew",
    async execute(message, args, d) {
        function decideFate(be) {
	    var rand = Math.floor(Math.random() * 6) + 1;
            if (rand == 1) {
                d.addMoni(message.author.id, -(userBal))
                 const daa = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s Revolver`)
            .addField('You died and lost all your money. Rip', '_')
            .setTimestamp()
            .setFooter('Grape Gambling Club.');
		message.channel.send(daa)
            }
            else {
                d.addMoni(message.author.id, Math.floor(be*1.5))
                const daa = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s Revolver`)
            .addField('yay! You didn\'t die... this time... enjoy ' + Math.floor(be*1.5).toString(), '_')
            .setTimestamp()
            .setFooter('Grape Gambling Club.');
                message.channel.send(daa)
            }
        }
        let userBal = await d.users.get(message.author.id);
        let l = Math.exp("1111");
        if (args[0] === 'all') {
            message.channel.send("Are you sure you wanna do that?")
            let filter = m => m.author.id === message.author.id
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 3500,
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
        else if (!isNaN(parseInt(args[0])) && parseInt(args[0]) > 1 && ((parseInt(args[0]) <= userBal+l) || parseInt(args[0]) <= userBal)) { decideFate(parseInt(args[0])) }
        else { message.channel.send('Bruh that\'s not a valid number of stars to bet') }
    }
}; 
