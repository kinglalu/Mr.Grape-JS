module.exports = {
    name: 'advice',
    description: 'gives you very useful advice',
    aliases: ['advise', 'adv'],
    cooldown: 2,
    cd: "do you really need that much advice?",
    async execute(message, args, d) {
        const { advice } = await fetch(
            "https://api.adviceslip.com/advice"
          ).then((response) => response.json());
          const Embed = new d.Discord.MessageEmbed()
            .setTitle("Yo momma joke")
            .setURL("https://api.adviceslip.com/advice")
            .setColor("#dd2de0")
            .setDescription(advice)
            .setFooter("Grape Advisory");
          message.channel.send(Embed);
        },
      };