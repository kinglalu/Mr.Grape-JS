module.exports = {
    name: 'userinfo',
    aliases: ['user'],
    description: 'return basic info about the user',
    cooldown: 2,
    execute(message, args, d) {
        let user;
        let id;
        let target = message.mentions.members.first();
        if (args[0] === undefined) {
            user = message.author.username;
            id = message.author.id
        } else if (args[0].startsWith("<@") && args[0].endsWith(">")) {
            user = target.displayName;
            id = target.id
        } else {
            message.channel.send('Use a valid mention!');
        }
        const usersoloEmbed = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle('User Info')
            .addFields({
                name: 'Username:',
                value: user
            }, {
                name: 'User ID:',
                value: id
            }, )
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Databases');

        message.channel.send(usersoloEmbed);
    }
};
//userinfo