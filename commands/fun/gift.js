module.exports = {
    name: 'gift',
    description: 'gift',
    aliases: ['gift'],
    cooldown: 2,
    cd: "gifttt",
    fan: false,
    execute(message, args, d) {
        const toTitleCase = (thingy) => {
            return thingy
                .toLowerCase()
                .split('\n')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join('\n');
        };

        message.channel.send('pls use giftbox');

    }
};
