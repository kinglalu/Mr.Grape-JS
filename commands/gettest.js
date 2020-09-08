async function noice() {
message.channel.send(`${await users.get(message.author.id)}`)
let noicevar = await users.get(message.author.id)
message.channel.send(noicevar);
let anothervar = noicevar + 4;
message.channel.send(anothervar)
}
noice();
