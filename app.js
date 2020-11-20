const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const Keyv = require('keyv');
const users = new Keyv(process.env.DATABASE_URL, { namespace: 'users' });
const items = new Keyv(process.env.DATABASE_URL, { namespace: 'items' });
const cooldowns = new Discord.Collection();
const d = require('./utils/constants');
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

client.once('ready', () => {
	console.log('Ready!');
	client.user.setPresence({ activity: { name: `with ${config.prefix}help` }, status: 'idle' })
});

client.on('message', async message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot || message.channel.type === 'dm') return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const commandFanException = ['daily', 'steal']
	let inv = await items.get(message.author.id);
	let haveFan;
	if (inv === undefined || inv === null) { inv = {}; }
	if (inv.fan === undefined || inv.fan === null) { haveFan = 0 }
	else { haveFan = inv.fan }
	let cooldownAmount;
	if (commandFanException.includes(command.name)) { cooldownAmount = command.cooldown * 1000 }
	else { cooldownAmount = (1 - (0.1 * haveFan)) * (command.cooldown * 1000) };
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			const cool = new Discord.MessageEmbed()
				.setColor('#dd2de0')
				.setTitle('ayo chill man')
				.addFields({
					name: `${command.name.charAt(0).toUpperCase() + command.name.slice(1)}`,
					value: `${timeLeft.toFixed(1)}` + " second(s) left"
				})
				.setTimestamp()
				.setFooter('Grape Enterprises');
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