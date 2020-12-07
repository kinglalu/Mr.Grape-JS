module.exports = {
    name: 'steal',
    aliases: ['rob'],
    description: "steal stars from other ppl",
    cooldown: 60,
    cd: "You're gonna look sus if you keep doing that",
    async execute(message, args, d) {
        let target = message.mentions.members.first();
        if (!target || target.id === message.author.id || target.user.bot) { return message.channel.send('That\'s aint a valid person to ~~steal~~ forcefully borrow from!'); }
        let targetBal = await d.users.get(target.id);
        let robberBal = await d.users.get(message.author.id);
        let inv = await d.items.get(message.author.id);
        if (!targetBal || targetBal < 10) { return message.channel.send("Bruh don't bully, mans too poor to steal from"); }
        if (robberBal < 10) { return message.channel.send('You don\'t got the moni to do that (get at least 10 :star:s)'); }
        async function robbery() {
            const successVar = Math.floor(Math.random() * 99) + 1;
            const e = "0.0" + (Math.floor(Math.random() * 6) + 1).toString();
            let percentage;
            if (inv && inv.lockpick) { percentage = Math.floor(Math.random() * 3) + 1; }
            else { percentage = Math.floor(Math.random() * 4) + 1; }
            if (percentage === 1) {
                let earned = Math.floor(+e * targetBal) + 2;
                d.addMoni(message.author.id, earned)
                d.addMoni(target.id, -earned)
                const nice = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(message.author.username + '\'s heist')
                    .setDescription(`Stealing from: ${target.displayName}`)
                    .addField('Success', `Heist Successful! You got ${earned} :star:s!`)
                    .setTimestamp()
                    .setFooter('Shady Grape Org');
                message.channel.send(nice);
            }
            else {
                let loss = Math.floor(+e * robberBal);
                d.addMoni(message.author.id, -loss)
                const rip = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(message.author.username + `\'s heist`)
                    .setDescription(`Stealing from: ${target.displayName}`)
                    .addField('Fail', `rip, despite ur effort, you got caught and lost ${loss} :star:s.`)
                    .setTimestamp()
                    .setFooter('Shady Grape Org');

                message.channel.send(rip);
            }
        }
        if (inv && !inv.lockpick) {
            let filter = m => m.author.id === message.author.id
            const rand = Math.floor(Math.random() * 3) + 1;
            const go = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(message.author.username + '\'s heist')
                .setDescription(`Stealing from: ${target.displayName}`)
                .addField('Task', 'Pick a number from 1 - 3, if you pick the right number the safe will be cracked, if not then rip\nYou have 7 seconds, go!')
                .setTimestamp()
                .setFooter('Shady Grape Org');
            message.channel.send(go);
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 7100,
                errors: ['time']
            })
                .then(message => {
                    message = message.first()
                    if (parseInt(message.content) === rand) {
                        robbery();
                    } else {
                        const loss = Math.floor(robberBal * 0.05);
                        d.addMoni(message.author.id, -loss)
                        const rip = new d.Discord.MessageEmbed()
                            .setColor('#dd2de0')
                            .setTitle(message.author.username + '\'s heist')
                            .setDescription(`Stealing from: ${target.displayName}`)
                            .addField('Fail', `you guessed wrong rip, you lost ${loss} :star:s`)
                            .setTimestamp()
                            .setFooter('Shady Grape Org');

                        message.channel.send(rip);
                    }
                })
                .catch(collected => {
                    const lossTime = Math.floor(robberBal * 0.07);
                    d.addMoni(message.author.id, -lossTime);
                    const rip = new d.Discord.MessageEmbed()
                        .setColor('#dd2de0')
                        .setTitle(message.author.username + '\'s heist')
                        .setDescription(`Stealing from: ${target.displayName}`)
                        .addField('Fail', `Bruh ur trash, you couldn't crack it in time, also you lost ${lossTime} :star:s`)
                        .setTimestamp()
                        .setFooter('Shady Grape Org');

                    message.channel.send(rip);
                });
        }
        else {
            robbery();
            inv.lockpick -= 1;
            await d.items.set(message.author.id, inv);
        }
    }
};
