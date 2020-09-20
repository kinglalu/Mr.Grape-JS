async function chill(command, duration) {
let durationSeconds = duration * 1000;
await cooldown.set(message.author.id,command, durationSeconds);
}

chill('c', 15);

async function check (command) {
let chek = await cooldown.get(message.author.id);
if (chek === undefined) {message.channel.send('Cooldown complete!');}
else {message.channel.send('Cooldown in progress bro');}
}

check('c');
