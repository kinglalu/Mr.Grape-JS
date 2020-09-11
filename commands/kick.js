//Usage: `kick`, kicks a player if you have the perms
  let member = message.mentions.members.first();
    member.kick().then((member) => {
        message.channel.send(`:wave: ${member.displayName} has been kicked, bye noob`);
    }).catch(() => {
        if (!message.member.hasPermission(['KICK_MEMBERS'])) {
            message.reply("You cannot kick members");
        } else if (member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR'])) {
            message.reply("You cannont kick this member");
        }
    })
}
