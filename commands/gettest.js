

async function dolla(who, howmuch) {
    message.channel.send(howmuch+"howmuchiadd");
    let rightnow = await users.get(who);
    message.channel.send(rightnow+"current$");
    let moremoni = rightnow + howmuch;
    await users.set(who, moremoni)
  message.channel.send(`${await users.get(who)}`+"now")
}
  
  dolla(message.author.id,4);
  
  
  
  
  
