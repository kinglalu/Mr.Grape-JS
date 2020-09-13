
async function test() {
return await users.get(message.author.id)
}
let noice = test();
message.channel.send(test());
message.channel.send(noice);
