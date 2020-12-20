module.exports = {
    name: 'user',
    aliases: ['userinfo'],
    description: 'return basic info about the user',
    cooldown: 2,
    cd: "Stop stalking",
    async execute(message, args, d, client) {
        let user;
        let name;
        let target;

        if (args[0]) target = await message.mentions.users.first() || await client.users.fetch(args[0]); 
        
        if (!target) {
            user = message.author;
            name = message.author.username;
        } else if (target) {
            user = target
            name = target.displayName;
        } else {
            return message.channel.send('Use a valid mention!');
        }

        const guild = await message.guild;
        const member = await guild.members.fetch(user)        

        const usersoloEmbed = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setAuthor(`${user.username}#${user.discriminator}`, member.user.displayAvatarURL())
            .addFields({
                name: 'User ID',
                value: user.id
            }, {
                name: 'Joined Server',
                value: member.joinedAt
            }, {
                name: 'Joined Discord',
                value: user.createdAt
            })
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Databases');

        message.channel.send(usersoloEmbed);
    }
};