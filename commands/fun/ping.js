module.exports = {
	name: 'ping',
	aliases: ['pinginfo'],
	description: 'basic ping pong command, see the ping',
	cooldown: 2,
	execute(message, args, d) {
	message.channel.send("Pinging...").then(m =>{
  	var ping = m.createdTimestamp - message.createdTimestamp;
	const pingsoloEmbed = new d.Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('Ping')
					.addFields(
					{ name: 'Your ping is:', value: `${ping}`}
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Databases');

				m.edit(pingsoloEmbed);
	}
}; 
