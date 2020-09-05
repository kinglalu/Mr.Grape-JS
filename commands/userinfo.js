
//Usage: `server`, Returns some basic info about the server
//message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);

const usersoloEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('User Info')
					.addFields(
						{ name: 'Username:', value: `${message.author.username}`},
						{ name: 'Members:', value: `${message.author.id}`},	
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Databases');

				message.channel.send(usersoloEmbed); 
