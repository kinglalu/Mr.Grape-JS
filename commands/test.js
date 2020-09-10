async function check() {
	let a = await users.get(message.author.id);
	if (a < parseInt(args[1])) {message.channel.send('j');}
	}
check();

