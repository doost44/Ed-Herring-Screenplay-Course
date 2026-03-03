/**
 * Client-side LLM caller.
 * Reads API key + model + base URL from localStorage,
 * builds the Ed system prompt inline, and calls the OpenAI-compatible
 * chat completions endpoint directly from the browser.
 *
 * Works on static-exported sites (GitHub Pages) — no server route needed.
 */

import type { ChatMessage, AppState } from "@/lib/agentTypes";
import { getJSON } from "@/lib/storage";

/* ------------------------------------------------------------------ */
/*  Storage keys                                                       */
/* ------------------------------------------------------------------ */
export const LLM_KEY_STORAGE = "mm_llm_apiKey";
export const LLM_MODEL_STORAGE = "mm_llm_model";
export const LLM_BASE_URL_STORAGE = "mm_llm_baseUrl";

/* ------------------------------------------------------------------ */
/*  Public helpers                                                     */
/* ------------------------------------------------------------------ */

/** True when the user has saved a non-empty API key. */
export function isClientLlmConfigured(): boolean {
  return getJSON<string>(LLM_KEY_STORAGE, "").trim().length > 0;
}

/** Return saved config (or safe defaults). */
export function getClientLlmConfig() {
  return {
    apiKey: getJSON<string>(LLM_KEY_STORAGE, ""),
    model: getJSON<string>(LLM_MODEL_STORAGE, "gpt-4o-mini"),
    baseUrl: getJSON<string>(
      LLM_BASE_URL_STORAGE,
      "https://api.openai.com/v1",
    ),
  };
}

/* ------------------------------------------------------------------ */
/*  System prompt (inlined so we don't need fs at runtime)             */
/* ------------------------------------------------------------------ */
const ED_SYSTEM_PROMPT = `You are **Ed**, the instructional guide inside Mirror Mentor — Short Film Lab.

## Core defaults
1. **No co-writing by default** — Do not draft scenes, prose, dialogue, beats, or story text unless the user explicitly asks.
2. **No story-fishing by default** — Do not probe for backstory, trauma mining, or speculative lore unless explicitly requested.
3. **No rewrites unless requested** — Offer analysis, structure, and process guidance first.

## Mandatory response header
Every response must begin with:
- [MODE]: <selected mode>
- [GOAL]: <single-sentence user objective>
- [BOUNDARIES]: <what Ed will not do in this response>

## Response blocks
Use one primary block per response:
- T = Template block (fillable structure, checklists, fields)
- F = Feedback block (assessment, what is working / unclear)
- Q = Questions block (targeted clarifying questions)
- P = Plan block (ordered next actions)
- B = Boundary block (safety/scope limits and refusals)
- M = Meta block (workflow/status/coordination)

## Week gating policy
If Week 1 is not completed, Ed must avoid generating or coaching on: endings, character arcs, theme statements, wants/wounds frameworks, scene lists. When gated topics are requested before Week 1 completion: acknowledge the request, explain the gate briefly, redirect to Week 1-compatible structure work.

## Interaction style
- Prioritize structure and process over creative authorship.
- Keep outputs concise, practical, and fillable.
- Ask only the minimum questions needed to unblock progress.
- Preserve user ownership of writing decisions.`;

/* ------------------------------------------------------------------ */
/*  Build the messages array for the LLM                               */
/* ------------------------------------------------------------------ */
function buildLlmMessages(
  history: ChatMessage[],
  appState: AppState,
): { role: string; content: string }[] {
  const contextNote = [
    `The user is on page: ${appState.currentSlug}`,
    appState.analysisMode ? "Analysis mode is active." : "",
    `Week completion: ${JSON.stringify(appState.weekCompletion)}`,
  ]
    .filter(Boolean)
    .join(". ");

  const systemContent = `${ED_SYSTEM_PROMPT}\n\n## Current context\n${contextNote}`;

  const out: { role: string; content: string }[] = [
    { role: "system", content: systemContent },
  ];

  // Include last 20 messages to stay within token limits
  const recent = history.slice(-20);
  for (const msg of recent) {
    if (msg.role === "user" || msg.role === "assistant") {
      out.push({ role: msg.role, content: msg.content });
    }
  }

  return out;
}

/* ------------------------------------------------------------------ */
/*  Call the OpenAI-compatible completions endpoint                     */
/* ------------------------------------------------------------------ */
interface OpenAIChatResponse {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
  error?: {
    message?: string;
  };
}

export async function generateClientReply(
  history: ChatMessage[],
  appState: AppState,
): Promise<string> {
  const { apiKey, model, baseUrl } = getClientLlmConfig();

  if (!apiKey) {
    throw new Error("No API key configured");
  }

  const messages = buildLlmMessages(history, appState);
  const url = `${baseUrl.replace(/\/$/, "")}/chat/completions`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.4,
      max_tokens: 800,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`LLM API error ${response.status}: ${errorText}`);
  }

  const data = (await response.json()) as OpenAIChatResponse;

  if (data.error?.message) {
    throw new Error(`LLM API: ${data.error.message}`);
  }

  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error("LLM returned empty response");
  }

  return content;
}
