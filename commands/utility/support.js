module.exports = {
	name: 'support',
	aliases: ['support','donators','supporters','boosters','donor','donors'],
	description: 'View the people that helped support Mr Grape!',
	cooldown: 2,
	cd: 'Ik they are cool people, but chill dude',
	 execute(message, args, d) {
        const supportembed = new d.Discord.MessageEmbed()
        .setColor('#dd2de0')
        .setTitle('Supporters')
        .addFields({
            name: 'To be put on here, join the discord!:',
            value: '[Invite](https://discord.gg/2RKPmDg2A6)'
        }, {
            name: 'Donators:',
            value: 'Neon#3333, Zyphex✨#7464'
        }, {
            name: 'Boosters:',
            value: 'Karlee Rae#7317'
            })
        .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
        .setTimestamp()
        .setFooter('Grape Enterprises')
        .addField('⠀', 'Sponsored by [NodeClusters](https://nodeclusters.com/billing/link.php?id=8)');

		message.channel.send(supportembed);
	}
};
