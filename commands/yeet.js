async function yoink() {
await keyv.set('e','j');
}
yoink();

async function ree(param) {
	await keyv.get(param);
	}

let es = ree('e');

message.channel.send(es);


