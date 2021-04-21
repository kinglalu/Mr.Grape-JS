const { EconomyCommand, Embed } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "blackjack",
                type: "economy",
                description: "The classic card game in which you lose all your money.",
                usage: "<number of :star:s>",
                aliases: ["bj"],
                saying: "\"It's not an addiction I swear.\"",
                cooldown: 2
            });
        }

        async main(msg) {
            const balance = this.eco.users.getBalance(msg.author.id);
            const betAmount = msg.params[0] === "all" || msg.params[0] === "max" ? balance : +msg.params[0];

            if (!balance) return msg.send("You are an idiot. You have 0 :star:s.");
            if (!betAmount || betAmount < 0 || betAmount > balance) return msg.send("You are an idiot. Give a valid number.");
            // ** BEGIN Javascript blackjack game from echohatch1. Modified for Grape.

            this.eco.users.add(msg.author.id, -betAmount);

            let numCardsPulled = 0;
            let gameOver = false;

            const player = {
                cards: [],
                score: 0
            };
            const dealer = {
                cards: [],
                score: 0
            };

            function getCardsValue(a) {
                let cardArray = [],
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
                        sum += dk;
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

            const deck = {
                deckArray: [],
                initialize: function () {
                    let suitArray, rankArray, s, r, n;
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
                shuffle: function () {
                    let temp, i, rnd;
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

            const bet = async (outcome) => {
                if (outcome === "win") {
                    this.eco.users.add(msg.author.id, betAmount * 2);
                }
            };

            const endMsg = (title, message, dealerC) => {
                let cardsMsg = "";
                player.cards.forEach(function (card) {
                    cardsMsg += "[`" + card.rank.toString();
                    if (card.suit == "hearts") cardsMsg += "♥";
                    if (card.suit == "diamonds") cardsMsg += "♦";
                    if (card.suit == "spades") cardsMsg += "♠";
                    if (card.suit == "clubs") cardsMsg += "♣";
                    cardsMsg += "`](https://example.com) ";
                });
                cardsMsg += " --> " + player.score.toString();

                let dealerMsg = "";
                if (!dealerC) {
                    dealerMsg = "[`" + dealer.cards[0].rank.toString();
                    if (dealer.cards[0].suit == "hearts") dealerMsg += "♥";
                    if (dealer.cards[0].suit == "diamonds") dealerMsg += "♦";
                    if (dealer.cards[0].suit == "spades") dealerMsg += "♠";
                    if (dealer.cards[0].suit == "clubs") dealerMsg += "♣";
                    dealerMsg += " ? ?`](https://top.gg/bot/743833062265323651#/)";
                } else {
                    dealerMsg = "";
                    dealer.cards.forEach(function (card) {
                        dealerMsg += "[`" + card.rank.toString();
                        if (card.suit == "hearts") dealerMsg += "♥";
                        if (card.suit == "diamonds") dealerMsg += "♦";
                        if (card.suit == "spades") dealerMsg += "♠";
                        if (card.suit == "clubs") dealerMsg += "♣";
                        dealerMsg += "`](https://top.gg/bot/743833062265323651#/) ";
                    });
                    dealerMsg += " --> " + dealer.score.toString();
                }

                const gambleEmbed = new Embed()
                    .setTitle(`${msg.author.username}'s gambling table`)
                    .addField("Your Cards", cardsMsg)
                    .addField("Dealer's Cards", dealerMsg)
                    .addField(title, message);
                msg.send(gambleEmbed);
            };

            async function endGame() {
                if (player.score === 21) {
                    bet("win");
                    gameOver = true;
                    await endMsg("YOU WIN!!", "You got 21! You win!", true);
                }
                if (player.score > 21) {
                    bet("lose");
                    gameOver = true;
                    await endMsg("YOU LOSE", "You got over 21 :( bust", true);
                }
                if (dealer.score === 21) {
                    bet("lose");
                    gameOver = true;
                    await endMsg("YOU LOSE", "dealer got 21 lmaoo", true);
                }
                if (dealer.score > 21) {
                    bet("win");
                    gameOver = true;
                    await endMsg("YOU WIN!!!", "Dealer busted. You win", true);
                }
                if (dealer.score >= 17 && player.score > dealer.score && player.score < 21) {
                    bet("win");
                    gameOver = true;
                    await endMsg("YOU WIN!!!", "you have defeated el dealer", true);
                }
                if (dealer.score >= 17 && player.score < dealer.score && dealer.score < 21) {
                    bet("lose");
                    gameOver = true;
                    await endMsg("YOU LOSE", "dealer winz nerd", true);
                }
                if (dealer.score >= 17 && player.score === dealer.score && dealer.score < 21) {
                    gameOver = true;
                    await endMsg("YOU.. draw?", "DRAW", true);
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

                endMsg("Info", "Hit [h]? Stand [s]? Goodbye money [anything else]?", false);

                const collector = await msg.channel.awaitMessages(m => m.author.id === msg.author.id, { max: 1, time: 25000, });

                const message = collector.first()?.content.toLowerCase();

                if (message === "h") {
                    hit();
                    loop();
                    return;
                } else if (message === "s") {
                    stand();
                    loop();
                    return;
                } else {
                    msg.send("you bafoon. I am taking all of your money");
                    bet("lose");
                    return;
                }
            }

            await loop();
        }
    };
