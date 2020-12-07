module.exports = {
    name: 'loop',
    description: 'get see what song is currently playin',
    cooldown: 1,
    aliases: ['repeat'],
    cd: "Don't go loopy",
    execute(message, args, d) {
        const serverQueue = message.client.queue.get(message.guild.id);;
        if (!serverQueue) return message.channel.send('There\'s nothin playin!');
        if (serverQueue.repeatMode === 0) {
            serverQueue.repeatMode = 1;
            message.channel.send('Now looping through the **song**')
        } else if (serverQueue.repeatMode === 1) {
            serverQueue.repeatMode = 2;
            message.channel.send('Now looping through the **queue**')
        } else if (serverQueue.repeatMode === 2) {
            serverQueue.repeatMode = 0;
            message.channel.send('Looping is turned off.')
        }
    }
};
