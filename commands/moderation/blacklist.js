module.exports = {
    name: 'blacklist',
    aliases: ['bl'],
    cooldown: 0,
    description: 'blacklist noobs from using me',
    async execute(message, args, d) {
		let boolean = message.member.hasPermission("MANAGE_GUILD");
        let myBoolean = message.guild.me.hasPermission("MANAGE_GUILD");
		if (boolean) return message.channel.send('You do not have perms');
		if (myBoolean) return message.channel.send('I don\'t have perms');
        let guild = d.guilds.get(message.guild.id) || {};
        let target = message.mentions.members.first();
        if (!target) return message.channel.send('Who?')
        if (!guild.bl) guild.bl = []
        guild.bl.push(target.id);
        await d.guilds.set(message.guild.id, guild);
		message.channel.send('blacklisted');
    }
}