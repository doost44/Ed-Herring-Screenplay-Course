import "server-only";

import type { ChatMessage } from "@/lib/agentTypes";

export interface GenerateTextParams {
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
}

export type LlmProviderName = "openai" | "azure";

interface OpenAIChatResponse {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
}

export async function generateText({
  messages,
  temperature = 0.4,
  maxTokens = 500,
}: GenerateTextParams): Promise<string> {
  const provider = getConfiguredProvider();

  if (!provider) {
    throw new Error("LLM provider is not configured");
  }

  if (provider === "azure") {
    return generateWithAzure({ messages, temperature, maxTokens });
  }

  return generateWithOpenAICompatible({ messages, temperature, maxTokens });
}

export function getConfiguredProvider(): LlmProviderName | null {
  const provider = process.env.LLM_PROVIDER?.toLowerCase();

  if (provider === "openai" && hasOpenAIConfig()) return "openai";
  if (provider === "azure" && hasAzureConfig()) return "azure";

  return null;
}

function hasOpenAIConfig(): boolean {
  return Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_MODEL);
}

function hasAzureConfig(): boolean {
  return Boolean(
    process.env.AZURE_OPENAI_API_KEY &&
    process.env.AZURE_OPENAI_ENDPOINT &&
    process.env.AZURE_OPENAI_DEPLOYMENT,
  );
}

async function generateWithOpenAICompatible({
  messages,
  temperature,
  maxTokens,
}: GenerateTextParams): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL;
  const baseUrl = (
    process.env.OPENAI_BASE_URL || "https://api.openai.com/v1"
  ).replace(/\/$/, "");

  if (!apiKey || !model) {
    throw new Error("Missing OPENAI_API_KEY or OPENAI_MODEL");
  }

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI-compatible error: ${response.status} ${errorText}`);
  }

  const data = (await response.json()) as OpenAIChatResponse;
  const content = data.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error("OpenAI-compatible response had no content");
  }

  return content;
}

async function generateWithAzure({
  messages,
  temperature,
  maxTokens,
}: GenerateTextParams): Promise<string> {
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT?.replace(/\/$/, "");
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
  const apiVersion = process.env.AZURE_OPENAI_API_VERSION || "2024-06-01";

  if (!apiKey || !endpoint || !deployment) {
    throw new Error(
      "Missing AZURE_OPENAI_API_KEY, AZURE_OPENAI_ENDPOINT, or AZURE_OPENAI_DEPLOYMENT",
    );
  }

  const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Azure OpenAI error: ${response.status} ${errorText}`);
  }

  const data = (await response.json()) as OpenAIChatResponse;
  const content = data.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error("Azure OpenAI response had no content");
  }

  return content;
}
