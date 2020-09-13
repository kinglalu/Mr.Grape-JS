
async function test(param) {
let git = await users.get(message.author.id);
if (param > git) {
 message.channel.send('noice')
  return true;}
else {
  message.channel.send('not noice');
  return false;}
  
}
let a = test(89);

if (a === true) {message.channel.send('it works')}
