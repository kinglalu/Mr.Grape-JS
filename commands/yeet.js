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
     
        
    
        const balEmbed = new Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(target.displayName + `'s balance`)
            .addFields({
                name: 'Balance',
                value: target.displayName + ' has ' + `${await users.get(target.id)}`  + ' :star:s'
})
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Bank Inc.');

        message.channel.send(balEmbed);

    } else {
        async function Auth() {
            if (await users.get(message.author.id) === undefined) {
                users.set(message.author.id, 0);
            }
        }

        Auth();

        async function Asyncauth() {
            await users.get(message.author.id)
        }
        let snip = Asyncauth();
        const balsoloEmbed = new Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s balance`)
            .addFields({
                name: 'Balance',
                value: 'you have ' +  `${await users.get(message.author.id)}`  + ' :star:s'
            }, )
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Bank Inc.');

        message.channel.send(balsoloEmbed);

    }
}
