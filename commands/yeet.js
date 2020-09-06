async function display() {
return message.channel.send(`${await keyv.get(message.author.id)}`);
}

display();
