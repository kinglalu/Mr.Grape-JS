module.exports = {
    name: 'question',
    description: 'get many questions answered using wolfram alpha',
    aliases: ['ask'],
    cooldown: 3,
    async execute(message, args, d) {
        if (!args[0]) {return message.channel.send('whaddya want me to look up?');}
        let key = process.env.WOLFRAM;
        let wolfapi = `https://api.wolframalpha.com/v1/result?i=${encodeURIComponent(args.join(' '))}&appid=${key}`;
        let answer = await d.r2(wolfapi).text;
        if (answer === 'No short answer available') {
        let simpleWolf = `https://api.wolframalpha.com/v2/query?input=${encodeURIComponent(args.join(' '))}&format=plaintext&output=JSON&appid=${key}&podindex=2`
        let ans = await d.r2(simpleWolf).json;
        if (!ans.queryresult.pods[0].subpods[0].plaintext || ans.queryresult.pods[0].subpods[0].plaintext === '(data not available)') {ans = "Can't find that."}
        return message.channel.send(ans.queryresult.pods[0].subpods[0].plaintext);
        }
        message.channel.send(answer);
    }
};
