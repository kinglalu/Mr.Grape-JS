module.exports = {
    name: 'user',
    aliases: ['userinfo'],
    description: 'return basic info about the user',
    cooldown: 2,
    cd: "Stop stalking",
    execute(message, args, d) {
        let user;
        let name;
        let target = message.mentions.members.first();
        if (!target) {
            user = message.guild.member(message.author);
            name = message.author.username;
        } else if (target) {
            user = target
            name = target.displayName;
        } else {
            return message.channel.send('Use a valid mention!');
        }
        const usersoloEmbed = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setAuthor(user.user.tag, user.user.displayAvatarURL())
            .addFields({
                name: 'User ID',
                value: user.id
            }, {
                name: 'Joined Server',
                value: user.joinedAt.toString().split(' ').slice(1, 4).join(' ')
            }, {
                name: 'Joined Discord',
                value: user.user.createdAt.toString().split(' ').slice(1, 4).join(' ')
            })
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Databases');

        message.channel.send(usersoloEmbed);
    }
};