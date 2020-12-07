const recipe = require('../../utils/recipes');
module.exports = {
    name: "craft",
    description: 'craft items using ores!',
    cooldown: 2,
    cd: 'You can craft later bruh',
    fan: true,
    async execute(message, args, d) {
        let argument = args.join(' ').toLowerCase();
        const numberMatch = /\d+/g;
        let inv = await d.items.get(message.author.id);
        if (!inv || !inv.ore) {return message.channel.send('You don\'t have any ores!')}
        if (!argument) { return message.channel.send(`Do ${d.prefix}recipe to see what you can craft!`) }
        if (Object.keys(recipe).some(e => argument.includes(e))) {
            let craft = Object.keys(recipe).find(e => argument.includes(e));
            let numItems = parseInt(argument.match(numberMatch));
            if (numItems === 0) { return message.channel.send('ur not funny kid'); }
            if (isNaN(numItems) || numItems < 1) { numItems = 1; }
            for (const key in recipe[craft]) {
                if (typeof recipe[craft][key] === 'string') { continue; }
                if (!inv.ore[key] || inv.ore[key] < (recipe[craft][key] * numItems)) {
                    const e = new d.Discord.MessageEmbed()
                        .setColor('#dd2de0')
                        .setTitle(message.author.username + `'s craftin`)
                        .addField('Failed', `You don\'t have all the things you need to make ${craft}(s)!`)
                        .setTimestamp()
                        .setFooter('The Grape Blacksmith');
                    return message.channel.send(e);
                }
                inv.ore[key] -= recipe[craft][key] * numItems;
            }
            if (!inv[recipe[craft].createditem]) { inv[recipe[craft].createditem] = numItems }
            else { inv[recipe[craft].createditem] += numItems }
            await d.items.set(message.author.id, inv);
            const done = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(message.author.username + `'s craftin`)
                .addField('Success!', `You made ${numItems} ${craft}(s)!`)
                .setTimestamp()
                .setFooter('The Grape Blacksmith');
            return message.channel.send(done);
        }
        else {
            const e = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(message.author.username + `'s craftin`)
                .addField('Failed', 'That item doesn\'t exist!')
                .setTimestamp()
                .setFooter('The Grape Blacksmith');
            return message.channel.send(e);
        }
    }
};
