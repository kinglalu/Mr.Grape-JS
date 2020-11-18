module.exports = {
    name: 'coinflip',
    description: 'flip a coin',
    cooldown: 5,
    execute(message, args, d) {
        let flip = Math.floor(Math.random() * 2) + 1;
        const coin = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s coinflip`)
            .addField('It landed on',`${(flip === 1) ? 'Heads!' : 'Tails!'}`)
            .setTimestamp()
            .setFooter('Grape Coin Flipper Club');
        message.channel.send(coin);
    }
};