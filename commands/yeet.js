//Usage: `bal <user>`, returns the number of stars a user has
let cooldown = false
for (let i = 0; i < cooldowns.length; i++) {
    if (cooldowns[i] === cmd + message.author.id) {
        const balnoEmbed = new Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle('bro chill out and wait a bit')

            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()


        message.channel.send(balnoEmbed);
        cooldown = true;
    }
}
if (!cooldown) {

    cooldowns.push(cmd + message.author.id);
    cooldowns.push("c5");

    if (target) {
        async function Target() {           
            if (await users.get(target.id) === undefined) {
              
                users.set(target.id, 0);
            
           }
        }

        Target();
     
       async function balTarg() {
        const balEmbed = new Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(target.displayName + `'s balance`)
            .addFields({
                name: 'Balance',
                value: target.displayName + ' has ' + `${await users.get(target.id)}` +  ' :star:s'
})
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Bank Inc.');

        message.channel.send(balEmbed);
       }
        balTarg();

    } else {
    async function Auth() {           
            if (await users.get(message.author.id) === undefined) {
              
                
                  users.set(message.author.id, 0);
                  users.set(message.author.id, 0);
              }
           }
        

      
        async function balAuth() {
        const balsoloEmbed = new Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s balance`)
            .addFields({
                name: 'Balance',
                value: 'you have ' + `${await users.get(message.author.id)}` +  ' :star:s'
            }, )
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Bank Inc.');

        message.channel.send(balsoloEmbed);
        }
        Auth();
        balAuth();        

    }
}
