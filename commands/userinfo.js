
//Usage: `userinfo`, Returns some basic info about the user
//message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);

const usersoloEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('User Info')
					.addFields(
						{ name: 'Username:', value: `${message.author.username}`},
						{ name: 'User ID:', value: `${message.author.id}`},	
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Databases');

				message.channel.send(usersoloEmbed); 
