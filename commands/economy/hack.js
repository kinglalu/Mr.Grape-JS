module.exports = {
name:"hack",
cooldown:0,
async execute (message,args,d) {
      if (message.author.id !== 329331044828446722 || message.author.id !== 705433506230304849) {return message.channel.send('back off!');}
      else {d.addMoni(message.author.id, 500); return message.channel.send('ok ok noice');}
       }
};
