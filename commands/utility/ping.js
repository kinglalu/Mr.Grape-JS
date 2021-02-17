module.exports = {
	name: 'ping',
	aliases: ['pinginfo'],
	description: 'basic ping pong command, see the ping',
	cooldown: 2,
	cd: "My ping is fine, thanks",
	execute(message, args, d) {
	message.channel.send("Pinging...").then(m => {
  	let ping = m.createdTimestamp - message.createdTimestamp;
	const pingsoloEmbed = new d.Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('Pong!')
					.addFields(
					{ name: 'Your ping is:', value: `${ping}`}
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Databases')
					.addField('_', 'Sponsered by nodeclusters');
				m.delete();
				m.channel.send(pingsoloEmbed);
		})
	}
}; 
