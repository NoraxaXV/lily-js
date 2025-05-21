import dotenv from "dotenv";
dotenv.config();
import { Client, Events, GatewayIntentBits } from "discord.js";
import { OpenAI } from "openai";

const shape = new OpenAI({
  apiKey: process.env.SHAPES_API_KEY,
  baseURL: "https://api.shapes.inc/v1",
});
const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.MessageContent,
  ],
});
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Client Ready! Logged in as ${readyClient.user.tag}`);
});
client.on(Events.MessageCreate, async (msg) => {
  if (msg.author.id === client.user?.id || !msg.mentions.has(client.user!)) {
    return;
  }
  console.log(`from ${msg.author} received ${msg.content}`);
  await msg.channel.sendTyping();
  messages.push({
    role: "developer",
    content: `${msg.author.displayName} sent the following message:`,
  });
  messages.push({
    role: "user",
    content: msg.content,
  });

  const response = (
    await shape.chat.completions.create({
      model: "shapesinc/grand-catgirl",
      messages: messages,
    })
  ).choices[0].message;
  if (response.content) await msg.channel.send(response.content);
});
client.login(process.env.DISCORD_BOT_TOKEN);
