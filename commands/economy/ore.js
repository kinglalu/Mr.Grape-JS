module.exports = {
    name: 'ore',
    description: 'display ores you can get',
    aliases: ['ores'],
    cooldown: 2,
    execute(message, args, d) {
        const ore = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle('The Ores')
            .setDescription("A list of ores you can obtain by buying/mining.")
            .addFields({
                name: 'Tier 1',
                value: 'Copper, Tin , Iron, Lead, Silver, Bronze'
            }, {
                name: 'Tier 2',
                value: 'Gold, Platinum, Titanium, Obsidian, Cobalt'
            }, {
                name: 'Tier 3',
                value: 'Starium, Lumionite, Hellinite, Grapium'
            }, )
            .setTimestamp()
            .setFooter('Grape Mining Corp');

        message.channel.send(ore);

    }
};
