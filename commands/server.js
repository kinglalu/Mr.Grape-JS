//Usage: `server`, Returns some basic info about the server
message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);

const serversoloEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('Server Info')
					.addFields(
						{ name: 'Server name:', value: `${message.guild.name}`},
						{ name: 'Members:', value: `${message.guild.memberCount}`},	
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Databases');

				message.channel.send(serversoloEmbed);
