async function check() {
	return await users.get(message.author.id);
	}
  
  let es = check();
  
  message.channel.send("asdf "+es);
