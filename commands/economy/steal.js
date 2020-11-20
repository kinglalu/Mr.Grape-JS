module.exports = {
    name: 'steal',
    aliases: ['rob'],
    description: "steal stars from other ppl",
    cooldown: 60,
    async execute(message, args, d) {
        let target = message.mentions.members.first();
        if (!target || target.id === message.author.id || target.user.bot) { return message.channel.send('That\'s aint a valid person to ~~steal~~ forcefully borrow from!'); }
        let targetBal = await d.users.get(target.id);
        let robberBal = await d.users.get(message.author.id);
        if (robberBal < 10) { return message.channel.send('You don\'t got the moni to do that (get at least 10 :star:s)'); }
        function robbery() {
            const successVar = Math.floor(Math.random() * 99) + 1;
            const e = "0.0" + (Math.floor(Math.random() * 6) + 1).toString();
            if (successVar >= 60) {
                let earned = Math.floor(+e * targetBal);
                d.addMoni(message.author.id, earned)
                d.addMoni(target.id, -earned)
                const nice = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(message.author.username + '\'s heist')
                    .addFields(
                        { name: 'Success', value: `Heist Successful! You got ${earned} :star:s!` }
                    )
                    .setTimestamp()
                    .setFooter('Shady Grape Org');

                message.channel.send(nice);
            }
            else {
                let loss = Math.floor(+e * robberBal);
                d.addMoni(message.author.id, -loss)
                const rip = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(message.author.username + '\'s heist')
                    .addFields(
                        { name: 'Fail', value: `rip, despite ur effort, you got caught and lost ${loss} :star:s.` }
                    )
                    .setTimestamp()
                    .setFooter('Shady Grape Org');

                message.channel.send(rip);
            }
        }
        let filter = m => m.author.id === message.author.id
        const rand = Math.floor(Math.random() * 3) + 1;
        message.channel.send('Pick a number from 1 - 3, if you pick the right number the safe will be cracked, if not then rip')
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 5500,
            errors: ['time']
        })
            .then(message => {
                message = message.first()
                if (parseInt(message.content) === rand) {
                    robbery();
                } else {
                    const loss = Math.floor(robberBal * 0.05);
                    d.addMoni(message.author.id, -loss)
                    message.channel.send(`you guessed wrong rip, you lost ${loss} :star:s`);
                }
            })
            .catch(collected => {
                const lossTime = Math.floor(robberBal * 0.07);
                d.addMoni(message.author.id, -lossTime);
                message.channel.send(`Bruh ur trash, you couldn't crack it in time, also you lost ${lossTime} :star:s`);
            });
    }
};
