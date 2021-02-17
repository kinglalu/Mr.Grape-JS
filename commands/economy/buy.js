module.exports = {
    name: 'buy',
    aliases: ['purchase'],
    description: 'buy stuff from the shop',
    cooldown: 2,
    cd: "Stop buying so much, ur gonna look like a diva",
    fan: true,
    async execute(message, args, d) {
        async function purchase(numberOfItems, item, message, broke, have) {
                if (isNaN(numberOfItems) || numberOfItems < 0) { numberOfItems = 1; }
                if (numberOfItems === 0) { return message.channel.send('ok karen'); }
                let total = d.buyableItems[item] * numberOfItems;
                if (total > await d.users.get(message.author.id)) { return await message.channel.send(broke); }
                d.addMoni(message.author.id, -total)  
                if (!have[item]) { have[item] = numberOfItems; }
                else { have[item] += numberOfItems }
                d.items.set(message.author.id, have);
                let receipt;
                if (item === 'starmill') {
                    if (!have.time) { have.time = {}; }
                    if (!have.time.starmill) { have.time.starmill = Date.now() }
                }
                if (numberOfItems === 1) {
                    receipt = "You successfully purchased a " + item + "!";
                } else {
                    receipt = "You successfully purchased " + numberOfItems + " " + item + "s!";
                }
                const buy = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(message.author.username + "'s purchase")
                    .addField('Receipt', receipt)
                    .setTimestamp()
                    .setFooter('Grape Marketplaces')
                    .addField('_', 'Sponsered by nodeclusters');
                message.channel.send(buy);
        }
        const notitem = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + "'s purchase")
            .addFields({
                name: 'Purchase Failed',
                value: 'dude thats not even an item in the shop smh'
            })
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Marketplaces')
            .addField('_', 'Sponsered by nodeclusters');
        const broke = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + "'s purchase")
            .addFields({
                name: 'Purchase Failed',
                value: 'you donut have enough money rip'
            })
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Marketplaces')
            .addField('_', 'Sponsered by nodeclusters');
        let have = await d.items.get(message.author.id);
        let argument = args.join('').toLowerCase().replace(/,/g,'');
        const regex = /\d+/g;
        let numberOfItems = parseInt(argument.match(regex));
        let item = argument.replace(numberOfItems, '').replace('all', '').replace('max','');
        if (Object.keys(d.itemAliases).includes(item)) { item = d.itemAliases[item]; }
        if (!Object.keys(d.buyableItems).includes(item)) return message.channel.send(notitem);
        if (!have) { have = {}; }
        if (args[args.length - 1] === 'all' || args[args.length - 1] === 'max' || args[0] === 'all' || args[0] === 'max') {
            let numberOfItems = Math.floor(await d.users.get(message.author.id) / d.buyableItems[item]);
            if (numberOfItems < 1) {
                return await message.channel.send(broke);
            } else if (numberOfItems === 1) {
                await message.channel.send("Are you sure you wanna buy " + numberOfItems + " " + item + "?")
            } else {
                await message.channel.send("Are you sure you wanna buy " + numberOfItems + " " + item + "s?")
            }
            let filter = m => m.author.id === message.author.id
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 8000,
                errors: ['time']
            })
                .then(async message => {
                    message = message.first()
                    if (message.content.toLowerCase() === 'yes' || message.content.toLowerCase() === 'y') {
                        let numberOfItems = Math.floor(await d.users.get(message.author.id) / d.buyableItems[item]);
                        if (numberOfItems === 0) { return message.channel.send('you already spent all your money karen'); }
                        purchase(numberOfItems, item, message, broke, have);
                    } else if (message.content.toLowerCase() === 'no' || message.content.toLowerCase() === 'n') {
                        return message.channel.send('ok then')
                    }
                    else { return message.channel.send('Bruh its yes/no') }
                })
                .catch(collected => {
                    return message.channel.send('ig not')
                });
        } else {
            if (isNaN(numberOfItems) || numberOfItems < 0) { numberOfItems = 1; }
            if (numberOfItems === 0) { return message.channel.send('ok karen'); }
            purchase(numberOfItems, item, message, broke, have)
        }
    }
};
