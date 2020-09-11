//Usage: `kick`, kicks a player if you have the perms to kick that player
if (message.member.hasPermission("KICK_MEMBERS")) {
    if (message.members.mentions.first()) {
        try {
            message.members.mentions.first().kick();
            message.channel.send(":wave: " + member.displayName + " has been kicked, what a noob lol ");
        } catch {
            message.reply("I do not have permissions to kick people, how about you give me it? " + message.members.mentions.first());
    } 
    }
    else {
        message.reply("bruh you dont event have permission to kick people, stop trying smh " + message.members.mentions.first());
}
}
