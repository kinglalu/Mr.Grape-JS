const devs = [329331044828446722, 705433506230304849, 320232691419316231];

module.exports = {
  name: "hack",
  cooldown: 0,
  fan: true,
  async execute(message, args, d) {
    if (devs.includes(parseInt(message.author.id))) {
      if (!args[0]) {
        return message.channel.send("how much");
      }
      if (args[0] === "reset") {
        await d.users.set(message.author.id, 0);
      } else if (args[0] === "resetinv") {
        const e = {};
        await d.items.set(739126780027207780, e);
      } else {
        d.addMoni(message.author.id, parseInt(args[0]));
      }
      return message.channel.send("ok ok noice");
    } else {
      return message.channel.send(
        "back off! only grape devs or Mr Grape can use this!"
      );
    }
  },
};
