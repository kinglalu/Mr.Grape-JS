const { KSoftClient } = require('@ksoft/api');
const ksoft = new KSoftClient(process.env.KSOFT);
module.exports = {
    name: 'lyrics',
    description: 'get lyrics of a song',
    cooldown: 1,
    aliases: ['lyr'],
    cd: "Chill on the karaoke kid",
    async execute(message, args, d) {
        const q = message.client.queue.get(message.guild.id);
        if (!args.length && !q) { return message.channel.send('Give me something to search up bruh') }
        let argument = args.join(' ')
        if (!argument) { argument = q.songs[0].title; }
        let { name, lyrics, url, artwork } = await ksoft.lyrics.get(argument);
        const lyricEmbed = new d.Discord.MessageEmbed()
            .setColor('#dd2ed0')
            .setTitle(name.charAt(0).toUpperCase() + name.slice(1))
            .setThumbnail(artwork)
            .setFooter('DJ Grape | Provided by KSoft.Si')
            .addField('_', 'Sponsered by nodeclusters');
        if (name.length + lyrics.length > 6000) { lyricEmbed.addField('The lyrics are too long, here is the URL!', url); }
        else if (lyrics.length > 1024) {
            let arr = lyrics.split('\n\n');
            lyricEmbed.setDescription('**Lyrics**\n**-**\n\u200b')
            for (part in arr) {
                lyricEmbed.addField('\u200b', arr[part]);
            }
        }
        else {
            lyricEmbed.setDescription('**Lyrics**\n**-**')
            lyricEmbed.addField('\u200b', lyrics)
        }
        message.channel.send(lyricEmbed);
    }
};
