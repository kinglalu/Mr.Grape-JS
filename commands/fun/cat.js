module.exports = {
    name: 'cat',
    description: 'get a cat pic',
    cooldown: 3,
    cd: "Cats are cute, but chill",
    async execute(message, args, d) {
        let catapi = "https://api.thecatapi.com"
        let key = process.env.CATAPI;
        let submitURL = catapi + `/v1/images/search?mime_types=jpg,png&limit=1&size=small`;
        let pic = await d.r2.get(submitURL, { key }).json;
        message.channel.send({ files: [pic[0].url] });
    }
};
