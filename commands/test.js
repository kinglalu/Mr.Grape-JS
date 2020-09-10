async function check() {
	let rightnow = await users.get(message.author.id);
	let argu = parseInt(args[2]);
	let check = Math.sign(rightnow - argu);
	if (check === -1) {
		message.channel.send("treu");
		return true;}
	}
check();

