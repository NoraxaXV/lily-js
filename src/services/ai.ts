import { OpenAI } from "openai";
export default class AIService {
  private messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];
  constructor(private client: OpenAI) {}

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
  public addMessage(msg: string, username: string) {
    this.messages.push({
      role: "developer",
      content: `${username} sent the following message:`,
    });
    this.messages.push({
      role: "user",
      content: msg,
    });
  }
}
