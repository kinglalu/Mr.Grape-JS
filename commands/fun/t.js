module.exports = {
    name: 't',
    description: 'tttt',
    aliases: ['t'],
    cooldown: 2,
    cd: "slow down on the t's",
    fan: false,
    execute(message, args, d) {
        const toTitleCase = (thingy) => {
            return thingy
                .toLowerCase()
                .split('\n')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join('\n');
        };

        message.channel.send('t');

    }
};
