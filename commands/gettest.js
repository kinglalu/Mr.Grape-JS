async function noice() {
await users.set(message.author.id, 0);
message.channel.send(`${await users.get(message.author.id)}`)
}
noice();
