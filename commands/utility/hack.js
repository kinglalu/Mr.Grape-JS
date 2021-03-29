const devs = [329331044828446722, 320232691419316231, 705433506230304849];
 module.exports = {
   name: "hack",
   cooldown: 0,
   fan: true,
   async execute(message, args, d) {
     if (devs.includes(parseInt(message.author.id))) {
       if(!args[0]) {
         return message.channel.send("who");
       }

       if (!args[1]) {
         return message.channel.send("how much");
       }
       if (args[1] === "reset") {
         await d.users.set(args[0].replace("<", "").replace("@", "").replace(">", "").replace("!", ""), 0);
       } else {
         d.addMoni(args[0].replace("<", "").replace("@", "").replace(">", "").replace("!", ""), parseInt(args[1]));
       }
       return message.channel.send("ok ok noice");
     } else {
       return message.channel.send(
         "back off! only grape devs or Mr Grape can use this!"
       );
     }
   },
 };
