//Usage: `bal <user>`, returns the number of stars a user has
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

	if (target)
	{
		for(let i = 0; i < currency.length; i++)
		{
			if (currency[i] === target.id)
			{
				message.channel.send(`${target.displayName} has \`${currency[i + 1]}\` golden star(s)`);
			}
		}
	}
	else
	{
		for(let i = 0; i < currency.length; i++)
		{
			if (currency[i] === message.author.id)
			{
				message.channel.send(`you have \`${currency[i + 1]}\` golden star(s)`);
			}
		}
	}
}