async function check() {
	let rightnow = await users.get(message.author.id);
	let noice = rightnow + 0;
	
	if (noice > parseInt(args[2])) {
		message.channel.send("treu");
		return true;}
	}
check();

