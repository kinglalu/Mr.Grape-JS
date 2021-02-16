module.exports = {
    name: "suggestion",
    aliases: ['sug', 'suggest'],
    description: 'Suggest any ideas for Mr Grape! Any troll submits will be deleted and may face blacklist.',
    cooldown: 120,
    cd: 'we appriciate the ideas, but wait a bit dude',
     async execute(message, args, d){
        
        const channel = message.client.channels.cache.get('811284407134322700')
        
        const query = args.join(' ');
         
        if (!query) return message.reply('Please specify the suggestion dude')
        
        const suggestEmbed = new d.Discord.MessageEmbed()
        .setColor('#dd2de0')
        .setTitle('New Suggestion!')
        .addField('Author', message.author.toString(), true)
        .addField('Guild', message.guild.name, true)
        .addField('Suggestion', query)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .setFooter('Grape Reports');
        channel.send(suggestEmbed);
        message.channel.send("**Suggestion has been sent!**")
    }
