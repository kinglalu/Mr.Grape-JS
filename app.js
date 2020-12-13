const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const Keyv = require('keyv');
const users = new Keyv(process.env.DATABASE_URL, { namespace: 'users' });
const items = new Keyv(process.env.DATABASE_URL, { namespace: 'items' });
const guilds = new Keyv(process.env.DATABASE_URL, { namespace: 'guilds' });
const d = require('./utils/constants');
const cooldowns = new Discord.Collection();
const twitchURL = "https://twitch.tv/MrGrapeTwitch";
client.commands = new Discord.Collection();
client.queue = new Discord.Collection();

fs.readdirSync('./commands').forEach(folder => {
	fs.readdirSync(`./commands/${folder}`).forEach(file => {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	});
});

users.on('error', err => console.error('Keyv (users) connection error:', err));
items.on('error', err => console.error('Keyv (items) connection error:', err));
guilds.on('error', err => console.error('Keyv (guilds) connection error:', err));

client.once('ready', () => {
	console.log('Ready!');
	client.user.setPresence({
		activity: {
			name: `${config.prefix}help in ${client.guilds.cache.size} servers`,
			type: "STREAMING",
			url: twitchURL
		},
	})
});

client.on('voiceStateUpdate', (old, New) => {
	if (old.id !== client.user.id) return;
	if (old.channelID && !New.channelID) client.queue.delete(old.guild.id)
});

client.on("guildCreate", guild => {
	client.user.setPresence({
		activity: {
			name: `${config.prefix}help in ${client.guilds.cache.size} servers`,
			type: "STREAMING",
			url: twitchURL
		},
	})
})

client.on("guildDelete", async guild => {
	client.user.setPresence({
		activity: {
			name: `${config.prefix}help in ${client.guilds.cache.size} servers`,
			type: "STREAMING",
			url: "https://www.twitch.tv/MrGrapeTwitch"
		},
	})
	await guilds.delete(guild.id);
})

client.on('message', async message => {

	let prefix;
	let guild = await guilds.get(message.guild.id);
	if (!guild || !guild.prefix) { prefix = config.prefix }
	else if (config.prefix === guild.prefix) {
		prefix = config.prefix;
		delete guild.prefix;
		if (Object.keys(guild).length === 0) await guilds.delete(message.guild.id);
		else { await guilds.set(message.guild.id, guild); }
	}
	else { prefix = guild.prefix; }

	d.prefix = prefix;

	if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type === 'dm') return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	let inv = await items.get(message.author.id);
	let haveFan;
	if (!inv) { inv = {}; }
	if (!inv.fan) { haveFan = 0 }
	else { haveFan = inv.fan }
	let cooldownAmount;
	if (command.fan) { cooldownAmount = ((1 - (0.03 * haveFan)) * (command.cooldown * 1000)) + 2; }
	else { cooldownAmount = command.cooldown * 1000; };
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			const cool = new Discord.MessageEmbed()
				.setColor('#dd2de0')
				.setTitle('ayo chill man')
				.setDescription(`${command.cd}\nWait for ${d.formatCooldown(timeLeft)}`)
				.setTimestamp()
				.setFooter('Grape Cooldowns');
			return message.channel.send(cool);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


	try {
		command.execute(message, args, d);
	} catch (error) {
		console.error(error);
		message.channel.send('made an oopsie tryna do that command');
	}
});

client.login(process.env.BOT_TOKEN);
