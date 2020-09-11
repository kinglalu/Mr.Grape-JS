//Usage: `kick`, kicks a player if you have the perms to kick
if (msg.member.hasPermission("KICK_MEMBERS")) {
    if (msg.members.mentions.first()) {
        try {
            msg.members.mentions.first().kick();
            msg.channel.send(":wave: " + member.displayName + " has been kicked, what a noob lol ");
        } catch {
            msg.reply("I do not have permissions to kick people, how about you give me it? " + msg.members.mentions.first());
    }else {
        msg.reply("bruh you dont event have permission to kick people, stop trying smh " + msg.members.mentions.first());
}
