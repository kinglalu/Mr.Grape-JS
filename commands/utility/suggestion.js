 module.exports = {
    name: "suggestion",
    aliases: ['sug', 'suggest'],
    description: 'Suggest any ideas for Mr Grape! Any troll submits will be deleted and may face blacklist.',
    cooldown: 120,
    cd: 'we appriciate the ideas, but wait a bit dude',
     async execute(message, args, d){
        if (args.slice(0).join(" ").length < 15)
        return message.reply(
          "Your suggestion is too short, to help prevent abuse, please give a better description"
        );
        const channel = message.client.channels.cache.get('758005843127173221')
        
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
        const replyEmbed = new d.Discord.MessageEmbed()
			.setColor('#dd2de0')
			.setTitle('**Suggestion has been sent!**')
            .addField('⠀', 'View your suggestion [here](https://discord.gg/2RKPmDg2A6)');
        message.channel.send(replyEmbed);
    }
};

