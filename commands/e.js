(async () => {
if (true) {
await keyv.set('e','j');
let yoink = keyv.get('e');
message.channel.send(yoink);
}
})();
