const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const config = require("./config.json");
const Keyv = require('keyv');
const users = new Keyv(config.dbURI, { namespace: 'users' });
//dec
const commands = fs.readdirSync("./commands");
let currency = fs.readFileSync("./storage/currency.txt").toString().split("\n");
let cooldowns = fs.readFileSync("./storage/cooldowns.txt").toString().split("\n");
bot.login(process.env.BOT_TOKEN);


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
	
	async function getMoni(param) {await users.get(param)}
	
	async function addMoni(param1, param2) {
		let current = getMoni(param1);
		message.channel.send(`${current}`+" current =")
		let newMoni = current + param2;
		message.channel.send(`${newMoni}`+" new =")
		await users.set(param1, newMoni);
		
	}
	
	if (commands.includes(`${cmd}.js`))
	{
		eval(fs.readFileSync(`./commands/${cmd}.js`).toString());
	}

	
users.on('error', err => console.error('Keyv connection error:', err));
})
