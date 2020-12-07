module.exports = {
    name: 'joke',
    description: 'get a joke',
    aliases: ['jk'],
    cooldown: 3,
    cd: "Haha, big funny, finishing laughing first",
    async execute(message, args, d) {
     let jokeURL = "https://sv443.net/jokeapi/v2/joke/Pun?blacklistFlags=nsfw,religious,political,racist,sexist&format=txt"
     let joke = await d.r2.get(jokeURL).text;
      const jk = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(`Joke`)
            .addFields({
                name: joke,
                value: '_'
            })
            .setTimestamp()
            .setFooter('Grape Jokes');
        message.channel.send(jk);
    }
};
