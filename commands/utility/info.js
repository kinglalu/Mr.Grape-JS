module.exports = {
    name: 'info',
    description: 'basic info about the bot',
    cooldown: 5,
    cd: "Its not like the info is interesting anyway",
    execute(message, args, d) {
        let uptime = message.client.uptime / 1000;
        let unit = "second(s)";
        if (uptime > 59 && unit === "second(s)") {
            uptime /= 60;
            unit = "minute(s)";
        }
        if (uptime > 59 && unit === "minute(s)") {
            uptime /= 60;
            unit = "hour(s)";
        }
        if (uptime > 23 && unit === "hour(s)") {
            uptime /= 24;
            unit = "day(s)";
        }
        const info = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle('Info')
            .addFields({
                name: 'Version:',
                value: `${d.config.version}`
            }, {
                name: 'Uptime:',
                value: `${Math.floor(uptime)}` + ` ${unit}`
            }, {
                name: 'To-do list:',
                value: `${d.config.todo.join("\n")}`
                }, {
                name: 'Recent Update:',
                value: 'Database corruption lead to data wipe, actively working on solution to fix data, +meme command added.'
            }, {
                name: 'Credits:',
                value: 'Kinglalu, DAONE, and LinuxTerm | Goobermeister: graphics/emojis | MikeLime and CompactCow: Bugfixes/minor improvements | Originally by Horsey4 and Airplane Bong.'
            }, {
                name: '# of Servers Mr.Grape is in:',
                value: `${message.client.guilds.cache.size}`
            }, {
                name: 'Total Users with Mr Grape:',
                value: `${message.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`
            }, )
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Enterprises')
            .addField('⠀', 'Sponsored by [NodeClusters](https://nodeclusters.com/billing/link.php?id=8)');

        message.channel.send(info);



    }
};
