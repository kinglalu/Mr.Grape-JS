module.exports = {
    name: 'daily',
    description: 'get ur daily amount of stars',
    cooldown: 86400,
    async execute(message, args, d) {
        let random = Math.floor(Math.random() * 25) + 25;
        const dailystarEmbed = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s daily reward`)
            .addFields({
                name: 'Daily Reward',
                value: 'here is ' + ` ${random} ` + ' :star:s'
            }, )
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Bank Inc.');
        message.channel.send(dailystarEmbed);
        d.addMoni(message.author.id, random);
    }

};