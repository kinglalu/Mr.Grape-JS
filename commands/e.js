(async () => {
if (true) {
await keyv.set('e','j');
message.channel.send(`${await keyv.get('e')}`);
}
})();
