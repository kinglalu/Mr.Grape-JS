module.exports = {
    name: 'give',
    aliases: ['donate'],
    description: 'give stars to people',
    cooldown: 5,
    async execute(message, args, d) {
        let target = message.mentions.members.first();
        let donation = parseInt(args.find(arg => !/<@!?\d+>/g.test(arg)));

        let check = await d.users.get(message.author.id)
        if (!target) {
            message.channel.send("who u givin golden stars to");
        } else if (!donation || donation < 1 || donation > check || isNaN(donation)) {
            message.channel.send("thats not a valid number of golden stars to give")
        } else if (target.id === message.author.id) {
            message.channel.send("bruh you cant give golden stars to yourself smh")
        } else if (target.user.bot) {
            message.channel.send("bruh you cant give golden stars to a bot smh")
        } else {
            if (await d.users.get(target.id) === undefined) {
                await d.users.set(target.id, 0)
            }
            d.addMoni(message.author.id, -donation);
            d.addMoni(target.id, donation);
            const give = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(message.author.username + ` donation to ` + target.displayName)
                .addFields({
                    name: 'Donation',
                    value: 'you gave ' + `${target.displayName} ` + donation + ' :star:s'
                }, )
                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                .setTimestamp()
                .setFooter('Grape Charity Org.');

            message.channel.send(give);
        }


    }
};