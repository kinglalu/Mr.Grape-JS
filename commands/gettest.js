async function noice() {
message.channel.send(`${await users.get(message.author.id)}`)
let noicevar = await users.get(message.author.id)
message.channel.send(noicevar);
let rand = Math.floor(Math.random()*9)+1;
let anothervar = noicevar + rand;
message.channel.send(anothervar)
await users.set(message.author.id, anothervar);
message.channel.send(`${await users.get(message.author.id)}`)
}
noice();
