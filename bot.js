const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const config = require("./config.json");
const Keyv = require('keyv');
const users = new Keyv(config.dbURI, { namespace: 'users' });
//dec
const commands = fs.readdirSync("./commands");
let cooldowns = fs.readFileSync("./storage/cooldowns.txt").toString().split("\n");
bot.login(process.env.BOT_TOKEN);

function randomEvent() {
	let rand = Math.floor(Math.random()*199)+1;
	let earn = Math.floor(Math.random()*49)+1;
	if (rand === 1 || rand === 2) {
		const randomEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('Info')
					.addFields(
						{ name: 'Random Event', value: 'Quick, there is a flying orange in the night sky! Make a wish!\nThe first person to type `wish` in the chat gets '+earn+ ' :star:s' },			
					)
			     .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Enterprises');
		message.channel.send(randomEmbed);
	
		if (message.content === 'wish') {
		    const yayEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('Info')
					.addFields(
						{ name: 'Random Event Winner', value: 'Congrats '+`${message.author.username}`+' you got '+earn+' :star:s for this event!' },			
					)
			     .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Enterprises');
		message.channel.send(yayEmbed);
		addMoni(message.author.id, earn);
		    }
	}
}

setInterval(function()
{
	
	fs.writeFileSync("./storage/cooldowns.txt", cooldowns.join("\n"));

	for(let i = 0; i < cooldowns.length; i++)
	{
		if (cooldowns[i].toString().startsWith("c"))
		{
			let remaining = parseInt(cooldowns[i].slice(1, cooldowns[i].length));
			remaining--;
			cooldowns[i] = `c${remaining}`;

			if (parseInt(cooldowns[i].slice(1, cooldowns[i].length)) < 1)
			{
				cooldowns.splice(i - 1, 2);
			}
		}
	}
}, 1000);

bot.once("ready", async() =>
{
	console.log("Ready");
	bot.user.setActivity(`for ${config.prefix}help`, {"type": "WATCHING"})
})



bot.on("message", async(message) =>
{
	if (!message.content.startsWith(config.prefix) || message.author.bot || message.channel.type === "dm") return;
	  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  	  const cmd = args.shift().toLowerCase();
	let target;
	if (args[1])
	{
		target = message.guild.members.cache.find(member => member.id === args[1].replace("<@", "").replace(">", ""));
	}
	
		async function addMoni(who, howmuch) {
    		let rightnow = await users.get(who);
			if (rightnow === undefined) {await users.set(who, 0)}
    		let moremoni = rightnow + howmuch;
    		await users.set(who, moremoni)
		}
	
	randomEvent();
	
	if (commands.includes(`${cmd}.js`))
	{
		eval(fs.readFileSync(`./commands/${cmd}.js`).toString());
	}

	
users.on('error', err => console.error('Keyv connection error:', err));
})
