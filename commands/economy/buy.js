module.exports = {
    name: 'buy',
    aliases: ['purchase'],
    description: 'buy stuff from the shop',
    cooldown: 2,
    cd: "Stop buying so much, ur gonna look like a diva",
    fan: true,
    async execute(message, args, d) {
        const notitem = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + "'s purchase")
            .addFields({
                name: 'Purchase Failed',
                value: 'dude thats not even an item in the shop smh'
            })
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Marketplaces');
        const broke = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + "'s purchase")
            .addFields({
                name: 'Purchase Failed',
                value: 'you donut have enough money rip'
            })
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Marketplaces');
        let have = await d.items.get(message.author.id);
        let argument = args.join(' ').toLowerCase();
        let regex = /\d+/g;
        let numberOfItemsRaw = parseInt(argument.match(regex));
        let numberOfItems = parseInt(numberOfItemsRaw);
        let item = Object.keys(d.buyableItems).filter(v => argument.includes(v)).pop();
        if (!have) { have = {}; }
        if (isNaN(numberOfItems) || numberOfItems < 0) { numberOfItems = 1; }
        if (numberOfItems === 0) { return message.channel.send('ok karen'); }
        if (!item) { return message.channel.send(notitem); }
        let total = d.buyableItems[item] * numberOfItems;
        if (total > await d.users.get(message.author.id)) { return message.channel.send(broke); }
        d.addMoni(message.author.id, -total)
        if (!have[item]) { have[item] = numberOfItems; }
        else { have[item] += numberOfItems }
        d.items.set(message.author.id, have);
        let receipt;
        if (inv && item === 'starmill') {
            if (!inv.time) { inv.time = {}; }
            if (!inv.time.starmill) { inv.time.starmill = Date.now() }
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
            .setFooter('Grape Marketplaces');
        message.channel.send(buy);
    }
};
