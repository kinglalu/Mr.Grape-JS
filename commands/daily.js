//Usage: `daily`, gives you a random number of stars between 25 and 50, can be used once per 24 hours
let cooldown = false;
for(let i = 0; i < cooldowns.length; i++)
{
	if (cooldowns[i] === cmd + message.author.id)
	{
		message.channel.send(`it's called \`${args[0].toLowerCase()}\` for a reason smh`);
		cooldown = true;
	}
}
if (!cooldown)
{
    let random = Math.floor(Math.random() * 25) + 25;
    message.channel.send(`ok, here is your daily reward of \`${random}\` golden stars!`);
    cooldowns.push(cmd + message.author.id);
    cooldowns.push("c86400");
    for(let i = 0; i < currency.length; i++)
    {
        if (currency[i] === message.author.id)
        {
            currency[i + 1] = parseInt(currency[i + 1]) + random;
        }
    }
}
