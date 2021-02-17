module.exports = {
    name: 'shop',
    description: 'display the shop',
    cooldown: 2,
    cd: "Stop shopping, you look like a diva",
    fan: true,
    execute(message, args, d) {
        const shop = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle('The Shop')
            .setDescription('To buy an item, do ' + `${d.prefix}` + "buy <itemname>")
            .addFields({
                name: 'fan:',
                value: 'reduces cooldowns of some commands\ncost: 100:star:s'
            }, {
                name: 'orangedetector',
                value: 'increases the chance you find an orange in the orange job\ncost: 100:star:s'
            }, {
                name: 'mangodetector',
                value: 'increases the chance you find a mango in the mango job\ncost: 50:star:s'
            }, {
                name: 'carrotdetector',
                value: 'increases the chance you find a carrot in the carrot job\ncost: 50:star:s'
            }, {
                name: 'starmagnet',
                value: 'increases the amount of :star:s gained per job\ncost: 100:star:s'
            }, {
                name: 'shovel',
                value: 'gives you more stars for digging job\ncost: 100:star:s'
            }, {
                name: 'Mine Shop',
                value: `do ${d.prefix}ore for more info`
            },)
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Marketplaces')
            .addField('⠀', 'Sponsered by Nodeclusters');

        message.channel.send(shop);

    }
};
