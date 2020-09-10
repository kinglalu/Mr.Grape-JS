async function check() {
	const a = await users.get(message.author.id);
	let argu = parseInt(args[2]);
	let check = Math.sign(a - argu);
	if (check === -1) {
		message.channel.send("treu");
		return true;}
	}
check();

