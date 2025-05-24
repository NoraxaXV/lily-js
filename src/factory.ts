import OpenAI from "openai";
import { Client } from "discord.js";
import AIService from "./services/ai.js";
import DiscordService from "./services/discord.js";

export default class ServiceFactory {
  private aiService: AIService;
  public getAIService = () => this.aiService;
  private discordService: DiscordService;
  public getDiscordService = () => this.discordService;

  constructor(services: { ai: OpenAI; discord: Client }) {
    this.aiService = new AIService(services.ai);
    this.discordService = new DiscordService(this, services.discord);
  }
}
