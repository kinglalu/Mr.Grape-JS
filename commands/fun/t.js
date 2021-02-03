module.exports = {
    name: 't',
    description: 'tttt',
    aliases: ['t'],
    cooldown: 2,
    cd: "slow down on the t's",
    fan: false,
    execute(message, args, d) {
        message.channel.send('t');
    }
};
