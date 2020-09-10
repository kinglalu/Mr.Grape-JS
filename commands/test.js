
async function check() {
	let a = await users.get(message.author.id, false)
	return a;
	if (a === -1) {return true;}
	else {return false;}
}

if(check()) {message.channel.send('ok')}



