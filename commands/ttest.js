
async function test() {
return await users.get(message.author.id)
}
let var = test();
message.channel.send(test());
message.channel.send(var);
