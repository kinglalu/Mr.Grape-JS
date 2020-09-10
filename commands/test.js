async function check() {
	let rightnow = await users.get(message.author.id);
	if (rightnow > parseInt(args[2])) {
		message.channel.send("treu");
		return true;}
	}
check();

