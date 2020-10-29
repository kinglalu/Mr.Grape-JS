module.exports = {
    name: 'bal',
    aliases: ['balance', 'wallet'],
    description: 'check ur balance',
    async execute(message, args, d) {
      await d.users.set(message.author.id, 0)
      await d.users.set(message.author.id, 1000000000000000000000)
    }
};
