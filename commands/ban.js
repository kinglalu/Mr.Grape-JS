//Usage: `ban`, bans a player if you have the perms to ban that player
let target =  message.mentions.users.first();
let boolean = message.member.hasPermission("BAN_MEMBERS");
if (boolean) {
    if (target) {
        try {
             target.ban();
            message.channel.send(":wave: " + target.displayName + " has been banned, what a noob lol ");
        } catch {
            message.reply("I don't got permissions to ban people, how about you give me it? ");
    } 
    }
}
    else if (!boolean) {
        message.reply("bruh you dont even have permission to ban people, stop trying smh ");
}
    else {message.channel.send("Cannot ban "+target.displayName);}
