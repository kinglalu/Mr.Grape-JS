module.exports = {
    name: "unscramble",
    aliases: ['unsc'],
    description: "unscramble a word for $$$",
    cooldown: 30,
    async execute(message, args, d) {
        const fruitArray = [
            'apple', 'apricot', 'avocado', 'banana', 'berry', 'blackberry', 'orange', 'blueberry', 'boysenberry', 'breadfruit', 'cantaloupe', 'cherry', 'citron', 'citrus', 'coconut', 'crabapple', 'cranberry', 'currant', 'date', 'durian', 'elderberry', 'fig', 'grape', 'grapefruit', 'guava', 'honeydew', 'jackfruit', 'kiwi', 'kumquat', 'lemon', 'lime', 'lingonberry', 'loquat', 'lychee', 'mandarin', 'mango', 'melon', 'mulberry', 'nectarine', 'papaya', 'peach', 'pear', 'persimmon', 'pineapple', 'plantain', 'plum', 'pluot', 'pomegranate', 'pomelo', 'prune', 'quince', 'raisin', 'raspberry', 'strawberry', 'tangelo', 'tangerine', 'watermelon'
        ]
        function shuffle(array) {
            const OGarray = [...array]
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            if (OGarray.join('') === array.join('')) { return shuffle(array); }
            else { return array.join(''); }
        }
        let word = fruitArray[Math.floor(Math.random() * fruitArray.length)];
        let scrambledWord = shuffle(word.split(''));
        const scrambleEmbed = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s task`)
            .addField('Unscramble the fruit!', `${scrambledWord}`)
            .setTimestamp()
            .setFooter('Grape Enterprises');
        message.channel.send(scrambleEmbed);
        let filter = m => m.author.id === message.author.id
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 9000,
            errors: ['time']
        })
            .then(async message => {
                message = message.first()
                if (message.content.toLowerCase() === word) {
                    let e = Math.floor(Math.random() * 7) + 1;
                    let inv = await d.items.get(message.author.id);
                    if (inv.starmagnet) {
                        e = Math.round(e * (1 + (0.02 * inv.starmagnet)));
                    }
                    d.addMoni(e)
                    const yay = new d.Discord.MessageEmbed()
                        .setColor('#dd2de0')
                        .setTitle(message.author.username + `'s task`)
                        .addField('Unscramble Results', `Yay! You guessed the word correctly! You get ${e} :star:s`)
                        .setTimestamp()
                        .setFooter('Grape Enterprises');
                    message.channel.send(yay)
                } else {
                    const oof = new d.Discord.MessageEmbed()
                        .setColor('#dd2de0')
                        .setTitle(message.author.username + `'s task`)
                        .addField('Unscramble Results', `bruh ur bad, the word was ${word} duh`)
                        .setTimestamp()
                        .setFooter('Grape Enterprises');
                    message.channel.send(oof)
                }
            })
            .catch(collected => {
                const oof = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(message.author.username + `'s task`)
                    .addField('Unscramble Results', `cmon slowpoke, its not that hard, it was ${word}`)
                    .setTimestamp()
                    .setFooter('Grape Enterprises');
                message.channel.send(oof)
            });
    }
};
