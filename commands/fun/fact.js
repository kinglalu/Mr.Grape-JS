module.exports = {
    name: 'fact',
    description: 'get a random fact',
    aliases: ['facts', 'fax', 'randomfacts', 'randomfact'],
    cooldown: 2,
    cd: "do you really need that many random facts?",
    async execute(message, args, d) {
        const { text } = await fetch(
            "https://uselessfacts.jsph.pl/random.json?language=en"
          ).then((response) => response.json());
          const Embed = new d.Discord.MessageEmbed()
            .setTitle("Random Useless Fact")
            .setURL("https://uselessfacts.jsph.pl/")
            .setColor("#dd2de0")
            .setDescription(text)
            .setFooter("Grape Facts");
          message.channel.send(Embed);
        },
      };