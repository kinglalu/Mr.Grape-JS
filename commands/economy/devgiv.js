module.exports = {
    name: 'give',
    aliases: ['donate'],
    description: 'give stars to people',
    cooldown: 5,
    cd: "Love the generosity, but maybe chill a bit?",
    fan: true,
    async execute(message, args, d) {
    if (parseInt(message.author.id) === 329331044828446722 || parseInt(message.author.id) === 705433506230304849) {
        const regex = /<@!?\d+>/g;        
        let argument = args.join(' ').replace(/,/g, '');
        let donation = parseInt(argument.replace(argument.match(regex), ''));
        let target = message.mentions.members.first();
        let check = await d.users.get(message.author.id)
        if (!target) {
            message.channel.send("who u givin golden stars to");
        } else if (!donation || donation > check || isNaN(donation) || donation < -1000000000000000000) {
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
              else { return message.channel.send('back off! only grape devs or Mr Grape can use this!'); }
        }
    }
};
