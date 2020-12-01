const recipe = require('../../utils/recipes');
module.exports = {
    name: "recipe",
    cooldown: 0,
    async execute(message, args, d) {
        let argument = args.join(' ').toLowerCase();
        if (!argument) {
            const recipeHelp = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle('Crafting Recipes!')
                .addField('Recipes', `${Object.keys(recipe).join(', ')}`)
                .setTimestamp()
                .setFooter('Grape Maker Thingy');
            return message.channel.send(recipeHelp)
        }
        if (!Object.keys(recipe).some(e => argument.includes(e))) { return message.channel.send('That\'s not a valid recipe') }
        let item = Object.keys(recipe).find(e => argument.includes(e));
        const recipeItem = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(`Recipe for ${item.charAt(0).toUpperCase() + item.slice(1)}`)
            .setDescription(recipe[item].description)
            .setTimestamp()
            .setFooter('Grape Maker Thingy');
        for (const key in recipe[item]) {
            if (key === 'createditem' || key === 'description') { continue; }
            let orePic = d.emoji[d.ores.tier1.concat(d.ores.tier2, d.ores.tier3).find(v => key.replace("refined ").includes(v))];
            recipeItem.addField(orePic + " - " + key.charAt(0).toUpperCase() + key.slice(1) + "(s) ", recipe[item][key])
        }
        message.channel.send(recipeItem);
    }
};
