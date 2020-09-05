bot.on("message", async(message) =>
if (true) {
await keyv.set('e', 'j');
return message.channel.send(`${await keyv.get('e')}`);
}
})
