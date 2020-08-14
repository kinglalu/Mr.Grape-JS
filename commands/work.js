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
if (!cooldown)
{
	const situationArray = ["The apple has fallen from the tree!", "Mr. Jenkison threw a grape in my garage!", "I need to use the bathroom"]
const situationKeyword = ["grab apple", "throw orange", "fruit juice"]
let situationchoose = Math.round(Math.random() * 2) + 1
if (Math.round(Math.random() * 2) + 1 === 2) {
    message.channel.send("Random event time woo!");
    message.channel.send(`${situationArray[situationchoose]}`);
    message.channel.send(`Type ${situationKeyword[situationchoose]}`);
}
    if (message.content.includes(`${situationKeyword[situationchoose]}`)) {
        for (let i = 0; i < currency.length; i++) {
            if (currency[i] === message.author.id) {
                let earn = Math.round(Math.random() * 19) + 1 
		currency[i + 1] += earn;
	    }
	}
	
	
	
	let options = ["orange", "orange", "banana", "banana"];
	let choice = options[Math.floor(Math.random() * options.length)];
	if (choice === "orange")
	{
		cooldowns.push(cmd + message.author.id);
		cooldowns.push("c77");
	}										
	else
	{
		cooldowns.push(cmd + message.author.id);
		cooldowns.push("c17");
	}
	message.channel.send("hello kind human");
	setTimeout(function()
	{
		message.channel.send("will you help me find my orange?");
		setTimeout(function()
		{
			message.channel.send("great! it fell in a bush full of bananas over there, but i couldnt find it. Please go there and find my orange");
			setTimeout(function()
			{
				message.channel.send("did you find it yet?");
				setTimeout(function()
				{
					message.channel.send("you did? great!");
					setTimeout(function()
					{
						message.channel.send("you found a(n)...");
						setTimeout(function()
						{
							message.channel.send(choice);
							setTimeout(function()
							{
								if (choice === "orange")
								{
									message.channel.send("Yay! you found my orange! Here's some golden stars!");
	
									for(let i = 0; i < currency.length; i++)
									{
										if (currency[i] === message.author.id)
										{
											let earn = Math.round(Math.random() * 19) + 1
											currency[i + 1]+=earn;
										}
									}
								}

								else
								{
									message.channel.send("Sorry, but I want my orange. Please try and find it again.");
								}
							}, 1000);
						}, 3000);
					}, 2000);
				}, 2000);
			}, 5000);
		}, 2000);
	}, 2000);
}

