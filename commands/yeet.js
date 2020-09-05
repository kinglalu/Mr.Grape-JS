(async () => {
{
if (true) {
await keyv.set('e', 'j');
return message.channel.send(`${await keyv.get('e')}`);
}
})();
