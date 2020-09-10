async function check() {
	message.channel.send(`${await users.get(message.author.id, true)}`);
	}
  
check();
