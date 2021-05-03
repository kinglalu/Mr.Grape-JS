const { EconomyCommand, Embed } = require("../../../lib");
const situations = [
    ["orange", "will you help me find my orange?\nit fell in a bush full of bananas over there, but i could not find it.\nPlease go there and find my orange.", "That's not my orange, that's a banana! Try again later."],
    ["mango", "I am trying to catch a flying mango, but it keeps disappearing.\nSo will you catch it and bring it to me?", "You didn't catch my mango? Too bad, try again next time."],
    ["carrot", "my pet rabbit has escaped!\nhe really like carrots\ncan you help lure him home?", "Sorry, I was asking for a carrot, not a lime."]
];

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "work",
                type: "economy",
                description: "Do work to get :star:s.",
                usage: "No arguments required.",
                aliases: ["job"],
                saying: "Being a workaholic isn't healthy.",
                cooldown: 30,
                fan: true
            });
        }

        async main(msg) {
            const [jobName, background, failMsg] = situations[super.randomize(situations.length)];

            const chanceArr = [0, 0, 1];

            const item = await this.eco.items.getItem(msg.author.id, `${jobName}detector`);
            
            if (item) for (let i = 0; i < item; i++) chanceArr.push(1);

            const jobEmbed = new Embed()
                .setTitle(`${msg.author.username}'s job`)
                .addField(`Help Mr.Grape find his ${jobName}!`, background);

            if (chanceArr[super.randomize(chanceArr.length)]) {
                const starmagnet = await this.eco.items.getItem(msg.author.id, "starmagnet");
                let earn = super.randomize(7) + 1;

                if (starmagnet) earn = Math.round(earn * (1 + 0.06 * starmagnet));

                jobEmbed.addField(`Yay, you found my ${jobName}! Here, take ${earn} :star:s.`.toString(), "‎");

                this.eco.users.add(msg.author.id, earn);
            }
            else {
                jobEmbed.addField(failMsg, "‎");
            }

            msg.send(jobEmbed);
        }
    };
