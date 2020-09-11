//Usage: `kick`, kicks a player if you have the perms to kick that player
let target =  message.mentions.members.first();
if (message.member.hasPermission("KICK_MEMBERS")) {
    if (target) {
        try {
             target.kick();
            message.channel.send(":wave: " + target.displayName + " has been kicked, what a noob lol ");
        } catch {
            message.reply("I do not have permissions to kick people, how about you give me it? " +  target);
    } 
    }
    else {
        message.reply("bruh you dont event have permission to kick people, stop trying smh " + target);
}
}
