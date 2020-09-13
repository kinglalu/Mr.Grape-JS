
async function test(param) {
let git = await users.get(message.author.id);
if (git < param) {
 message.channel.send('noice')
  return true;}
else {
  message.channel.send('not noice');
  return false}
  
}
test(89);

if (test(89) === false) {message.channel.send('it works')}
