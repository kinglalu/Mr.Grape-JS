module.exports = {
    name: "blackjack",
    aliases: ['bj', '21'],
    description: 'The classic card game in which you lose all your money.',
    cooldown: 5,
    cd: "It's not an addiction I swear.",
    fan: true,
    async execute(message, args, d) {
        let betAmount = 0;
        let userBal = await d.users.get(message.author.id);
        let a = message.guild.member(message.author).displayName;

        if (args[0] === 'all' || args[0] === 'max') {
            betAmount = userBal;
        } else {
            betAmount = parseInt(args[0]);
        }

        if (!betAmount || betAmount < 1 || betAmount > userBal) {
            message.channel.send("you are an idiot. Give a valid number.")
            return
        }

        if (!userBal) {
            message.channel.send("you are an idiot. You have $0")
            return
        }

        // ** BEGIN Javascript blackjack game from echohatch1. Modified for Grape.

        d.addMoni(message.author.id, -betAmount)

        var numCardsPulled = 0;
        var gameOver = false;

        var player = {
            cards: [],
            score: 0
        };
        var dealer = {
            cards: [],
            score: 0
        };

        function getCardsValue(a) {
            var cardArray = [],
                sum = 0,
                i = 0,
                dk = 10.5,
                doubleking = "QQ",
                aceCount = 0;
            cardArray = a;
            for (i; i < cardArray.length; i += 1) {
                if (cardArray[i].rank === "J" || cardArray[i].rank === "Q" || cardArray[i].rank === "K") {
                    sum += 10;
                } else if (cardArray[i].rank === "A") {
                    sum += 11;
                    aceCount += 1;
                } else if (cardArray[i].rank === doubleking) {
                    sum += dk
                } else {
                    sum += cardArray[i].rank;
                }
            }
            while (aceCount > 0 && sum > 21) {
                sum -= 10;
                aceCount -= 1;
            }
            return sum;
        }

        var deck = {
            deckArray: [],
            initialize: function() {
                var suitArray, rankArray, s, r, n;
                suitArray = ["clubs", "diamonds", "hearts", "spades"];
                rankArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
                n = 13;
                for (s = 0; s < suitArray.length; s += 1) {
                    for (r = 0; r < rankArray.length; r += 1) {
                        this.deckArray[s * n + r] = {
                            rank: rankArray[r],
                            suit: suitArray[s]
                        };
                    }
                }
            },
            shuffle: function() {
                var temp, i, rnd;
                for (i = 0; i < this.deckArray.length; i += 1) {
                    rnd = Math.floor(Math.random() * this.deckArray.length);
                    temp = this.deckArray[i];
                    this.deckArray[i] = this.deckArray[rnd];
                    this.deckArray[rnd] = temp;
                }
            }
        };

        deck.initialize();
        deck.shuffle();

        async function bet(outcome) {
            if (outcome === "win") {
                d.addMoni(message.author.id, (betAmount*2))
            }
        }

        function resetGame() {
            numCardsPulled = 0;
            player.cards = [];
            dealer.cards = [];
            player.score = 0;
            dealer.score = 0;
            deck.initialize();
        }

        function endMsg(title, msg, dealerC) {
            let cardsMsg = "";
            player.cards.forEach(function(card) {
                cardsMsg += "[`" + card.rank.toString();
                if (card.suit == "hearts") cardsMsg += "♥"
                if (card.suit == "diamonds") cardsMsg += "♦"
                if (card.suit == "spades") cardsMsg += "♠"
                if (card.suit == "clubs") cardsMsg += "♣"
                cardsMsg += "`](https://example.com) "
            });
            cardsMsg += " --> " + player.score.toString()

            let dealerMsg = "";
            if (!dealerC) {
                dealerMsg = "[`" + dealer.cards[0].rank.toString();
                if (dealer.cards[0].suit == "hearts") dealerMsg += "♥"
                if (dealer.cards[0].suit == "diamonds") dealerMsg += "♦"
                if (dealer.cards[0].suit == "spades") dealerMsg += "♠"
                if (dealer.cards[0].suit == "clubs") dealerMsg += "♣"
                dealerMsg += " ? ?`](https://top.gg/bot/743833062265323651#/)"
            } else {
                dealerMsg = "";
                dealer.cards.forEach(function(card) {
                    dealerMsg += "[`" + card.rank.toString();
                    if (card.suit == "hearts") dealerMsg += "♥"
                    if (card.suit == "diamonds") dealerMsg += "♦"
                    if (card.suit == "spades") dealerMsg += "♠"
                    if (card.suit == "clubs") dealerMsg += "♣"
                    dealerMsg += "`](https://top.gg/bot/743833062265323651#/) "
                });
                dealerMsg += " --> " + dealer.score.toString()
            }

            const gambleEmbed = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(message.author.username + `'s gambling table` + '\n⠀')
                .addField('Your Cards', cardsMsg)
                .addField('Dealer\'s Cards', dealerMsg)
                .addField(title, msg)
                .setFooter('Grape Gambling Club')
                .addField('⠀', 'Sponsored by [NodeClusters](https://nodeclusters.com/billing/link.php?id=8)');

            message.channel.send(gambleEmbed);
        }

        async function endGame() {
            if (player.score === 21) {
                bet('win');
                gameOver = true;
                await endMsg("YOU WIN!!", "You got 21! You win!", true)
            }
            if (player.score > 21) {
                bet('lose');
                gameOver = true;
                await endMsg("YOU LOSE", "You got over 21 :( bust", true)
            }
            if (dealer.score === 21) {
                bet('lose');
                gameOver = true;
                await endMsg("YOU LOSE", "dealer got 21 lmaoo", true)
            }
            if (dealer.score > 21) {
                bet('win');
                gameOver = true;
                await endMsg("YOU WIN!!!", "Dealer busted. You win", true)
            }
            if (dealer.score >= 17 && player.score > dealer.score && player.score < 21) {
                bet('win');
                gameOver = true;
                await endMsg("YOU WIN!!!", "you have defeated el dealer", true)
            }
            if (dealer.score >= 17 && player.score < dealer.score && dealer.score < 21) {
                bet('lose');
                gameOver = true;
                await endMsg("YOU LOSE", "dealer winz nerd", true)
            }
            if (dealer.score >= 17 && player.score === dealer.score && dealer.score < 21) {
                gameOver = true;
                await endMsg("YOU.. draw?", "DRAW :troll:", true)
            }
        }

        function dealerDraw() {

            dealer.cards.push(deck.deckArray[numCardsPulled]);
            dealer.score = getCardsValue(dealer.cards);
            numCardsPulled += 1;
        }

        function newGame() {
            hit();
            hit();
            dealerDraw();
            endGame();
        }

        function hit() {
            player.cards.push(deck.deckArray[numCardsPulled]);
            player.score = getCardsValue(player.cards);

            numCardsPulled += 1;
            if (numCardsPulled > 2) {
                endGame();
            }
        }

        function stand() {
            while (dealer.score < 17) {
                dealerDraw();
            }
            endGame();
        }
        // END Javascript blackjack game from echohatch1. Modified for Grape. **

        newGame();
        async function loop() {
            if (gameOver) return;

            endMsg("Info", 'Hit [h]? Stand [s]? Goodbye money [anything else]?', false)

            let filter = m => m.author.id === message.author.id;
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 25000,
                errors: ['time']
            }).then(message => {
                message = message.first()
                if (message.content === "h") {
                    hit();
                    loop();
                    return
                } else if (message.content === "s") {
                    stand();
                    loop();
                    return
                } else {
                    message.channel.send("you bafoon. I am taking all of your money");
                    bet("lose");
                    return
                }
            }).catch(_ => {
                message.channel.send("you bafoon. I took all your money when you went to the bathroom.");
                bet("lose");
                return
            })
        }

        await loop()
    }
};
