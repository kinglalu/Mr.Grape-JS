module.exports = {
    name: 'apod',
    description: 'get a daily nasapic',
    aliases: ['nasapic'],
    cooldown: 3,
    async execute(message, args, d) {
        let NASAURL = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA}`
        let pic = await d.r2.get(NASAURL).json;
        message.channel.send({ files: [pic.hdurl] });
    }
};
