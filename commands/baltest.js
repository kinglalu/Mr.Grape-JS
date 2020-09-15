
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
let person;
let argu = args[0];
if (argu === undefined) {person = message.author;}
else if (argu.includes(mention)) {person = targets}
else {message.channel.send('unknown error my guy');}

  async function balTarg() {    
        if (await users.get(person.id) === undefined) {
            users.set(person.id, 0);
            const balsolooEmbed = new Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(person.displayName + `'s balance`)
                .addFields({
                    name: 'Balance',
                    value: 'they have 0 :star:s'
                }, )
                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                .setTimestamp()
                .setFooter('Grape Bank Inc.');
            message.channel.send(balsolooEmbed);
        } else {
            const balsoloEmbed = new Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(person.displayName + `'s balance`)
                .addFields({
                    name: 'Balance',
                    value: 'they have ' + `${await users.get(person.id)}` + ' :star:s'
                }, )
                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                .setTimestamp()
                .setFooter('Grape Bank Inc.');
            message.channel.send(balsoloEmbed);
        }

    }

balTarg();








}
