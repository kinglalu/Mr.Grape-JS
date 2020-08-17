//Usage: `work`, get golden stars by helping people, 60s cooldown
let cooldown = false
for(let i = 0; i < cooldowns.length; i++)
{
	if (cooldowns[i] === cmd + message.author.id)
	{
		message.channel.send("Sorry, i dont have any jobs for you");
		cooldown = true;
	}
}
let random = Math.floor(Math.random() * 19) + 1;
function giveMoney() 
{    
 for(let i = 0; i < currency.length; i++)
    {
        if (currency[i] === message.author.id)
        {
            currency[i + 1] = parseInt(currency[i + 1]) + random;
        }
    }   
}
if (!cooldown)
{
    let workSituation = Math.floor(Math.random() * 1) + 1;
    if (workSituation === 1) {
	let options = ["orange", "orange", "banana", "banana"];
	let choice = options[Math.floor(Math.random() * options.length)];
	if (choice === "orange")
	{
		giveMoney();
        const dailystarEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle(message.author.username + `'s daily reward`)
					.addFields(
						{ name: 'Daily Reward', value: 'here is ' + ` ${this.random} ` + ' :star:s' },
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Bank Inc.');

		message.channel.send(dailystarEmbed);
        cooldowns.push(cmd + message.author.id);
		cooldowns.push("c77");
	}
	else
	{
		message.channel.send('no monies for you')
        cooldowns.push(cmd + message.author.id);
		cooldowns.push("c17");
	}
    }
    else if (workSituation === 2) {message.channel.send('idk some other work')}
