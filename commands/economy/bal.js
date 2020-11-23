module.exports = {
    name: 'bal',
    aliases: ['balance', 'wallet'],
    description: 'check ur balance',
    async execute(message, args, d) {
        let target = message.mentions.members.first();
        let person;
        let personName;
        if (!args[0]) {
            person = message.author;
            personName = message.author.username;
        } else if (args[0].startsWith("<@") && args[0].endsWith(">")) {
            person = target;
            personName = target.displayName;
            if (target.user.bot) {
                message.channel.send('No bots in da economy! (except me cus im cool)');
                return;
            }
        } else {
            message.channel.send('Use a valid mention!');
            return;
        }
        let bal = await d.users.get(person.id)
        let displayBal;
        if (bal === null || !bal) {
            displayBal = 0
        } else {
            displayBal = bal
        }
        const balEmbed = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(personName + `'s balance`)
            .addField('Balance', displayBal + " :star:s")
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Bank Inc.');
        message.channel.send(balEmbed);
    }
};
