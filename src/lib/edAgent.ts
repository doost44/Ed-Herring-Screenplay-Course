import "server-only";

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type {
  AppState,
  ChatMessage,
  CommandFlags,
  ModeBlock,
} from "@/lib/agentTypes";

const MODE_TOKENS: ModeBlock[] = ["T", "F", "Q", "P", "B", "M"];

/**
 * Load the Ed system prompt from disk.
 * This function is server-only and does not perform any model call.
 */
export async function loadSystemPrompt(): Promise<string> {
  const promptPath = join(process.cwd(), "src", "prompts", "ed.system.md");
  return readFile(promptPath, "utf8");
}

/**
 * Infer command flags from a user message.
 */
export function detectCommandFlags(userText: string): CommandFlags {
  const text = userText.toLowerCase();

  const coWriteRequested =
    /\b(co-?write|cowrite|draft it|write it for me|write the scene|write dialogue)\b/.test(
      text,
    );

  const storyFishingRequested =
    /\b(backstory|lore|origin story|wound|wants?|deep character history)\b/.test(
      text,
    );

  const rewriteRequested =
    /\b(rewrite|reword|polish|improve this text|edit this paragraph)\b/.test(
      text,
    );

  const requestedMode = detectModeBlock(text);

  return {
    coWriteRequested,
    storyFishingRequested,
    rewriteRequested,
    requestedMode,
  };
}

function detectModeBlock(text: string): ModeBlock | null {
  if (/\bteaching\s+only\b/.test(text)) return "T";
  if (/\bfeedback\s+only\b/.test(text)) return "F";
  if (/\bquestions\s+only\b/.test(text)) return "Q";
  if (/\bplan\s+only\b/.test(text)) return "P";
  if (/\bstop\s+steering\b/.test(text)) return "M";

  for (const token of MODE_TOKENS) {
    if (new RegExp(`\\b${token.toLowerCase()}\\b`).test(text)) {
      return token;
    }
  }

  const explicit = text.match(/\bmode\s*[:=]\s*([tfqpbm])\b/);
  if (explicit?.[1]) {
    return explicit[1].toUpperCase() as ModeBlock;
  }

  return null;
}

/**
 * Build a compact, deterministic app-state summary string for prompting.
 */
export function buildAppStateSummary(appState: AppState): string {
  const weekFlags = [
    `W1=${appState.weekCompletion.week1 ? "done" : "open"}`,
    `W2=${appState.weekCompletion.week2 ? "done" : "open"}`,
    `W3=${appState.weekCompletion.week3 ? "done" : "open"}`,
    `W4=${appState.weekCompletion.week4 ? "done" : "open"}`,
    `W5=${appState.weekCompletion.week5 ? "done" : "open"}`,
  ].join(", ");

  const constraints = [
    ["locations", appState.constraintsSummary.locations],
    ["props", appState.constraintsSummary.props],
    ["castAvailability", appState.constraintsSummary.castAvailability],
    ["sound", appState.constraintsSummary.sound],
    ["lighting", appState.constraintsSummary.lighting],
    ["schedule", appState.constraintsSummary.schedule],
  ]
    .map(([key, value]) => `${key}=${summarizeValue(value)}`)
    .join("; ");

  return [
    "APP_STATE",
    `currentSlug=${appState.currentSlug}`,
    `weekCompletion=${weekFlags}`,
    `constraints=${constraints}`,
  ].join("\n");
}

function summarizeValue(value: string | undefined): string {
  if (!value || value.trim().length === 0) {
    return "(empty)";
  }

  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized.length > 140
    ? `${normalized.slice(0, 137)}...`
    : normalized;
}

/**
 * Build chat messages for a future model call.
 * No model call is made here.
 */
export function buildMessages(
  systemPrompt: string,
  history: ChatMessage[],
  appStateSummary: string,
  flags: CommandFlags,
): ChatMessage[] {
  const flagSummary = [
    `coWriteRequested=${flags.coWriteRequested}`,
    `storyFishingRequested=${flags.storyFishingRequested}`,
    `rewriteRequested=${flags.rewriteRequested}`,
    `requestedMode=${flags.requestedMode ?? "none"}`,
  ].join("; ");

  const contextMessage: ChatMessage = {
    role: "system",
    content: [`RUNTIME_CONTEXT`, appStateSummary, `flags=${flagSummary}`].join(
      "\n\n",
    ),
  };

  return [
    { role: "system", content: systemPrompt },
    contextMessage,
    ...history,
  ];
}
