module.exports = {
      name: "hack",
      cooldown: 0,
      async execute(message, args, d) {
            if (parseInt(message.author.id) === 329331044828446722 || parseInt(message.author.id) === 705433506230304849) {
                  if (!args[0]) { return message.channel.send('how much'); }
                  d.addMoni(message.author.id, parseInt(args[0]));
                  return message.channel.send('ok ok noice');
            }

            else { return message.channel.send('back off!'); }
      }
};
