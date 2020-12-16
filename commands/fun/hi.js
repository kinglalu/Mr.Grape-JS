module.exports = {
    name: "hi",
    aliases: ['hello'],
    description: "have good manners and greet mr grape",
    cooldown: 30,
    cd: "who says hello that much dang",
    fan: false,
    async execute(message, args, d) {
        const fruitArray = [
            'hi', 'hello', 'yo', 'whats poppin', 'was upp', 'greetings', 'hey'
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
message.channel.send(word)
    }
};
