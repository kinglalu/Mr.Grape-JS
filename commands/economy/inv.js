module.exports = {
    name: 'inv',
    description: 'check your inventory',
    aliases: ['inventory'],
    cooldown: 3,
    cd: "Yo chill ur inventory is fine",
    fan: true,
    async execute(message, args, d, client) {
        let target;
        if(args[0]) target = message.mentions.members.first() || await message.guild.members.fetch(await client.users.fetch(args[0]));
        let person;
        let personName;
        if (!target) {
            person = message.author;
            personName = message.author.username;
        } else if (target) {
            person = target;
            personName = target.displayName;
            if (target.user.bot) { return message.channel.send('No bots in da economy! (except me cus im cool)'); }
        } else { return message.channel.send('Use a valid mention!'); }
        let inv = await d.items.get(person.id);
        const invEmbed = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setDescription(`To check your ores, do ${d.prefix}io`)
            .setTitle(personName + "'s inventory")
            .setTimestamp()
            .setFooter('Grape Storages Org.')
            .addField('⠀', 'Sponsered by Nodeclusters');
        if (!inv || Object.keys(inv).length === 0 || inv.ore && Object.keys(inv).length === 1) { invEmbed.addField('nothing but cobwebs and dust m8', '_'); }
        else {
            for (const key in inv) {
                if (inv[key] === 0) {
                    delete inv[key];
                    continue;
                }
                if (typeof inv[key] === 'object') {
                    if (inv.time && Object.keys(inv.time).length === 0) {
                        delete inv.time; await d.items.set(message.author.id, inv);
                    }
                    if (inv.ore && Object.keys(inv.ore).length === 0) {
                        delete inv.ore; await d.items.set(message.author.id, inv);
                    }
                    continue;
                }
                invEmbed.addField(key.charAt(0).toUpperCase() + key.slice(1) + "(s)", inv[key]);
            }
        }
        message.channel.send(invEmbed);
    }
};
