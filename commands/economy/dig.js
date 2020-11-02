module.exports = {
    name: 'dig',
    description: 'dig to earn stars',
    aliases: ['mine'],
    cooldown: 30,
    async execute(message, args, d) {
        let shovelBreak = Math.floor(Math.random() * 15) + 1;
        let inv = await d.items.get(message.author.id);
        let earn;
        if (inv === undefined || inv.shovel === undefined || inv.shovel === 0) {
            earn = Math.round(Math.random() * 6) + 1;
        } else {
            earn = Math.round(Math.random() * 15) + 1;
        }
        const mine = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s mine`)
            .addFields({
                name: 'You dug up ' + earn + ' :star:s',
                value: '_'
            }, )
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Enterprises');

        if (inv !== undefined && inv.shovel !== undefined && inv.shovel > 0 && shovelBreak === 1) {
            mine.addFields({
                name: 'Uh oh!',
                value: 'Your shovel broke! If you want a new one, buy it from the shop!'
            });
            inv.shovel += -1;
            await d.items.set(message.author.id, inv);
        }
        message.channel.send(mine);
        d.addMoni(message.author.id, earn);

    }
};
