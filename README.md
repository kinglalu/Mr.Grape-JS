<div align="center">
	<img src="images/mrgrape.png" title="Mr. Grape" alt="Mr. Grape" />
	<h1>Mr. Grape</h1>
	<p>By kinglalu#2780 and DAONE#7538<p>
	<p>Mr. Grape is an Open Source Discord Bot made using Discord.js that includes Music features, an Economy and more!</p>
	<a href="https://heroku.com/deploy?template=https://github.com/kinglalu/Mr.Grape"><img src=""https://www.herokucdn.com/deploy/button.svg" alt="Deploy to Heroku"></a>
</div>

## About

Mr. Grape contains a wide variety of Music Commands using `ytdl-core`, and has a well-developed economy system with features such as User Shops and Inventory. In addition, Mr. Grape has moderation commands for Kicking and Banning members and purging messages. This just scratches the surface of what Mr. Grape can do, as there are an extensive list of fun commands that add flavor to any server it's in.

## Notes
* The bots prefix is `+`, however this can be changed during operation with the command `+prefix <new prefix`.
* Many of the APIs used in Mr. Grape require Private Keys to be issued and added before those services will work.


## APIs Used
You will need to go to each of these websites and acquire an API key for each of their associated services.
* https://api.ksoft.si/
* https://thecatapi.com/
* https://thedogapi.com/
* https://api.nasa.gov/
* https://products.wolframalpha.com/api/

## Setup

 Press the deploy to Heroku Button, give the app a name.
Make sure you have a application made in https://discord.com/developers/applications, create a bot under that application, and get the BOT TOKEN from there.
Once the heroku app is deployed, go to Configure dynos and make sure web dyno is off and worker dyno is on like so:
<div align="center">
	<img src="images/dynos.JPG" alt="Dyno config" />
</div>
Once that is done, you will wanna go to Settings and under config vars, you wanna name a key called BOT_TOKEN. Then as the value, you will wanna paste in the token in the bot under the application. Do not share these tokens with anyone, or that person will have access to your bot. Then once you have that, you will wanna get your own api keys for the apis listed above, and then put in the names of the apis and the keys in the value, like so:
<div align="center">
	<img src="images/keys.jpg" alt="KEY config" />
</div>
Finally, you will need a database to store the data of the players using the economy commands. We use keyv, but it can be easily edited to use a diffrent db such as MongoDB, Redis, etc. Go to Resources tab, and where you see Add-ons, Search "Heroku Postgres" or "Heroku Redis", and attach it as a database, like so:
<div align="center">
	<img src="images/database.JPG" alt="Database config" />
</div>
If you used the onboard add-on databases provided by Heroku, you are good to go! If you used an external db outside of heroku, then make a config var called "DATABASE_URL" and put the database's connection url in it. You should be all set and the bot should be online. For any questions or inquires, feel free to join the discord and ask! https://discord.gg/bYFkqsdmqQ
