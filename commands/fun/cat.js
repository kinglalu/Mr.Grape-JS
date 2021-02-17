module.exports = {
    name: 'cat',
    description: 'get a cat pic',
    cooldown: 2,
    cd: "Cats are cute, but chill",
    async execute(message, args, d) {
        let catapi = "https://api.thecatapi.com"
        let key = process.env.CATAPI;
        let submitURL = catapi + `/v1/images/search?mime_types=jpg,png&limit=1&size=small`;
        let pic = await d.r2.get(submitURL, { key }).json;
        const cat = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle('Cat!')
            .setImage(pic[0].url)
            .setTimestamp()
            .setFooter('Cat')
            .addField('_', 'Sponsered by nodeclusters');
        message.channel.send(cat);
    }
};
