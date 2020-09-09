async function noice() {
message.channel.send(`${await users.get(message.author.id)}`+"should print 7")
let noicevar = await users.get(message.author.id)
message.channel.send(noicevar+"should still print 7");
let rand = Math.floor(Math.random()*9)+1;
let anothervar = noicevar + rand;
message.channel.send(rand+"random number");
message.channel.send(anothervar+"7 plus a random number 1-10")
await users.set(message.author.id, anothervar);
message.channel.send(`${await users.get(message.author.id)}`+"same thing as b4")
}
noice();
message.channel.send('Above it reference function');
async function dolla(who, howmuch) {
    message.channel.send(howmuch+"howmuchiadd");
    let rightnow = await users.get(who);
    message.channel.send(rightnow+"current$");
    let moremoni = rightnow + howmuch;
    await users.set(who, moremoni)
  message.channel.send(`${await users.get(who)}`+"now")
}
  
  dolla(message.author.id,4);
  
  
  
  
  
