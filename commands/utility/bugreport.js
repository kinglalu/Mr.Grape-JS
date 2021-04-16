 module.exports = {
    name: "bugreport",
    aliases: ['bug', 'reportbug'],
    description: 'Report an bugs for Mr Grape! Any troll submits will be deleted and may face blacklist.',
    cooldown: 120,
    cd: 'damn we really have that many bugs?',
     async execute(message, args, d){
        if (args.slice(0).join(" ").length < 15)
        return message.reply(
          "Your bug report is too short, to help prevent abuse, please give a better description"
        );
        const channel = message.client.channels.cache.get('811284407134322700')
        
        const query = args.join(' ');
         
        if (!query) return message.reply('Please specify the bug dude')
        
        const reportEmbed = new d.Discord.MessageEmbed()
        .setColor('#dd2de0')
        .setTitle('New Bug!')
        .addField('Author', message.author.toString(), true)
        .addField('Guild', message.guild.name, true)
        .addField('Report', query)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .setFooter('Grape Reports');
        channel.send(reportEmbed);
        const replyEmbed = new d.Discord.MessageEmbed()
			.setColor('#dd2de0')
			.setTitle('**Bug Report has been sent!**')
            .addField('⠀', 'View your report [here](https://discord.gg/2RKPmDg2A6)');
        message.channel.send(replyEmbed);
    }
};

