async function check() {
	let a = await users.get(message.author.id, false)
	message.channel.send(a);
}


if 
