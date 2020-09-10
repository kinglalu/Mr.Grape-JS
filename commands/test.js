
async function check() {
	let a = await users.get(message.author.id, false)
	if (a === -1) {return true;}
	else {return;}
}

if(check()) {message.channel.send('ok')}



