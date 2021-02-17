module.exports = {
    name: 'daily',
    description: 'get ur daily amount of stars',
    cooldown: 86400,
    cd: "It's called daily for a reason, smh",
    async execute(message, args, d) {
        let random = Math.floor(Math.random() * 25) + 25;
        const dailystarEmbed = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s daily reward`)
            .addField('Daily Reward','here is ' + ` ${random} ` + ' :star:s')
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Bank Inc.')
            .addField('_', 'Sponsered by nodeclusters');
        message.channel.send(dailystarEmbed);
        d.addMoni(message.author.id, random);
    }

};