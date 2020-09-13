
async function test() {
let git = await users.get(message.author.id);
let noice = git + 1;
let cool = noice - 1
return cool;
}
let okalright = test();
message.channel.send(test());
message.channel.send(okalright);
