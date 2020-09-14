
async function test() {
let param = 89;
 let git = await users.get(message.author.id);
if (param > git) {
 message.channel.send('noice')
  return true;
}

}


if (test() === true) {message.channel.send('it works')}
