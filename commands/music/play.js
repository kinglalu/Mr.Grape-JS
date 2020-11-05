const { Util } = require('discord.js');
const ytdl = require('ytdl-core');
const YoutubeAPI = require('simple-youtube-api');
const youtube = new YoutubeAPI(process.env.YOUTUBE);
function formatDuration(durationObj) {
    const duration = `${durationObj.hours ? durationObj.hours + ':' : ''}${
      durationObj.minutes ? durationObj.minutes : '00'
    }:${
      durationObj.seconds < 10
        ? '0' + durationObj.seconds
        : durationObj.seconds
        ? durationObj.seconds
        : '00'
    }`;
    return duration;
  }
module.exports = {
	name: 'play',
	description: 'play music, either do play <search> or play <youtube_url>',
	aliases: ['p'],
	cooldown: 2,
	async execute(message, args, d) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		if (!permissions.has('SPEAK')) return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		
		const ytRegex = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
		const serverQueue = message.client.queue.get(message.guild.id);
		const argument = args.join(' ');
		let songInfo;
		let duration;
		if (ytRegex.test(argument)) {
		songInfo = await youtube.getVideo(argument, 1);
		songInfo.url = argument;
		songInfo.duration = formatDuration(songInfo.duration);
		}
		else {
		let video = await youtube.searchVideos(argument, 1);
		songInfo = await youtube.getVideo(video[0].url);
		songInfo.url = video[0].url;
		songInfo.duration = formatDuration(songInfo.duration);
		}
		const song = {
			title: songInfo.title,
			url: songInfo.url,
			duration: songInfo.duration, 
			thumbnail: songInfo.thumbnails.high.url
		};

		if (serverQueue) {
			serverQueue.songs.push(song);
			const added = new d.Discord.MessageEmbed()
			.setColor('#dd2de0')
			.setTitle(song.title)
			.setURL(song.url)
			.setDescription(`Duration: ${song.duration}`)
			.setThumbnail(song.thumbnail)
			.addField('Added to the queue!', '_')
			.setTimestamp()
			.setFooter('DJ Grape');
			return message.channel.send(added);
		}

		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: channel,
			connection: null,
			songs: [],
			volume: 2,
			playing: true
		};
		
		message.client.queue.set(message.guild.id, queueConstruct);
		queueConstruct.songs.push(song);

		const play = async song => {
			const queue = message.client.queue.get(message.guild.id);
			if (!song) {
				queue.voiceChannel.leave();
				message.client.queue.delete(message.guild.id);
				return;
			}

			const dispatcher = queue.connection.play(ytdl(song.url,  {
								    filter: "audioonly",
								    quality: "highestaudio"
								}))
				.on('finish', () => {
					queue.songs.shift();
					play(queue.songs[0]);
				})
				.on('error', error => console.error(error));
			dispatcher.setVolumeLogarithmic(queue.volume / 5);
			const started = new d.Discord.MessageEmbed()
			.setColor('#dd2de0')
			.setTitle(song.title)
			.setURL(song.url)
			.setDescription(`Duration: ${song.duration}`)
			.setThumbnail(song.thumbnail)
			.addField('Groovin to the tunes!', '_')
			.setTimestamp()
			.setFooter('DJ Grape');
			queue.textChannel.send(started);
		};

		try {
			const connection = await channel.join();
			queueConstruct.connection = connection;
			play(queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			message.client.queue.delete(message.guild.id);
			await channel.leave();
			return message.channel.send(`I could not join the voice channel: ${error}`);
		}
	}
};
