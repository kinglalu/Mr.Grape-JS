module.exports = {
    name: '8ball',
    description: 'fortune telling is cool',
    cooldown: 5,
    cd: "Even a fortune-teller can tell you to chill",
    execute(message, args, d) {
        let output;
        let val;
        const wordsOfWisdom = ['Better not tell you now.', "Don’t count on it.", 'It is certain.', 'It is decidedly so.', 'Most likely.', 'My reply is no.', 'My sources say no.', 'Outlook not so good.', 'Outlook good.', 'Signs point to yes.', 'Very doubtful.', 'Without a doubt.', 'Yes.', 'Yes – definitely.', 'You may rely on it.'];
        const reject = ['Ask again later', 'Cannot predict now.', 'Concentrate and ask again', 'Reply hazy, try again.'];
        let randomReject = Math.floor(Math.random() * reject.length);
        let randomWise = Math.floor(Math.random() * wordsOfWisdom.length);
        if (args[0] === undefined) {
            output = reject[randomReject];
            val = 'Give me a question to foretell!'
        } else {
            output = wordsOfWisdom[randomWise];
            val = '⠀'
        }
        const ballEmbed = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s crystal ball`)
            .addFields({
                name: output,
                value: val
            })
            .setTimestamp()
            .setFooter('Grape Fortune-Telling')
            .addField('⠀', 'Sponsered by Nodeclusters');
        message.channel.send(ballEmbed);
    }
};