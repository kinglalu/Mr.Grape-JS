module.exports = {
    name: 'give',
    aliases: ['donate'],
    description: 'give stars to people',
    cooldown: 5,
    cd: "Love the generosity, but maybe chill a bit?",
    fan: true,
    async execute(message, args, d, client) {
        const regex = /<@!?\d+>/g;        
        let argument = args.join(' ').replace(/,/g, '');
        let donation = args[1];
        let target
        if(args[0]) target = message.mentions.members.first() || await message.guild.members.fetch(await client.users.fetch(args[0]));
        let check = await d.users.get(message.author.id)
        if (!target) {
            message.channel.send("who u givin golden stars to");
        } else if (!donation || donation > check || isNaN(donation) || donation < 0) {
            message.channel.send("thats not a valid number of golden stars to give")
        } else if (donation === 0) {
            message.channel.send('ok scrooge');
        } else if (target.id === message.author.id) {
            message.channel.send("bruh you cant give golden stars to yourself smh")
        } else if (target.user.bot) {
            message.channel.send("bruh you cant give golden stars to a bot smh")
        } else {
            d.addMoni(message.author.id, -donation);
            d.addMoni(target.id, donation);
            const give = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(message.author.username + "'s donation to " + target.displayName)
                .addField('Donation', 'you gave ' + `${target.displayName} ` + donation + ' :star:s')
                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                .setTimestamp()
                .setFooter('Grape Charity Org.');

            message.channel.send(give);
        }
    }
};

