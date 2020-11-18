module.exports = {
    name: 'sell',
    description: 'give items for a price to people',
    cooldown: 5,
    async execute(message, args, d) {
        let inv = await d.items.get(message.author.id);
        let argument = args.join(' ');
        let oreConcat = d.ores.tier1.concat(d.ores.tier2, d.ores.tier3);
        const numberRegex = /\d+/g;
        let item;
        if (Object.keys(d.itemShop).some(e => argument.includes(e))) {
            if (argument.includes('all')) {
                item = argument.replace('all', '').replace(' ', '');
                if (!inv[item]) { return message.channel.send('You dont\'t have that item!') }
                let profit = (d.itemShop[item] / 2) * inv[item];
                d.addMoni(message.author.id, profit);
                delete inv[item];
                const saleAll = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(message.author.username + '\'s sale')
                    .addFields(
                        { name: 'Transaction', value: `You sold all of your ${item}s for ${d.itemShop[item] / 2} :star:s each!` },
                        { name: 'Profit', value: `${profit} :star:s` }
                    )
                    .setTimestamp()
                    .setFooter('Grape Marketplaces');

                message.channel.send(saleAll);
            }
            else {
                let numItems = parseInt(argument.match(numberRegex))
                item = Object.keys(d.itemShop).filter(v => argument.includes(v)).pop()
                if (!inv[item]) { return message.channel.send('You dont\'t have that item!') }
                if (isNaN(numItems) || numItems < 0) { numItems = 1; }
                if (numItems === 0) { return message.channel.send('ok boomer'); }
                if (numItems > inv[item]) { return message.channel.send(`You don't have that many ${item}(s)`); }
                inv[item] -= numItems;
                let profit = (d.itemShop[item] / 2) * numItems;
                d.addMoni(message.author.id, profit);
                let receipt;
                if (numItems === 1) { receipt = `You sold a ${item} for ${d.itemShop[item] / 2} :star:s each!` }
                else { receipt = `You sold ${numItems} ${item}s for ${d.itemShop[item] / 2} :star:s each!` }
                const sale = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(message.author.username + '\'s sale')
                    .addFields(
                        { name: 'Transaction', value: receipt },
                        { name: 'Profit', value: `${profit} :star:s` }
                    )
                    .setTimestamp()
                    .setFooter('Grape Marketplaces');

                message.channel.send(sale);
            }
            await d.items.set(message.author.id, inv);
        }
        else if (oreConcat.some(e => argument.includes(e))) {
            function getOreCost(argument, item, numberOfItems) {
                let arrVal = [];
                let each;
                let profit = 0;
                if (d.ores.tier1.some(e => item.includes(e))) {
                    if (item.includes("refined")) {
                        each = d.oreSell.tier1 * 2;
                        profit += each * numberOfItems;
                    }
                    else {
                        each = d.oreSell.tier1;
                        profit += each * numberOfItems;
                    }
                    arrVal.push(each)
                    arrVal.push(profit);
                }
                else if (d.ores.tier2.some(e => item.includes(e))) {
                    if (item.includes("refined")) {
                        each = d.oreSell.tier2 * 2;
                        profit += each * numberOfItems;
                    }
                    else {
                        each = d.oreSell.tier2;
                        profit += each * numberOfItems;
                    }
                    arrVal.push(each)
                    arrVal.push(profit);
                }
                else if (d.ores.tier3.some(e => item.includes(e))) {
                    if (item.includes("refined")) {
                        each = d.oreSell.tier3 * 2
                        profit += each * numberOfItems;
                    }
                    else {
                        each = d.oreSell.tier3;
                        profit += each * numberOfItems
                    }
                    arrVal.push(each)
                    arrVal.push(profit);
                }
                return arrVal;
            }
            const oreFromArray = oreConcat.filter(v => argument.includes(v)).pop();
            if (argument.includes('all')) {
                if (argument.includes('refined')) { item = "refined " + oreFromArray }
                else { item = oreFromArray }
                if (!inv.ore[item]) { return message.channel.send('Bruh you don\'t have that ore'); }
                const soldItem = getOreCost(argument, item, inv.ore[item])
                d.addMoni(message.author.id, soldItem[1]);
                delete inv.ore[item];
                const sale = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(message.author.username + '\'s sale')
                    .addFields(
                        { name: 'Transaction', value: `You sold all of your ${item}s ${d.emoji[oreFromArray]} for ${soldItem[0]} :star:s each!` },
                        { name: 'Profit', value: `${soldItem[1]} :star:s` }
                    )
                    .setTimestamp()
                    .setFooter('Grape Marketplaces but for ores');

                message.channel.send(sale);
            }
            else {
                if (argument.includes('refined')) { item = "refined " + oreFromArray; }
                else { item = oreFromArray }
                let numItems = parseInt(argument.match(numberRegex))
                if (isNaN(numItems) || numItems < 0) { numItems = 1; }
                if (numItems === 0) { return message.channel.send('ok boomer'); }
                if (numItems > inv.ore[item]) { return message.channel.send(`You don't have that many ${item}(s)`); }
                const soldItem = getOreCost(argument, item, numItems);
                d.addMoni(message.author.id, soldItem[1]);
                inv.ore[item] -= numItems;
                let receipt;
                if (numItems === 1) { receipt = `You sold a ${item} ${d.emoji[oreFromArray]} for ${soldItem[0]} :star:s each!` }
                else { receipt = `You sold ${numItems} ${item}s ${d.emoji[oreFromArray]} for ${soldItem[0]} :star:s each!` }
                const sale = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(message.author.username + '\'s sale')
                    .addFields(
                        { name: 'Transaction', value: receipt },
                        { name: 'Profit', value: `${soldItem[1]} :star:s` }
                    )
                    .setTimestamp()
                    .setFooter('Grape Marketplaces');

                message.channel.send(sale);
            }
            await d.items.set(message.author.id, inv);
        }
        else { return message.channel.send('Bro that\'s not even a valid item, get good'); }
    }
};
