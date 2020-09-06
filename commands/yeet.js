async function display() {
message.channel.send('noice');
message.channel.send(`${await keyv.get(message.author.id)}`);
}

display();
