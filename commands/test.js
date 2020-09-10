async function check() {
	let rightnow = await users.get(message.author.id);
	if (rightnow > parseInt(args[2])) {message.channel.send("moni: "+rightnow+" true");}
	else {message.channel.send("moni: "+rightnow+" false");}
  
  
