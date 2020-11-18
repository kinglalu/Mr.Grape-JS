module.exports = {
    name: 'info',
    description: 'basic info about the bot',
    cooldown: 5,
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
                name: 'Credits:',
                value: 'Kinglalu & DAONE | Goobermeister: graphics/emojis | Originally by Horsey4'
            }, {
                name: '# of Servers Mr.Grape is in:',
                value: `${message.client.guilds.cache.size}`
            }, )
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Enterprises');

        message.channel.send(info);



    }
};