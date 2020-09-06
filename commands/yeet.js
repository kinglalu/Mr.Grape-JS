async function display() {
message.channel.send(`${await users.get(message.author.id)}`);
}

display();
