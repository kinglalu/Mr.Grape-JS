module.exports = {
    name: 'blacklist',
    aliases: ['bl'],
    cooldown: 0,
    description: 'blacklist noobs from using me',
    async execute(message, args, d) {
        let guild = d.guilds.get(message.guild.id) || {};
        let target = message.mentions.members.first();
        if (!target) return message.channel.send('Who?')
        if (!guild.bl) guild.bl = []
        guild.bl.push(target.id);
        await guilds.set(guild);
    }
}