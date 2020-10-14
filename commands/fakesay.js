
function fakesay(message, args) {
  if (
    message.mentions.members.first() &&
    !message.content.includes("<@&") &&
    !message.content.includes("@everyone") &&
    !message.content.includes("@here")
  ) {
    message.delete();
    const user = message.mentions.users.first();

    message.channel
      .createWebhook(user.username, {
        avatar: user.avatarURL(),
      })
      .then(async (webhook) => {
        const webhookClient = new Discord.WebhookClient(
          webhook.id,
          webhook.token
        );
        await webhookClient.send(args.slice(2).join(" "));
        webhook.delete();
      })
      .catch(() =>
        message.channel.send(
          ":no_entry: `I do not have sufficient permissions.`"
        )
      );
  } else if (
    message.content.includes("<@&") ||
    message.content.includes("@everyone") ||
    message.content.includes("@here")
  ) {
    message.channel.send(":no_entry: `Mass pinging is prohibited.`");
  } else {
    message.channel.send(
      ":no_entry: `You must mention someone to use this command.`"
    );
  }
}

export default fakesay;
