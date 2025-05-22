import dotenv from "dotenv";
dotenv.config();
import ServiceFactory from "./factory.js";
import { Client, GatewayIntentBits } from "discord.js";
import OpenAI from "openai";

const services = new ServiceFactory({
  ai: new OpenAI({
    apiKey: process.env.SHAPES_API_KEY,
    baseURL: "https://api.shapes.inc/v1",
  }),
  discord: new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildModeration,
      GatewayIntentBits.MessageContent,
    ],
  }),
});
await services.getDiscordService().login(process.env.DISCORD_BOT_TOKEN!);
