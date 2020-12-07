module.exports = {
    name: 'dig',
    description: 'dig to earn stars',
    aliases: ['mine'],
    cooldown: 30,
    cd: "Mines are gonna go bare if you don't chill",
    fan: true,
    async execute(message, args, d) {
        let inv = await d.items.get(message.author.id);
        let earn;
        if (!inv || !inv.shovel || inv.shovel === 0) {
            earn = Math.round(Math.random() * 6) + 1;
        } else {
            earn = Math.round(Math.random() * 15) + 5;
        }
        const mine = new d.Discord.MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(message.author.username + `'s mine`)
            .addField('You dug up ' + earn + ' :star:s!', '_')
            .setThumbnail('https://i.imgur.com/JXfpgdXh.jpg')
            .setTimestamp()
            .setFooter('Grape Mining Guild');

        if (inv) {
            if (!inv.ore) { inv.ore = {}; }

            function pick(ore, amount) {
                if (!inv.ore[ore]) { inv.ore[ore] = amount; }
                else { inv.ore[ore] += amount }
                mine.addField(`You got ${amount} ${ore}(s)! ${d.emoji[ore]}`, '_')
            }

            function randNum(e) { return Math.floor(Math.random() * e) + 1; }

            function randArray(array) { return array[Math.floor(Math.random() * array.length)]; }

            if (inv["rainbonite pick"]) {
                pick(randArray(d.ores.tier1), randNum(7))
                if (randNum(2) === 1) { pick(randArray(d.ores.tier2), randNum(6)); }
                if (randNum(4) === 1) { pick(randArray(d.ores.tier3), randNum(4)); }
                if (randNum(150) === 1) { mine.addField('Uh oh!', 'Your rainbonite pickaxe broke, buy a new one from the shop!'); inv["rainbonite pick"] -= 1; }
                await d.items.set(message.author.id, inv);
            }
            else if (inv.tierthreepick) {
                if (randNum(2) === 1) { pick(randArray(d.ores.tier1), randNum(7)); }
                if (randNum(3) === 1) { pick(randArray(d.ores.tier2), randNum(5)); }
                if (randNum(7) === 1) { pick(randArray(d.ores.tier3), randNum(2)); }
                if (randNum(100) === 1) { mine.addField('Uh oh!', 'Your pickaxe broke, buy a new one from the shop!'); inv.tierthreepick -= 1; }
                await d.items.set(message.author.id, inv);
            }
            else if (inv.tiertwopick) {
                if (randNum(3) === 1) { pick(randArray(d.ores.tier1), randNum(5)); }
                if (randNum(5) === 1) { pick(randArray(d.ores.tier2), randNum(3)); }
                if (randNum(35) === 1) { pick(randArray(d.ores.tier3), 1); }
                if (randNum(50) === 1) { mine.addField('Uh oh!', 'Your pickaxe broke, buy a new one from the shop!'); inv.tiertwopick -= 1; }
                await d.items.set(message.author.id, inv);
            }
            else if (inv.tieronepick) {
                if (randNum(4) === 1) { pick(randArray(d.ores.tier1), randNum(3)); }
                if (randNum(25) === 1) { pick(randArray(d.ores.tier2), 1); }
                if (randNum(25) === 1) { mine.addField('Uh oh!', 'Your pickaxe broke, buy a new one from the shop!'); inv.tieronepick -= 1; }
                await d.items.set(message.author.id, inv);
            }
            if (inv && inv.shovel && inv.shovel > 0 && randNum(45) === 1) {
                mine.addFields('Uh oh!', 'Your shovel broke! If you want a new one, buy it from the shop!');
                inv.shovel += -1;
                await d.items.set(message.author.id, inv);
            }
        }
        message.channel.send(mine);
        d.addMoni(message.author.id, earn);

    }
};
