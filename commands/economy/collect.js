module.exports = {
    name: 'collect',
    aliases: ['col'],
    cooldown: 0,
    description: 'collect stars if you have a starmill',
    async execute(message, args, d) {
        let inv = d.items.get(message.author.id);
        message.channel.send(inv);
        if (inv.starmill === undefined) {return message.channel.send('You don\'t have a starmill! ~~broke man~~');}
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
