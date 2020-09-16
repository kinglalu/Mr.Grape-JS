//Usage: `shop`, purchase cool items to gain more stars

const usersoloEmbed = new Discord.MessageEmbed()
					.setColor('#dd2de0')
					.setTitle('The Shop')
					.addFields(
						{ name: 'fan:', value:'test'},
						{ name: 'Orangedetector', value: 'test'},	
					)
			                .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
					.setTimestamp()
					.setFooter('Grape Marketplaces');

				message.channel.send(usersoloEmbed); 
