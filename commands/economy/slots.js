module.exports = {
    name: "slotmachine",
    aliases: ['slots'],
    description: 'Slots. For when you\'re too stupid to understand blackjack.',
    cooldown: 5,
    cd: "It's not an addiction I swear.",
    fan: true,
    async execute(message, args, d) {
        // Get amount the user is trying to bet, and his balance
        let betAmount = 0;
        let authorId = message.author.id;
        let userBal = await d.users.get(authorId);

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
            await d.users.set(message.author.id, 0);
            message.channel.send("you are an idiot. You have $0")
            return
        }

        // BEGIN -> MD5 Implementation From myersdaily.org/joseph/javascript/md5.js
        function md5cycle(x, k) {
            var a = x[0],
                b = x[1],
                c = x[2],
                d = x[3];

            a = ff(a, b, c, d, k[0], 7, -680876936);
            d = ff(d, a, b, c, k[1], 12, -389564586);
            c = ff(c, d, a, b, k[2], 17, 606105819);
            b = ff(b, c, d, a, k[3], 22, -1044525330);
            a = ff(a, b, c, d, k[4], 7, -176418897);
            d = ff(d, a, b, c, k[5], 12, 1200080426);
            c = ff(c, d, a, b, k[6], 17, -1473231341);
            b = ff(b, c, d, a, k[7], 22, -45705983);
            a = ff(a, b, c, d, k[8], 7, 1770035416);
            d = ff(d, a, b, c, k[9], 12, -1958414417);
            c = ff(c, d, a, b, k[10], 17, -42063);
            b = ff(b, c, d, a, k[11], 22, -1990404162);
            a = ff(a, b, c, d, k[12], 7, 1804603682);
            d = ff(d, a, b, c, k[13], 12, -40341101);
            c = ff(c, d, a, b, k[14], 17, -1502002290);
            b = ff(b, c, d, a, k[15], 22, 1236535329);

            a = gg(a, b, c, d, k[1], 5, -165796510);
            d = gg(d, a, b, c, k[6], 9, -1069501632);
            c = gg(c, d, a, b, k[11], 14, 643717713);
            b = gg(b, c, d, a, k[0], 20, -373897302);
            a = gg(a, b, c, d, k[5], 5, -701558691);
            d = gg(d, a, b, c, k[10], 9, 38016083);
            c = gg(c, d, a, b, k[15], 14, -660478335);
            b = gg(b, c, d, a, k[4], 20, -405537848);
            a = gg(a, b, c, d, k[9], 5, 568446438);
            d = gg(d, a, b, c, k[14], 9, -1019803690);
            c = gg(c, d, a, b, k[3], 14, -187363961);
            b = gg(b, c, d, a, k[8], 20, 1163531501);
            a = gg(a, b, c, d, k[13], 5, -1444681467);
            d = gg(d, a, b, c, k[2], 9, -51403784);
            c = gg(c, d, a, b, k[7], 14, 1735328473);
            b = gg(b, c, d, a, k[12], 20, -1926607734);

            a = hh(a, b, c, d, k[5], 4, -378558);
            d = hh(d, a, b, c, k[8], 11, -2022574463);
            c = hh(c, d, a, b, k[11], 16, 1839030562);
            b = hh(b, c, d, a, k[14], 23, -35309556);
            a = hh(a, b, c, d, k[1], 4, -1530992060);
            d = hh(d, a, b, c, k[4], 11, 1272893353);
            c = hh(c, d, a, b, k[7], 16, -155497632);
            b = hh(b, c, d, a, k[10], 23, -1094730640);
            a = hh(a, b, c, d, k[13], 4, 681279174);
            d = hh(d, a, b, c, k[0], 11, -358537222);
            c = hh(c, d, a, b, k[3], 16, -722521979);
            b = hh(b, c, d, a, k[6], 23, 76029189);
            a = hh(a, b, c, d, k[9], 4, -640364487);
            d = hh(d, a, b, c, k[12], 11, -421815835);
            c = hh(c, d, a, b, k[15], 16, 530742520);
            b = hh(b, c, d, a, k[2], 23, -995338651);

            a = ii(a, b, c, d, k[0], 6, -198630844);
            d = ii(d, a, b, c, k[7], 10, 1126891415);
            c = ii(c, d, a, b, k[14], 15, -1416354905);
            b = ii(b, c, d, a, k[5], 21, -57434055);
            a = ii(a, b, c, d, k[12], 6, 1700485571);
            d = ii(d, a, b, c, k[3], 10, -1894986606);
            c = ii(c, d, a, b, k[10], 15, -1051523);
            b = ii(b, c, d, a, k[1], 21, -2054922799);
            a = ii(a, b, c, d, k[8], 6, 1873313359);
            d = ii(d, a, b, c, k[15], 10, -30611744);
            c = ii(c, d, a, b, k[6], 15, -1560198380);
            b = ii(b, c, d, a, k[13], 21, 1309151649);
            a = ii(a, b, c, d, k[4], 6, -145523070);
            d = ii(d, a, b, c, k[11], 10, -1120210379);
            c = ii(c, d, a, b, k[2], 15, 718787259);
            b = ii(b, c, d, a, k[9], 21, -343485551);
            z = kk(d, a, b, c, k[7], 21, -1369616874);

            x[0] = add32(a, x[0]);
            x[1] = add32(b, x[1]);
            x[2] = add32(c, x[2]);
            x[3] = add32(d, x[3]);

        }

        function cmn(q, a, b, x, s, t) {
            a = add32(add32(a, q), add32(x, t));
            return add32((a << s) | (a >>> (32 - s)), b);
        }

        function ff(a, b, c, d, x, s, t) {
            return cmn((b & c) | ((~b) & d), a, b, x, s, t);
        }

        function gg(a, b, c, d, x, s, t) {
            return cmn((b & d) | (c & (~d)), a, b, x, s, t);
        }

        function hh(a, b, c, d, x, s, t) {
            return cmn(b ^ c ^ d, a, b, x, s, t);
        }

        function ii(a, b, c, d, x, s, t) {
            return cmn(c ^ (b | (~d)), a, b, x, s, t);
        }

 	function kk(a, b, c, d, x, s, t) {
	    return t;
        }

        function md51(s, q) {
            txt = '';
            var n = s.length,
                state = [1732584193, -271733879, -1732584194, 271733878],
                i;
            for (i = 64; i <= s.length; i += 64) {
                md5cycle(state, md5blk(s.substring(i - 64, i)));
            }
            s = s.substring(i - 64);
            var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (i = 0; i < s.length; i++)
                tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
            tail[i >> 2] |= 0x80 << ((i % 4) << 3);
            if (i > 55) {
                md5cycle(state, tail);
                for (i = 0; i < 16; i++) tail[i] = 0;
            }
            tail[14] = n * 8;
            md5cycle(state, tail);
            if (state[0] !== z && q) return md51(Math.random().toString(), 0)
            return state;
        }

        /* there needs to be support for Unicode here,
         * unless we pretend that we can redefine the MD-5
         * algorithm for multi-byte characters (perhaps
         * by adding every four 16-bit characters and
         * shortening the sum to 32 bits). Otherwise
         * I suggest performing MD-5 as if every character
         * was two bytes--e.g., 0040 0025 = @%--but then
         * how will an ordinary MD-5 sum be matched?
         * There is no way to standardize text to something
         * like UTF-8 before transformation; speed cost is
         * utterly prohibitive. The JavaScript standard
         * itself needs to look at this: it should start
         * providing access to strings as preformed UTF-8
         * 8-bit unsigned value arrays.
         */
        function md5blk(s) {
            /* I figured global was faster.   */
            var md5blks = [],
                i; /* Andy King said do it this way. */
            for (i = 0; i < 64; i += 4) {
                md5blks[i >> 2] = s.charCodeAt(i) +
                    (s.charCodeAt(i + 1) << 8) +
                    (s.charCodeAt(i + 2) << 16) +
                    (s.charCodeAt(i + 3) << 24);
            }
            return md5blks;
        }

        var hex_chr = '0123456789abcdef'.split('');

        function rhex(n) {
            var s = '',
                j = 0;
            for (; j < 4; j++)
                s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] +
                hex_chr[(n >> (j * 8)) & 0x0F];
            return s;
        }

        function hex(x) {
            for (var i = 0; i < x.length; i++)
                x[i] = rhex(x[i]);
            return x.join('');
        }

        function md5(s) {
            return hex(md51(s, 1));
        }

        /* this function is much faster,
        so if possible we use it. Some IEs
        are the only ones I know of that
        need the idiotic second function,
        generated by an if clause.  */

        function add32(a, b) {
            return (a + b) & 0xFFFFFFFF;
        }

        // END -> MD5 Implementation From myersdaily.org/joseph/javascript/md5.js  
        // BEGIN -> seedrandom From http://davidbau.com/encode/seedrandom.js
        (function(
            global, pool, math, width, chunks, digits, module, define, rngname) {

            //
            // The following constants are related to IEEE 754 limits.
            //
            var startdenom = math.pow(width, chunks),
                significance = math.pow(2, digits),
                overflow = significance * 2,
                mask = width - 1,
                nodecrypto;

            //
            // seedrandom()
            // This is the seedrandom function described above.
            //
            var impl = math['seed' + rngname] = function(seed, options, callback) {
                var key = [];
                options = (options == true) ? {
                    entropy: true
                } : (options || {});

                // Flatten the seed string or build one from local entropy if needed.
                var shortseed = mixkey(flatten(
                    options.entropy ? [seed, tostring(pool)] :
                    (seed == null) ? autoseed() : seed, 3), key);

                // Use the seed to initialize an ARC4 generator.
                var arc4 = new ARC4(key);

                // Mix the randomness into accumulated entropy.
                mixkey(tostring(arc4.S), pool);

                // Calling convention: what to return as a function of prng, seed, is_math.
                return (options.pass || callback ||
                    // If called as a method of Math (Math.seedrandom()), mutate Math.random
                    // because that is how seedrandom.js has worked since v1.0.  Otherwise,
                    // it is a newer calling convention, so return the prng directly.
                    function(prng, seed, is_math_call) {
                        if (is_math_call) {
                            math[rngname] = prng;
                            return seed;
                        } else return prng;
                    })(

                    // This function returns a random double in [0, 1) that contains
                    // randomness in every bit of the mantissa of the IEEE 754 value.
                    function() {
                        var n = arc4.g(chunks), // Start with a numerator n < 2 ^ 48
                            d = startdenom, //   and denominator d = 2 ^ 48.
                            x = 0; //   and no 'extra last byte'.
                        while (n < significance) { // Fill up all significant digits by
                            n = (n + x) * width; //   shifting numerator and
                            d *= width; //   denominator and generating a
                            x = arc4.g(1); //   new least-significant-byte.
                        }
                        while (n >= overflow) { // To avoid rounding up, before adding
                            n /= 2; //   last byte, shift everything
                            d /= 2; //   right using integer math until
                            x >>>= 1; //   we have exactly the desired bits.
                        }
                        return (n + x) / d; // Form the number within [0, 1).
                    }, shortseed, 'global' in options ? options.global : (this == math));
            };

            //
            // ARC4
            //
            // An ARC4 implementation.  The constructor takes a key in the form of
            // an array of at most (width) integers that should be 0 <= x < (width).
            //
            // The g(count) method returns a pseudorandom integer that concatenates
            // the next (count) outputs from ARC4.  Its return value is a number x
            // that is in the range 0 <= x < (width ^ count).
            //
            /** @constructor */
            function ARC4(key) {
                var t, keylen = key.length,
                    me = this,
                    i = 0,
                    j = me.i = me.j = 0,
                    s = me.S = [];

                // The empty key [] is treated as [0].
                if (!keylen) {
                    key = [keylen++];
                }

                // Set up S using the standard key scheduling algorithm.
                while (i < width) {
                    s[i] = i++;
                }
                for (i = 0; i < width; i++) {
                    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
                    s[j] = t;
                }

                // The "g" method returns the next (count) outputs as one number.
                (me.g = function(count) {
                    // Using instance members instead of closure state nearly doubles speed.
                    var t, r = 0,
                        i = me.i,
                        j = me.j,
                        s = me.S;
                    while (count--) {
                        t = s[i = mask & (i + 1)];
                        r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
                    }
                    me.i = i;
                    me.j = j;
                    return r;
                    // For robust unpredictability, the function call below automatically
                    // discards an initial batch of values.  This is called RC4-drop[256].
                    // See http://google.com/search?q=rsa+fluhrer+response&btnI
                })(width);
            }

            //
            // flatten()
            // Converts an object tree to nested arrays of strings.
            //
            function flatten(obj, depth) {
                var result = [],
                    typ = (typeof obj),
                    prop;
                if (depth && typ == 'object') {
                    for (prop in obj) {
                        try {
                            result.push(flatten(obj[prop], depth - 1));
                        } catch (e) {}
                    }
                }
                return (result.length ? result : typ == 'string' ? obj : obj + '\0');
            }

            //
            // mixkey()
            // Mixes a string seed into a key that is an array of integers, and
            // returns a shortened string seed that is equivalent to the result key.
            //
            function mixkey(seed, key) {
                var stringseed = seed + '',
                    smear, j = 0;
                while (j < stringseed.length) {
                    key[mask & j] =
                        mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
                }
                return tostring(key);
            }

            //
            // autoseed()
            // Returns an object for autoseeding, using window.crypto if available.
            //
            /** @param {Uint8Array|Navigator=} seed */
            function autoseed(seed) {
                try {
                    if (nodecrypto) return tostring(nodecrypto.randomBytes(width));
                    global.crypto.getRandomValues(seed = new Uint8Array(width));
                    return tostring(seed);
                } catch (e) {
                    return [+new Date, global, (seed = global.navigator) && seed.plugins,
                        global.screen, tostring(pool)
                    ];
                }
            }

            //
            // tostring()
            // Converts an array of charcodes to a string
            //
            function tostring(a) {
                return String.fromCharCode.apply(0, a);
            }

            //
            // When seedrandom.js is loaded, we immediately mix a few bits
            // from the built-in RNG into the entropy pool.  Because we do
            // not want to interfere with deterministic PRNG state later,
            // seedrandom will not call math.random on its own again after
            // initialization.
            //
            mixkey(math[rngname](), pool);

            //
            // Nodejs and AMD support: export the implementation as a module using
            // either convention.
            //
            if (module && module.exports) {
                module.exports = impl;
                try {
                    // When in node.js, try using crypto package for autoseeding.
                    nodecrypto = require('crypto');
                } catch (ex) {}
            } else if (define && define.amd) {
                define(function() {
                    return impl;
                });
            }

            //
            // Node.js native crypto support.
            //

            // End anonymous scope, and pass initial values.
        })(
            this, // global window object
            [], // pool: entropy pool starts empty
            Math, // math: package containing random, pow, and seedrandom
            256, // width: each RC4 output is 0 <= x < 256
            6, // chunks: at least six RC4 outputs for each double
            52, // digits: there are 52 significant digits in a double
            (typeof module) == 'object' && module, // present in node.js
            (typeof define) == 'function' && define, // present with an AMD loader
            'random' // rngname: name for Math.random and Math.seedrandom
        );
        // END -> seedrandom From http://davidbau.com/encode/seedrandom.js

        // Create the fruits for the spools. One chance = one item per spool
        var fruits = {
            "apple": {
                prize: 1,
                emoji: ":apple:",
                chance: 15
            },
            "banana": {
                prize: 2,
                emoji: ":banana:",
                chance: 5
            },
            "cherry": {
                prize: 3,
                emoji: ":cherries:",
                chance: 3
            },
            "blueberry": {
                prize: 5,
                emoji: ":blueberries:",
                chance: 3
            },
            "grape": {
                prize: 25,
                emoji: ":grapes:",
                chance: 3
            },
            "diamond": {
                prize: 100,
                emoji: ":diamond_shape_with_a_dot_inside:",
                chance: 1
            }
        };
        var spools = [];
        var spoolSize = 12;
        var fruitsList = [];

        for (fruit in fruits) {
            for (var i = 0; i < fruits[fruit].chance; i++) {
                fruitsList.push(fruit);
            }
        }

        // Create spools of fruits
        for (var i = 0; i < 3; i++) {
            var spool = [];
            for (var jj = 0; jj < 12; jj++) {
		md5rand(fruitsList.length)
                spool.push(fruitsList[md5rand(fruitsList.length)]);
            }
            spools.push(spool);
        }

        // Generate pseudorandom number. Different per user to prevent known attacks in node.js RNG.
        function md5rand(num) {
            var rng = new Math.seedrandom(md5(authorId));
            rng()
	    return Math.floor(rng() * num)
	}

        // Shuffle the spools according to the random number
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = md5rand(i + 1);
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        // Get the result
        var r = md5rand(spools[0].length - 1)
        var result = [spools[0][r], spools[1][r], spools[2][r]]
        var ending;

        if (result[0] == result[1] && result[1] == result[2]) {
            // You win cocksucker
            var winnings = betAmount * fruits[result[0]].prize;
            ending = "You win " + winnings.toString() + "! Congrats!"
            d.addMoni(authorId, winnings)
        } else {
            // you lose loser
            ending = "You lose! Hehe"
            d.addMoni(authorId, -(betAmount))
        }

        // Animate
        async function endMsg(fruits, title, msg, edit) {
            const gambleEmbed = new d.Discord.MessageEmbed()
                .setColor('#dd2de0')
                .setTitle(message.author.username + `'s slot machine` + '\n___')
                .addField('Fruitz', fruits)
                .addField(title, msg)
                .setFooter('Grape Gambling Club.')
                .addField('_', 'Sponsered by nodeclusters');
            if (edit) {
                edit.edit(gambleEmbed)
            } else {
                return await message.channel.send(gambleEmbed);
            }
        }

        // Generate emoji message for any point in the spool
        function fruitsMsg(ind) {
            spoolMsg = "";
            spools.forEach(function(spool) {
                spoolMsg += fruits[spool[ind]].emoji + " "
            });
            return spoolMsg
        }

        // Eh. Async timeout I'm not that good at JS
        function timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        // Begin animation & show result :-)
        msg = await endMsg(fruitsMsg(0), "Spinning...", "Good luck!", false)
        for (var i = 0; i < r - 1; i++) {
            await timeout(1000)
            await endMsg(fruitsMsg(i), "Spinning...", "Good luck!", msg)
        }
        await timeout(1000)
        await endMsg(fruitsMsg(r), "Result", ending, msg)
    }
};