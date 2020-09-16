//Usage: `kick`, kicks a member if you have the perms to kick that member
let boolean = message.member.hasPermission("KICK_MEMBERS");
if (boolean) {
    if (targets) {
        try {
             targets.kick();
            message.channel.send(":wave: " + targets.displayName + " has been kicked, what a noob lol ");
        } catch {
            message.reply("I don't got permissions to kick people, how about you give me it? ");
    } 
    }
}
    else if (!boolean) {
        message.reply("bruh you dont even have permission to kick people, stop trying smh ");
}
    else {message.channel.send("Cannot kick "+targets.displayName);}
