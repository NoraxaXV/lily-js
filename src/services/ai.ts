import { OpenAI } from "openai";
import ServiceFactory from "./factory";

export default class AIService {
  private serviceFactory: ServiceFactory;
  private client: OpenAI;
  private messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];
  constructor(serviceFactory: ServiceFactory, client: OpenAI) {
    this.serviceFactory = serviceFactory;
    this.client = client;
  }

  public async converse(msg: string, username: string): Promise<string> {
    this.messages.push({
      role: "developer",
      content: `${username} sent the following message:`,
    });
    this.messages.push({
      role: "user",
      content: msg,
    });
    const response = (
      await this.client.chat.completions.create({
        model: "shapesinc/grand-catgirl",
        messages: this.messages,
      })
    ).choices[0].message;
    if (response.content) {
      this.messages.push(response);
      return response.content;
    } else {
      throw Error("No response from AI Chat agent");
    }
  }
}
