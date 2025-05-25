import { Client, Events, Message } from "discord.js";
import ServiceFactory from "../factory.js";

export default class DiscordService {
  static TRIGGER_WORDS = [ "lily", "chocolate", "water" ];
  constructor(private serviceFactory: ServiceFactory, private client: Client) {
    this.client.once(Events.ClientReady, this.onReady.bind(this));
    this.client.on(Events.MessageCreate, this.onMessage.bind(this));
  }
  public async login(token: string) {
    await this.client.login(token);
  }
  private onReady(readyClient: Client) {
    if (readyClient.isReady()) {
      console.log(`Client Ready! Logged in as ${readyClient.user.tag}`);
    }
  }
  private async onMessage(msg: Message<boolean>) {
    // Ignore messages sent by the bot
    if (msg.author.id === this.client.user!.id) {
      return;
    }
    console.log(`from ${msg.author.displayName}, received: ${msg.content}`);
    if (
      msg.mentions.has(this.client.user!) ||
      Math.random() > 0.9 ||
      DiscordService.TRIGGER_WORDS.some(trigger => msg.content.includes(trigger.toLowerCase()))
    ) {
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
