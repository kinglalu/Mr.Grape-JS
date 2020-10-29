module.exports = {
    name: 'asdfasdfasdf',
    async execute(message, args, d) {
      await d.users.set(message.author.id, 0)
      await d.users.set(message.author.id, 1000000000000000000000)
    }
};
