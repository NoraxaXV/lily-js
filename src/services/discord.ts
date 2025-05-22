import { Client, Events, Message } from "discord.js";
import ServiceFactory from "./factory";

export default class DiscordService {
  constructor(private serviceFactory: ServiceFactory, private client: Client) {
    this.client.once(Events.ClientReady, this.onReady);
    this.client.on(Events.MessageCreate, this.onMessage);

    client.login(process.env.DISCORD_BOT_TOKEN);
  }
  private onReady(readyClient: Client) {
    if (readyClient.isReady()) {
      console.log(`Client Ready! Logged in as ${readyClient.user.tag}`);
    }
  }
  private async onMessage(msg: Message<boolean>) {
    // Ignore messages sent by the bot
    if (msg.author.id === this.client.user?.id) {
      return;
    }
    console.log(`from ${msg.author.displayName}, received: ${msg.content}`);
    if (msg.mentions.has(this.client.user!) && msg.channel.isSendable()) {
      await msg.channel.sendTyping();
      await msg.channel.send({
        reply: {
          messageReference: msg.id,
        },
        content: await this.serviceFactory
          .getAIService()
          .converse(msg.content, msg.author.displayName),
      });
    }
  }
}
