module.exports = {
    name: 'help',
    description: 'get help for commands',
    cooldown: 2,
    execute(message, args, d) {
        let helpArg = args[0];
        if (helpArg === undefined) {
            const balnoEmbed = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle('Help')
                .addFields({
                    name: 'Help',
                    value: 'For more help in a specific area, do help <category>'
                }, {
                    name: 'Moni',
                    value: 'Help for stuff that get you stars'
                }, {
                    name: 'Fun',
                    value: 'Fun stuff you can do'
                }, {
                    name: 'Utility',
                    value: 'Just some other, somewhat useful, commands.'
                })
                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                .setTimestamp()


            message.channel.send(balnoEmbed);
        } else if (helpArg === 'moni') {

            const balnoEmbed = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle('Help')
                .addFields({
                    name: 'Bal',
                    value: 'Check your $$$. To check the balance of another user, do ' + `${d.config.prefix}` + 'bal <usermention>.'
                }, {
                    name: 'Buy',
                    value: "Do " + `${d.config.prefix}` + "buy, and the item's name and quantity (that you want) to buy!"
                }, {
                    name: 'Daily',
                    value: 'Get a daily amount of stars.'
                }, {
                    name: 'Dig',
                    value: 'Dig to get more stars!'
                }, {
                    name: 'Gamble',
                    value: 'Gamble the stars you have to get double (or nothing). 50/50 chance.'
                }, {
                    name: 'Give',
                    value: 'Feeling Charitable? Give money to another user! ' + `${d.config.prefix}` + 'give <user> <amount>.'
                }, {
                    name: 'Inventory',
                    value: 'Check yours or others inventory!\n' + `${d.config.prefix}` + 'inv <user> (user is an optional field)'
                }, {
                    name: 'Shop',
                    value: 'Display the shop!'
                }, {
                    name: 'Sell',
                    value: 'Sell your items (half the cost you bought them for), item name and how many you want to sell.'
                }, {
                    name: 'Steal',
                    value: 'Steal from the big grape himself! There is a chance of losing some of your stars.'
                }, {
                    name: 'Work',
                    value: 'Do some honest work to get stars! There is a chance of getting no stars (you do not lose any).'
                })
                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                .setTimestamp()


            message.channel.send(balnoEmbed);

        } else if (helpArg === 'utility') {

            const balnoEmbed = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle('Help')
                .addFields({
                    name: 'Info',
                    value: 'Get some info about the bot.'
                }, {
                    name: 'Invite',
                    value: 'Get the invite link for Mr. Grape!'
                }, {
                    name: 'Kick',
                    value: 'Kick that noob from your server!'
                }, {
                    name: 'Server',
                    value: 'Get some basic info about your server.'
                }, {
                    name: 'Userinfo',
                    value: 'Get some basic info about users.'
                }, )
                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                .setTimestamp()


            message.channel.send(balnoEmbed);

        } else if (helpArg === 'fun') {

            const balnoEmbed = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle('Help')
                .addFields({
                    name: '8ball',
                    value: 'Ask Mr. Grape what the future holds in store for you! Use like this: ' + `${d.config.prefix}` + '8ball <question>'
                }, {
                    name: 'coinflip',
                    value: 'Flip a coin!'
                }, {
                    name: 'ping',
                    value: 'basic ping pong command, see the ping'
                }, {
                    name: 'dice',
                    value: 'Roll a six-sided die!'
                }, )
                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                .setTimestamp()


            message.channel.send(balnoEmbed);

        } else {
            message.channel.send('Invalid help argument dummy')
        }


    }
};
