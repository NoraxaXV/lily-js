import dotenv from "dotenv";
dotenv.config();

import ServiceFactory from "./services/factory";
import { Client, GatewayIntentBits } from "discord.js";
import OpenAI from "openai";

const application = new ServiceFactory({
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
