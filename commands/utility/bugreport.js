module.exports = {
    name: "bugreport",
    aliases: ['bug', 'reportbug'],
    description: 'let users report bugs',
    cooldown: 60,
    cd: 'damn we really have that many bugs?',
     async execute(message, args, d, client){
        
        const channel = client.channels.cache.get('811284407134322700')
        
        const query = args.join(' ');
        if(!query) return message.reply('Please specify the bug dude')
        
        
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
        message.channel.send("**Bug report has been sent!**")
    }
};
