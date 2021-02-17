module.exports = {
    name: 'coinflip',
    description: 'flip a coin',
    aliases: ['coin', 'cf'],
    cooldown: 5,
    cd: "1 coinflip is enough",
    execute(message, args, d) {
        const coin = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s coinflip`)
            .addField('It landed on', `${Math.round(Math.random()) ? 'Heads!' : 'Tails!'}`)
            .setTimestamp()
            .setFooter('Grape Coin Flipper Club')
            .addField('_', 'Sponsered by nodeclusters');
        message.channel.send(coin);
    }
};