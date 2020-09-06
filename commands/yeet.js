async function display() {  
if (await users.get(message.author.id) === 'undefined') {
  users.set(message.author.id, 0);
}
message.channel.send(`${await users.get(message.author.id)}`);

}

display();
