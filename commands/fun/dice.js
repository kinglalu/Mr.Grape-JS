module.exports = {
    name: 'dice',
    description: 'roll a die',
    cooldown: 5,
    cd: "Chill on the dice",
    execute(message, args, d) {
        let roll = Math.floor(Math.random() * 6) + 1;
        const dice = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s dice`)
            .addFields({
                name: 'Roll',
                value: roll
            })
            .setTimestamp()
            .setFooter('Grape Dice Club')
            .addField('⠀', 'Sponsored by [NodeClusters](https://nodeclusters.com/billing/link.php?id=8)');
        message.channel.send(dice);
    }
};
