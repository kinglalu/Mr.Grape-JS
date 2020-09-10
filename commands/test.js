async function check() {
	let a = await users.get(message.author.id);
	message.channel.send(a);
	let argu = parseInt(args[2]);
	let ok = a - argu;
	message.channel.send(ok);
	let check = Math.sign(a - argu);
	if (check === -1) {
		message.channel.send("treu");
		return true;}
	}
check();

