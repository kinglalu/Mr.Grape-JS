module.exports = {
    name: 'hi',
    description: 'a way for people to greet each other',
    aliases: ['hello'],
    cooldown: 2,
    cd: "who says hello that much dang",
    fan: false,
    execute(message, args, d) {
        const toTitleCase = (thingy) => {
            return thingy
                .toLowerCase()
                .split('\n')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join('\n');
        };

        message.channel.send('hi');

    }
};
