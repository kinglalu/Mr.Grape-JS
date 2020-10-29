module.exports = {
    name: 'collect',
    aliases: ['col'],
    cooldown: 600,
    description: 'collect stars if you have a starmill',
    async execute(message, args, d) {
        let starmill = d.items.get(message.author.id);
        message.channel.send(starmill.starmill);
        if (starmill.starmill === undefined) {return message.channel.send('You don\'t have a starmill! ~~broke man~~');}
        else {
        d.addMoni(message.author.id, starmill.starmill);
        const colEmbed = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s collection of stars`)
            .addFields({
                name: 'Collected',
                value: starmill.starmill + " :star:s"
            }, )
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Bank Inc.');
        message.channel.send(colEmbed);
        }
    }
};
