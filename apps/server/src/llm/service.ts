import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText, generateObject } from "ai";
import {
  LLMConfig,
  LLMUsageStats,
  LLMRateLimit,
  LLMGlobalKeys,
  LLMProviderConfig,
  ChatMessage,
  LLMUsageWindow,
  PromptOptions,
} from "./types";
import { prisma } from "../utils/prisma";
import { FlowPluginSlug } from "../graphql/Store";
import { dayjs } from "../utils/dayjs";
import { z } from "zod";

export function createLLM($pluginSlug?: string) {
  const pluginSlug = $pluginSlug || FlowPluginSlug;

  const getModel = async (provider: string, model: string, apiKey?: string, baseUrl?: string) => {
    const globalKeysItem = await prisma.store.findFirst({
      where: { key: "llm-global-api-keys", pluginSlug: FlowPluginSlug },
    });
    const globalKeys = (globalKeysItem?.value as unknown as LLMGlobalKeys) || {};

    const key = apiKey || globalKeys[provider as keyof LLMGlobalKeys];

    if (!key) {
      throw new Error(`No API key found for provider ${provider}`);
    }

    const config: LLMProviderConfig = { apiKey: key };
    if (baseUrl) {
      config.baseURL = baseUrl;
    }

    switch (provider) {
      case "openai":
        return createOpenAI(config)(model);
      case "anthropic":
        return createAnthropic(config)(model);
      case "google":
        return createGoogleGenerativeAI(config)(model);
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  };

  const estimateTokens = (messages: string | ChatMessage[]): number => {
    const text = typeof messages === "string" ? messages : messages.map((m) => m.content).join(" ");
    return Math.ceil(text.length / 4);
  };

  const resetWindowIfNeeded = (window: LLMUsageWindow, windowDuration: "hour" | "day") => {
    const now = dayjs();
    const windowStart = dayjs(window.windowStart);
    const windowEnd = windowStart.add(1, windowDuration);

    if (now.isAfter(windowEnd)) {
      window.tokens = 0;
      window.requests = 0;
      window.windowStart = now.startOf(windowDuration).toISOString();
    }
  };

  const checkRateLimits = async (tokens: number, requests: number = 1) => {
    const rateLimits: LLMRateLimit = {
      tokensPerDay: 100000,
      requestsPerDay: 1000,
      tokensPerHour: 10000,
      requestsPerHour: 100,
    };

    const usageItem = await prisma.store.findFirst({
      where: { key: "llm-usage-stats", pluginSlug: FlowPluginSlug },
    });
    if (!usageItem) return;

    const usage = usageItem.value as unknown as LLMUsageStats;

    resetWindowIfNeeded(usage.hourlyUsage, "hour");
    resetWindowIfNeeded(usage.dailyUsage, "day");

    if (usage.hourlyUsage.tokens + tokens > rateLimits.tokensPerHour) {
      throw new Error("Hourly token limit exceeded");
    }
    if (usage.hourlyUsage.requests + requests > rateLimits.requestsPerHour) {
      throw new Error("Hourly request limit exceeded");
    }

    if (usage.dailyUsage.tokens + tokens > rateLimits.tokensPerDay) {
      throw new Error("Daily token limit exceeded");
    }
    if (usage.dailyUsage.requests + requests > rateLimits.requestsPerDay) {
      throw new Error("Daily request limit exceeded");
    }
  };

  const updateUsageStats = async (usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  }) => {
    const usageItem = await prisma.store.findFirst({
      where: { key: "llm-usage-stats", pluginSlug: FlowPluginSlug },
    });
    const currentStats = (usageItem?.value as unknown as LLMUsageStats) || {
      totalTokens: 0,
      promptTokens: 0,
      completionTokens: 0,
      requests: 0,
      cost: 0,
      lastUpdated: dayjs().toISOString(),
      hourlyUsage: { tokens: 0, requests: 0, windowStart: dayjs().startOf("hour").toISOString() },
      dailyUsage: { tokens: 0, requests: 0, windowStart: dayjs().startOf("day").toISOString() },
      byPlugin: {},
    };

    resetWindowIfNeeded(currentStats.hourlyUsage, "hour");
    resetWindowIfNeeded(currentStats.dailyUsage, "day");

    currentStats.totalTokens += usage.totalTokens;
    currentStats.promptTokens += usage.promptTokens;
    currentStats.completionTokens += usage.completionTokens;
    currentStats.requests += 1;
    currentStats.lastUpdated = dayjs().toISOString();

    currentStats.hourlyUsage.tokens += usage.totalTokens;
    currentStats.hourlyUsage.requests += 1;
    currentStats.dailyUsage.tokens += usage.totalTokens;
    currentStats.dailyUsage.requests += 1;

    if (pluginSlug && pluginSlug !== FlowPluginSlug) {
      if (!currentStats.byPlugin[pluginSlug]) {
        currentStats.byPlugin[pluginSlug] = {
          totalTokens: 0,
          promptTokens: 0,
          completionTokens: 0,
          requests: 0,
          cost: 0,
          lastUpdated: dayjs().toISOString(),
          hourlyUsage: {
            tokens: 0,
            requests: 0,
            windowStart: dayjs().startOf("hour").toISOString(),
          },
          dailyUsage: { tokens: 0, requests: 0, windowStart: dayjs().startOf("day").toISOString() },
          byPlugin: {},
        };
      }

      const pluginStats = currentStats.byPlugin[pluginSlug];
      resetWindowIfNeeded(pluginStats.hourlyUsage, "hour");
      resetWindowIfNeeded(pluginStats.dailyUsage, "day");

      pluginStats.totalTokens += usage.totalTokens;
      pluginStats.promptTokens += usage.promptTokens;
      pluginStats.completionTokens += usage.completionTokens;
      pluginStats.requests += 1;
      pluginStats.lastUpdated = dayjs().toISOString();

      pluginStats.hourlyUsage.tokens += usage.totalTokens;
      pluginStats.hourlyUsage.requests += 1;
      pluginStats.dailyUsage.tokens += usage.totalTokens;
      pluginStats.dailyUsage.requests += 1;
    }

    await prisma.store.upsert({
      where: { pluginSlug_key_unique: { pluginSlug: FlowPluginSlug, key: "llm-usage-stats" } },
      update: { value: currentStats as any },
      create: {
        pluginSlug: FlowPluginSlug,
        key: "llm-usage-stats",
        value: currentStats as any,
        isSecret: true,
        isServerOnly: true,
      },
    });
  };

  return {
    async prompt(args: { messages: string | ChatMessage[]; options?: PromptOptions }) {
      try {
        const configItem = await prisma.store.findFirst({
          where: { key: "llm-config", pluginSlug: FlowPluginSlug },
        });
        const config = (configItem?.value as unknown as LLMConfig) || {
          provider: "openai",
          model: "gpt-4-turbo",
        };

        const provider = args.options?.provider || config.provider;
        const model = args.options?.model || config.model;
        const apiKey = args.options?.apiKey || config.apiKey;
        const baseUrl = args.options?.baseUrl || config.baseUrl;

        const estimatedTokens = estimateTokens(args.messages);
        await checkRateLimits(estimatedTokens);

        const modelInstance = await getModel(provider, model, apiKey, baseUrl);

        const result = await generateText({
          model: modelInstance,
          messages:
            typeof args.messages === "string"
              ? [{ role: "user", content: args.messages }]
              : args.messages,
          maxTokens: args.options?.maxTokens,
          temperature: args.options?.temperature,
        });

        await updateUsageStats(result.usage);

        return {
          text: result.text,
          usage: result.usage,
        };
      } catch (error) {
        throw new Error(
          `LLM request failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    },

    async generateObject(args: {
      schema: z.ZodSchema;
      messages: string | ChatMessage[];
      options?: PromptOptions;
    }) {
      try {
        const configItem = await prisma.store.findFirst({
          where: { key: "llm-config", pluginSlug: FlowPluginSlug },
        });
        const config: LLMConfig = (configItem?.value as unknown as LLMConfig) || {
          provider: "openai",
          model: "gpt-4-turbo",
        };

        const provider = args.options?.provider || config.provider;
        const model = args.options?.model || config.model;
        const apiKey = args.options?.apiKey || config.apiKey;
        const baseUrl = args.options?.baseUrl || config.baseUrl;

        const estimatedTokens = estimateTokens(args.messages);
        await checkRateLimits(estimatedTokens);

        const modelInstance = await getModel(provider, model, apiKey, baseUrl);

        const result = await generateObject({
          model: modelInstance,
          schema: args.schema,
          messages:
            typeof args.messages === "string"
              ? [{ role: "user", content: args.messages }]
              : args.messages,
          maxTokens: args.options?.maxTokens,
          temperature: args.options?.temperature,
        });

        await updateUsageStats(result.usage);

        return {
          object: result.object,
          usage: result.usage,
        };
      } catch (error) {
        throw new Error(
          `LLM structured generation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    },
  };
}
