module.exports = {
    name: 'sell',
    description: 'give items for a price to people',
    cooldown: 5,
    async execute(message, args, d) {
        let inv = await d.items.get(message.author.id);
        let regex = /\d+/g;
        let numberOfItemsRaw = args.join(' ').match(regex);
        let numberOfItems = parseInt(numberOfItemsRaw);
        let item = args.join(' ').replace(numberOfItems, '').replace(' ', '');
        if (!item) {
            message.channel.send('Whaddya wanna sell?');
            return;
        }
        if (numberOfItemsRaw === NaN || numberOfItemsRaw === null || numberOfItemsRaw === undefined) {
            numberOfItems = 1;
        }
        if (numberOfItems === 0) {
            message.channel.send('ok boomer');
            return;
        }
        if (!Object.keys(d.itemShop).includes(item)) {
            message.channel.send("bruh wdym, that's not a valid item to sell");
            return;
        }
        if (inv[item] === undefined) {
            message.channel.send("bruh you don't even have that item lol");
            return;
        }
        if (numberOfItems > inv[item]) {
            message.channel.send("You don't have that many " + item + '(s)');
            return;
        }
        let gain = (d.itemShop[item] / 2) * numberOfItems;
        d.addMoni(message.author.id, gain);
        inv[item] -= numberOfItems;
        await d.items.set(message.author.id, inv);
        let sale;
        if (numberOfItems === 1) {
            sale = "a " + item
        } else {
            sale = numberOfItems + " " + item + "s"
        }
        const sell = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + "'s sale")
            .addFields({
                name: 'Transaction',
                value: 'You successfully sold ' + sale + " for " + (d.itemShop[item] / 2) + " :star:s each!"
            }, {
                name: 'Profit',
                value: gain + " :star:s"
            }, )
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Marketplaces');
        message.channel.send(sell);
    }
};