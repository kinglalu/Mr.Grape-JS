//Usage: `bal <user>`, returns the number of stars that a user has.
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

    if (true) {
        async function Auth() {
            if (await users.get(message.author.id) === undefined) {
                users.set(message.author.id, 0);
                setTimeout(function(){ 
    return true; 
}, 3000);
                return true;
            }
        }


        async function regularBal() {
            const balsolooEmbed = new Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(message.author.username + `'s balance`)
                .addFields({
                    name: 'Balance',
                    value: 'you have ' + `${await users.get(message.author.id)}` + ' :star:s'
                }, )
                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                .setTimestamp()
                .setFooter('Grape Bank Inc.');

            message.channel.send(balsolooEmbed);
        }
        
        if (Auth() === true) {
            const balsoloEmbed = new Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(message.author.username + `'s balance`)
                .addFields({
                    name: 'Balance',
                    value: 'you have 0 :star:s'
                }, )
                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
                .setTimestamp()
                .setFooter('Grape Bank Inc.');
            message.channel.send(balsoloEmbed);
            message.channel.send('e')
        }
        
        else {regularBal();}

    }
}
