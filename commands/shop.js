

const shopEmbed =  Discord.MessageEmbed()
	.setColor('dd2de0')
	.setTitle('The Shop')
	.setDescription('buy some swick items here')
	.setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
	.addFields(
		{ name: 'fan', value: 'Some value here' },
		{ name: 'orangedetector', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.setTimestamp()
	.setFooter('Grape Marketplaces');
  	  
  message.channel.send(shopEmbed);
				
}

