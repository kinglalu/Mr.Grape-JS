async function chill(command, duration) {
let durationSeconds = duration * 1000;
await cooldown.set(message.author.id, command, durationSeconds);
}

chill('c', 15);

async function check () {
let chek = await cooldown.get(message.author.id);
if (chek === undefined) {
  message.channel.send('Cooldown complete!');
message.channel.send(chek);
}
else {message.channel.send('Cooldown in progress bro');}
}

check();
