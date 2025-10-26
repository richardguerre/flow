import { z } from "zod";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface LLMProviderConfig {
  apiKey: string;
  baseURL?: string;
}

export interface LLMConfig {
  provider: "openai" | "anthropic" | "google";
  model: string;
  apiKey?: string;
  baseUrl?: string;
}

export interface LLMUsageWindow {
  tokens: number;
  requests: number;
  windowStart: string;
}

export interface LLMUsageStats {
  totalTokens: number;
  promptTokens: number;
  completionTokens: number;
  requests: number;
  cost: number;
  lastUpdated: string;
  hourlyUsage: LLMUsageWindow;
  dailyUsage: LLMUsageWindow;
  byPlugin: Record<string, LLMUsageStats>;
}

export interface LLMRateLimit {
  tokensPerDay: number;
  requestsPerDay: number;
  tokensPerHour: number;
  requestsPerHour: number;
}

export interface LLMGlobalKeys {
  openai?: string;
  anthropic?: string;
  google?: string;
}

export interface PromptOptions {
  provider?: "openai" | "anthropic" | "google";
  model?: string;
  maxTokens?: number;
  temperature?: number;
  apiKey?: string;
  baseUrl?: string;
}
