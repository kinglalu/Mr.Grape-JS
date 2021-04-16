module.exports = {
    name: 'yomomma',
    description: 'give someone a random yo momma joke',
    aliases: ['ym', 'yomama', 'yourmom', 'yomother','yomum'],
    cooldown: 2,
    cd: "do you really need that that many yo momma jokes?",
    async execute(message, args, d) {
        const { joke } = await fetch(
            "https://api.yomomma.info/"
          ).then((response) => response.json());
          const Embed = new d.Discord.MessageEmbed()
            .setTitle("Yo momma joke")
            .setURL("https://api.yomomma.info/")
            .setColor("#dd2de0")
            .setDescription(joke)
            .setFooter("Grape Jokes");
          message.channel.send(Embed);
        },
      };