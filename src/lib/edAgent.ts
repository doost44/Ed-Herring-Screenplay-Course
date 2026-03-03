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
    `analysisMode=${appState.analysisMode ? "on" : "off"}`,
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
  appState?: AppState,
  latestUserText?: string,
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

  const directiveMessage: ChatMessage = {
    role: "system",
    content: buildDeveloperDirective({ flags, appState, latestUserText }),
  };

  return [
    { role: "system", content: systemPrompt },
    contextMessage,
    directiveMessage,
    ...history,
  ];
}

export function buildDeveloperDirective(params: {
  flags: CommandFlags;
  appState?: AppState;
  latestUserText?: string;
}): string {
  const { flags, appState, latestUserText } = params;

  const requestedMode = flags.requestedMode ?? "T";
  const effectiveMode = requestedMode === "M" ? "T" : requestedMode;
  const noQuestions = /\bno\s+questions\b/i.test(latestUserText ?? "");

  const week1Done = appState?.weekCompletion.week1 ?? false;
  const analysisMode = appState?.analysisMode ?? false;

  const blockRestrictions = [
    `effective_mode=${effectiveMode}`,
    "if mode=Q return only questions (max 5)",
    "if user says no questions, do not ask any questions",
    "if mode=M, map to mode=T",
    "if mode=T/F/P/B follow that block style",
  ].join("; ");

  const weekGate = week1Done
    ? "week1_gate=off"
    : "week1_gate=on; avoid endings, arcs, theme, wants/wounds, scene lists";

  return [
    "DEVELOPER_DIRECTIVE",
    "Always include header lines exactly: [MODE], [GOAL], [BOUNDARIES].",
    `Block restrictions: ${blockRestrictions}`,
    `Week gating: ${weekGate}`,
    `analysis_mode=${analysisMode ? "on" : "off"}; when on, teach analysis tools and avoid reproducing user text by default`,
    "If request asks for story invention without explicit brainstorming request, provide teaching tools and process options only.",
    `no_questions=${noQuestions}`,
  ].join("\n");
}

export function postProcessEdReply(params: {
  reply: string;
  mode: ModeBlock;
  goal: string;
  boundaries: string;
}): string {
  const { reply, mode, goal, boundaries } = params;

  const hasMode = /\[MODE\]:/i.test(reply);
  const hasGoal = /\[GOAL\]:/i.test(reply);
  const hasBoundaries = /\[BOUNDARIES\]:/i.test(reply);

  if (hasMode && hasGoal && hasBoundaries) {
    return reply;
  }

  return [
    `[MODE]: ${mode}`,
    `[GOAL]: ${goal}`,
    `[BOUNDARIES]: ${boundaries}`,
    reply.trim(),
  ].join("\n");
}

export function detectNoStoryShapingNeed(params: {
  userText: string;
}): boolean {
  const text = params.userText.toLowerCase();

  const asksStoryShaping =
    /\b(plot|ending|character|characters|arc|theme|scene list|wants|wounds)\b/.test(
      text,
    );

  const explicitBrainstorm =
    /\b(brainstorm|ideate|explore options|give options|possibilities)\b/.test(
      text,
    );

  return asksStoryShaping && !explicitBrainstorm;
}

export function buildNoStoryShapingReply(params: {
  goal: string;
  slug: string;
}): string {
  return [
    "[MODE]: T",
    `[GOAL]: ${params.goal}`,
    "[BOUNDARIES]: No story shaping by default; teaching tools and process guidance only",
    `- For ${params.slug}, I can provide structure tools instead of inventing plot/character outcomes.`,
    "- Use: constraints list, decision fields, and process checklists before story invention.",
    "- If you want ideation, explicitly request brainstorming and define boundaries.",
  ].join("\n");
}
