async function check() {
	let rightnow = await users.get(message.author.id);
	message.channel.send(rightnow);
	return rightnow;
  
}
check();

