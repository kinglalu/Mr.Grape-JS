const { Util } = require('discord.js');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const ytpl = require('ytpl');
module.exports = {
	name: 'play',
	description: 'play music, either do play <search> or play <youtube_url>',
	aliases: ['p'],
	cooldown: 2,
	cd: "Wait a bit, enjoy the tunes!",
	async execute(message, args, d) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Get in a voice channel if you wanna play music!');
		const permissions = channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send('Bruh I don\'t have perms to connect');
		if (!permissions.has('SPEAK')) return message.channel.send('Bruh I don\'t have perms to speak');

		const ytRegex = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
		const plRegex = /^.*(list=)([^#\&\?]*).*/gi;
		const serverQueue = message.client.queue.get(message.guild.id);
		const argument = args.join(' ');
		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: channel,
			connection: null,
			songs: [],
			volume: 42,
			playing: true,
			repeatMode: 0,
		};

		function createSong(title, url, duration, thumbnail) {
			const song = {
				"title": title,
				"url": url,
				"duration": duration,
				"thumbnail": thumbnail
			}
			return song;
		}

		function announce(song, started, isPlaylist) {
			let e;
			if (isPlaylist) { e = 'Playlist added!' }
			else if (started) { e = 'Groovin to the tunes!' }
			else { e = 'Added to the queue!' }
			const announceEmbed = new d.Discord.MessageEmbed()
				.setColor('#dd2de0')
				.setTitle(song.title)
				.setURL(song.url)
				.setDescription(`Duration: ${song.duration}`)
				.setThumbnail(song.thumbnail)
				.addField(e, '⠀')
				.setTimestamp()
				.setFooter('DJ Grape')
				.addField('⠀', 'Sponsered by Nodeclusters');
			return announceEmbed;
		}

		if (ytRegex.test(argument) && plRegex.test(argument)) {
				if (!serverQueue) { message.client.queue.set(message.guild.id, queueConstruct); }
				try {
					const playlist = await ytpl(argument);
					for (video in playlist.items) {
						let plSong = playlist.items[video];
						let song = createSong(Util.escapeMarkdown(plSong.title), plSong.shortUrl, plSong.duration, plSong.thumbnails[0].url)
						playSong(song, message, channel, serverQueue, true)
					}
					const playlistInfo = {
						title: playlist.title.charAt(0).toUpperCase() + playlist.title.slice(1),
						url: playlist.url,
						thumbnail: playlist.thumbnails[0].url,
						duration: 'It\'s a playlist bro'
					}
					message.channel.send(announce(playlistInfo, false, true));
				}
				catch (e) {
					message.channel.send("Invalid playlist url, or technical difficulties");
					message.client.queue.delete(message.guild.id);
					console.log(e);
					return message.delete();
				}
		
		}
		else {
			let song;
			if (ytdl.validateURL(argument)) {
				let e = await ytdl.getBasicInfo(argument);
				let songInfo = e.videoDetails;
				let duration = new Date(songInfo.lengthSeconds * 1000).toISOString().substr(11, 8);
				if (duration.startsWith('00:')) { duration = duration.replace('00:', ''); }
				song = createSong(Util.escapeMarkdown(songInfo.title), songInfo.video_url, duration, songInfo.thumbnail.thumbnails[0].url)
			}
			else {
				let songInfo = (await ytsr(`https://www.youtube.com/results?search_query=${encodeURIComponent(argument)}&sp=EgIQAQ%253D%253D`, { limit: 1 })).items[0];
				if (songInfo === null) { return message.channel.send("No results found!"); }
				song = createSong(Util.escapeMarkdown(songInfo.title), songInfo.url, songInfo.duration, songInfo.thumbnails[0].url)
			}
			playSong(song, message, channel, serverQueue, false)
		}

		async function playSong(song, message, vc, queue, ifPlaylist) {
			if (queue) {
				queue.songs.push(song);
				if (!ifPlaylist) { message.channel.send(announce(song, false, false)); }
				return;
			}

			message.client.queue.set(message.guild.id, queueConstruct);
			queueConstruct.songs.push(song);


			const play = async song => {
				const queue = message.client.queue.get(message.guild.id);
				if (!song) {
					message.guild.me.voice.channel.leave();
					message.client.queue.delete(message.guild.id);
					return;
				}
				let stream = ytdl(song.url, {
					filter: "audioonly",
					quality: "highestaudio"
				});

				const dispatcher = queue.connection.play(stream)
					.on('finish', () => {
						if (queue.repeatMode === 0) { queue.songs.shift(); }
						else if (queue.repeatMode === 2) { queue.songs.push(queue.songs.shift()); }
						else { null; }
						play(queue.songs[0]);
					})
					.on('error', error => console.error(error));
				dispatcher.setVolumeLogarithmic(queue.volume / 100);
				if (!ifPlaylist) { queue.textChannel.send(announce(song, true, false)); }
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
	}
};
