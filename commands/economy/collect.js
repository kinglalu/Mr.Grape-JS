module.exports = {
    name: 'collect',
    aliases: ['col'],
    description: 'collect the stars from your starmill!\nbe quick, or the stars will expire (10m)',
    cooldown: 600,
    description: 'collect stars if you have a starmill',
    async execute(message, args, d) {
        let inv = await d.items.get(message.author.id);
        if (!inv || !inv.starmill || inv.starmill === 0) {return message.channel.send('You don\'t have a starmill! ~~broke man~~');}
        else {
        d.addMoni(message.author.id, inv.starmill);
        const colEmbed = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s collection of stars`)
            .addFields({
                name: 'Collected',
                value: inv.starmill + " :star:s"
            }, )
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Bank Inc.');
        message.channel.send(colEmbed);
        }
    }
};
