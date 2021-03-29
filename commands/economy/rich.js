module.exports = {
    name: 'rich',
    description: 'totally gives you tons of stars',
    aliases: ['rich','starglitch','unlimitedstars','freestars'],
    cooldown: 2,
    cd: "dude dont abuse this economy feature too much man!!!",
    fan: false,
    execute(message, args, d) {
        const toTitleCase = (thingy) => {
            return thingy
                .toLowerCase()
                .split('\n')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join('\n');
        };

        message.channel.send('<:starbait:826145854313463828>');

    }
};