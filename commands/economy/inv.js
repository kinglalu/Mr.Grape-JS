module.exports = {
    name: 'inv',
    description: 'check your inventory',
    aliases: ['inventory'],
    cooldown: 3,
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
            if (target.user.bot) { return message.channel.send('No bots in da economy! (except me cus im cool)'); }
        } else { return message.channel.send('Use a valid mention!'); }
        let inv = await d.items.get(person.id);
        const invEmbed = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setDescription(`To check your ores, do ${d.config.prefix}io`)
            .setTitle(personName + "'s inventory")
            .setTimestamp()
            .setFooter('Grape Storages Org.');
        if (!inv || Object.keys(inv).length === 0 || inv.ore && Object.keys(inv).length === 1) { invEmbed.addField('nothing but cobwebs and dust m8', '_'); }
        else {
            for (const key in inv) {
                if (inv[key] === 0) {
                    delete inv[key];
                    await d.items.set(message.author.id, inv);
                    continue;
                }
                if (key === 'ore' || key === 'time') {
                    if (inv.time && Object.keys(inv.time).length === 0) { delete inv.time; }
                    if (inv.ore && Object.keys(inv.ore).length === 0) { delete inv.ore; }
                    continue;
                }
                invEmbed.addField(key.charAt(0).toUpperCase() + key.slice(1) + "(s)", inv[key]);
            }
        }
        message.channel.send(invEmbed);
    }
};
