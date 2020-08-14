//Usage: `gamble <amount>`, 50/50 chance of doubling your bet or losing it
let cooldown = false
for(let i = 0; i < cooldowns.length; i++)
{
	if (cooldowns[i] === cmd + message.author.id)
	{
		message.channel.send("bro chill out and wait a bit");
		cooldown = true;
	}
}
if (!cooldown)
{
	cooldowns.push(cmd + message.author.id);
	cooldowns.push("c5");

	if (!parseInt(args[1]) || parseInt(args[1]) < 1 || parseInt(args[1]) > parseInt(currency[currency.indexOf(message.author.id) + 1]))
	{
		message.channel.send("thats not a valid number of stars to gamble");
	}
	else
	{
		let roll = Math.round(Math.random() * 5) + 1
		message.channel.send("ok, if you roll an even number you win, if you roll an odd number, you lose");
		setTimeout(function()
		{
			message.channel.send("you rolled a...");
			setTimeout(function()
			{
				message.channel.send(roll);
				setTimeout(function()
				{
					if (roll / 2 === Math.floor(roll / 2))
					{
						message.channel.send("aw, i lost");
						currency[currency.indexOf(message.author.id) + 1] = parseInt(currency[currency.indexOf(message.author.id) + 1]) + parseInt(args[1]);
					}
					else
					{
						message.channel.send("ha, i win!");
						currency[currency.indexOf(message.author.id) + 1] -= parseInt(args[1]);
					}
				}, 1000)
			}, 3000)
		}, 2000)
	}
}