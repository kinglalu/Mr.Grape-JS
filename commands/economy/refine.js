module.exports = {
    name: "refine",
    cooldown: 20,
    cd: "Let your refinery rest",
    fan: true,
    async execute(message, args, d) {
        let argument = args.join(' ').toLowerCase();
        let inv = await d.items.get(message.author.id)
        if (!inv || !inv.ore) { return message.channel.send('Bruh you don\'t got ores git good'); }
        if (argument === 'all') {
            function getCost() {
                let moni = 0;
                for (const key in inv.ore) {
                    if (key.includes('refined')) { continue; }
                    if (d.ores.tier1.includes(key)) { moni += 3 * inv.ore[key] }
                    if (d.ores.tier2.includes(key)) { moni += 5 * inv.ore[key] }
                    if (d.ores.tier3.includes(key)) { moni += 10 * inv.ore[key] }
                }
                if (moni === 0 && inv["personal refinery"]) { return true; }
                else { return moni; }
            }
            let cost = getCost();
            if (cost === true || cost === 0 && !inv["personal refinery"]) { return message.channel.send('There\'s nothing to refine!') }
            if (cost > await d.users.get(message.author.id)) { return message.channel.send('Bruh you don\'t have the moni'); }
            for (let key in inv.ore) {
                if (key.includes('refined')) { continue; }
                if (!inv.ore["refined " + key]) { inv.ore["refined " + key] = inv.ore[key]; }
                else { inv.ore["refined " + key] += inv.ore[key]; }
                delete inv.ore[key];
            }
            let refinementRecipt;
            if (inv["personal refinery"]) { refinementRecipt = `Successfully refined all of your ores (for free cus you have a personal refiner)` }
            else { refinementRecipt = `Successfully refined all of your ores for ${cost} :star:s!` }
            d.addMoni(message.author.id, -cost);
            await d.items.set(message.author.id, inv);
            const refine = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(message.author.username + '\'s refinement')
                .addField('Refined', refinementRecipt)
                .setTimestamp()
                .setFooter('Grape Refinery');
            return message.channel.send(refine);
        }
        else {
            if (argument.includes('all')) {
                let item = argument.replace('all', '').replace(' ', '');
                if (!d.ores.tier1.includes(item) && !d.ores.tier2.includes(item) && !d.ores.tier3.includes(item)) {
                    const e = new d.Discord.MessageEmbed()
                        .setColor('#dd2de0')
                        .setTitle(message.author.username + '\'s refinement')
                        .addField('Cannot Refine', 'That ore doesn\'t exist bruh')
                        .setTimestamp()
                        .setFooter('Grape Refinery');
                    return message.channel.send(e);
                }
                if (!inv.ore[item]) {
                    const e = new d.Discord.MessageEmbed()
                        .setColor('#dd2de0')
                        .setTitle(message.author.username + '\'s refinement')
                        .addField('Cannot Refine', 'You don\'t have that ore, git good.')
                        .setTimestamp()
                        .setFooter('Grape Refinery');
                    return message.channel.send(e);
                }
                function getCostAll() {
                    let moni = 0;
                    if (inv["personal refinery"]) { return moni; }
                    if (d.ores.tier1.includes(item)) { moni += 3 * inv.ore[item] }
                    if (d.ores.tier2.includes(item)) { moni += 5 * inv.ore[item] }
                    if (d.ores.tier3.includes(item)) { moni += 10 * inv.ore[item] }
                    return moni;
                }
                let cost = getCostAll();
                if (!inv.ore["refined " + item]) { inv.ore["refined " + item] = inv.ore[item]; }
                else { inv.ore["refined " + item] += inv.ore[item]; }
                delete inv.ore[item];
                d.addMoni(message.author.id, -cost);
                await d.items.set(message.author.id, inv);
                let oreRefine;
                if (inv["personal refinery"]) { oreRefine = `You refined your ${item} ore(s) for free, cus you have a personal refiner (flexx)` }
                else { `You refined your ${item} ore(s) for ${cost} :star:s` }
                const r = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(message.author.username + '\'s refinement')
                    .addField('Refined', oreRefine)
                    .setTimestamp()
                    .setFooter('Grape Refinery');
                return message.channel.send(r);
            }
            else {
                let regex = /\d+/g;
                let numberOfItemsRaw = argument.match(regex);
                let numberOfItems = parseInt(numberOfItemsRaw);
                item = d.ores.tier1.concat(d.ores.tier2, d.ores.tier3).filter(v => argument.includes(v)).pop();
                if (!numberOfItemsRaw || isNaN(numberOfItems)) { numberOfItems = 1; }
                if (!d.ores.tier1.includes(item) && !d.ores.tier2.includes(item) && !d.ores.tier3.includes(item)) {
                    const e = new d.Discord.MessageEmbed()
                        .setColor('#dd2de0')
                        .setTitle(message.author.username + '\'s refinement')
                        .addField('Cannot Refine', 'That ore doesn\'t exist bruh')
                        .setTimestamp()
                        .setFooter('Grape Refinery');
                    return message.channel.send(e);
                }
                if (!inv.ore[item]) {
                    const e = new d.Discord.MessageEmbed()
                        .setColor('#dd2de0')
                        .setTitle(message.author.username + '\'s refinement')
                        .addField('Cannot Refine', 'You don\'t have that ore, git good.')
                        .setTimestamp()
                        .setFooter('Grape Refinery');
                    return message.channel.send(e);
                }
                function getCostSingle() {
                    let moni = 0;
                    if (inv["personal refinery"]) { return moni; }
                    if (d.ores.tier1.includes(item)) { moni += 3 * numberOfItems }
                    if (d.ores.tier2.includes(item)) { moni += 5 * numberOfItems }
                    if (d.ores.tier3.includes(item)) { moni += 10 * numberOfItems }
                    return moni;
                }
                let cost = getCostSingle();
                inv.ore[item] -= numberOfItems;
                if (!inv.ore["refined " + item]) { inv.ore["refined " + item] = numberOfItems; }
                else { inv.ore["refined " + item] += numberOfItems; }
                d.addMoni(message.author.id, -cost);
                await d.items.set(message.author.id, inv);
                let oreRefiner;
                if (inv["personal refinery"]) { oreRefiner = `You refined your ${numberOfItems} ${item} ore(s) for free, cus personal refinery (ez)` }
                else { `You refined your ${numberOfItems} ${item} ore(s) for ${cost} :star:s` }
                const r = new d.Discord.MessageEmbed()
                    .setColor('#dd2de0')
                    .setTitle(message.author.username + '\'s refinement')
                    .addField('Refined', oreRefiner)
                    .setTimestamp()
                    .setFooter('Grape Refinery');
                return message.channel.send(r);
            }
        }
    }
};
