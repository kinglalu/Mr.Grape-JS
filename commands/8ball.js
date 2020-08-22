// Usage: `8ball`, just a fortune-teller.
let cooldown = false
for (let i = 0; i < cooldowns.length; i++) {
    if (cooldowns[i] === cmd + message.author.id) {
        message.channel.send("Ask again later")
        cooldown = true;
    }
}
if (!cooldown) {
let wordsOfWisdom = ['Better not tell you now.', ']


}
 'Don’t count on it.'
 'It is certain.'
 'It is decidedly so.'
 'Most likely.'
' My reply is no.'
 'My sources say no.'
 Outlook not so good.'
 Outlook good.'
 Reply hazy, try again.'
 Signs point to yes.'
 Very doubtful.'
 Without a doubt.'
 Yes.'
 Yes – definitely.'
 You may rely on it.'
