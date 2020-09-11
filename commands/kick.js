//Usage: `kick`, kicks a player if you have the perms
let buser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if (!buser) return message.channel.send("Please provide a user to kick")
let reason = args.join(" ").slice(22)
if (!reason) return message.channel.send("Please provide a reason")
if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You cant kick people stop trying smh")
if (buser.hasPermission("KICK_MEMBERS")) return message.channel.send("kicked")
let embed = new Discord.RichEmbed()
buser.ban()
.setAuthor("Kick")
.setDescription(`The user ${buser} has kicked ban for: ${reason}\n by the admin ${message.author.tag}`)
bot.channels.get("an channel id").send(embed);
