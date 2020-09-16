const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const config = require("./config.json");
const Keyv = require('keyv');
const users = new Keyv(config.dbURI, { namespace: 'users' });
const commands = fs.readdirSync("./commands");
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

bot.once("reconnecting", () => {
  console.log("Reconnecting!");
});

bot.once("disconnect", () => {
  console.log("Disconnect!");
});


bot.on("message", async(message) =>
{
	if (!message.content.startsWith(config.prefix) || message.author.bot || message.channel.type === "dm") return;
	  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  	  const cmd = args.shift().toLowerCase();
	let target;
	let targets = message.mentions.members.first();
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
	
	const serverQueue = queue.get(message.guild.id);
	 const dispatcher = serverQueue.connection
    	.play(ytdl(song.url))
    	.on("finish", () => {
      	serverQueue.songs.shift();
      	play(guild, serverQueue.songs[0]);
    	})
    	.on("error", error => console.error(error));
  	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  	serverQueue.textChannel.send(`Start playing: **${song.title}**`);
	
	if (commands.includes(`${cmd}.js`))
	{
		eval(fs.readFileSync(`./commands/${cmd}.js`).toString());
	}

	
users.on('error', err => console.error('Keyv connection error:', err));
})
