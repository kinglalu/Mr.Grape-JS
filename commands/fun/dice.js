module.exports = {
    name: 'dice',
    description: 'roll a die',
    cooldown: 5,
    execute(message, args, d) {
        let roll = Math.floor(Math.random() * 6) + 1;
        const dice = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s dice`)
            .addFields({
                name: 'Roll:',
                value: roll
            })
            .setTimestamp()
            .setFooter('Grape Dice Club');
        message.channel.send(dice);
    }
};