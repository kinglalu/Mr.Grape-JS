async function chill(command, duration) {
let durationSeconds = duration * 1000;
await keyv.set(command, message.author.id, durationSeconds);
}

chill(c, 15);

async function check () {
let chek = await keyv.get(command, message.author.id);
if (chek === undefined) {message.channel.send('Cooldown complete!');}
else {message.channel.send('Cooldown in progress bro');}
}

check();
