module.exports = {
name:"hack",
cooldown:0,
async execute (message,args,d) {
      if (parseInt(message.author.id) === 329331044828446722 || parseInt(message.author.id) === 705433506230304849) {d.addMoni(message.author.id, 500); return message.channel.send('ok ok noice');}
      else {return message.channel.send('back off!');}
       }
};
