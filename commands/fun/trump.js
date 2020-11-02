module.exports = {
    name: 'trump',
    description: 'get donald trump quote',
    cooldown: 3,
    async execute(message, args, d) {
        let trump = "https://api.tronalddump.io/random/quote";
        let quote = await d.r2.get(trump).json;
         const t = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle('Donald Trump')
            .addFields({
                name: 'Trump says',
                value: quote.value
            })
            .setTimestamp()
            .setFooter('Official Donald Trump League');
        message.channel.send(t);
    }
};
