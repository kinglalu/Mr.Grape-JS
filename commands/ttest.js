
async function test(param) {
let git = await users.get(message.author.id);
if (param > git) {
 message.channel.send('noice')
  return true;
}
return false;
  }


if (test(89) === true) {message.channel.send('it works')}
