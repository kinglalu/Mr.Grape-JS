async function check() {
	let rightnow = await users.get(message.author.id);
	let noice = rightnow + 1;
	message.channel.send("asdf"+noice);
	if (rightnow > parseInt(args[2])) {
		message.channel.send("treu");
		return true;}
	}
check();

