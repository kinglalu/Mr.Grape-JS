module.exports = {
    name: 'ore',
    description: 'display ores you can get',
    aliases: ['ores'],
    cooldown: 2,
    execute(message, args, d) {
        const toTitleCase = (thingy) => {
            return thingy
                .toLowerCase()
                .split('\n')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join('\n');
        };
        const ore = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle('The Ores')
            .setDescription("A list of ores you can obtain by buying/mining.")
            .addFields({
                name: 'Tier 1',
                value: `${d.ores.tier1.map(ore => toTitleCase(ore) + " " + d.emoji[ore]).join(', ')}`
            }, {
                name: 'Tier 2',
                value: `${d.ores.tier2.map(ore => toTitleCase(ore) + " " + d.emoji[ore]).join(', ')}`
            }, {
                name: 'Tier 3',
                value: `${d.ores.tier3.map(ore => toTitleCase(ore) + " " + d.emoji[ore]).join(', ')}`
            }, {
                name: 'Pickaxes',
                value: '**Tier 1**: Allows you to get Tier 1 ores, small chance of getting Tier 2 ores.\n500:star:s\n**Tier 2**: Increases chance of getting Tier 2 ores, small chance of getting Tier 3 ores.\n650:star:s\n**Tier 3**: Increases chance of getting Tier 3 ores.\n750:star:s'
            }, {
                name: `To buy a pick, type ${d.config.prefix}buy tieronepick, tier2pick, or tier3pick`,
                value: '_'
            })
            .setTimestamp()
            .setFooter('Grape Mining Corp');

        message.channel.send(ore);

    }
};
