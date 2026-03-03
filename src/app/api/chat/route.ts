import { NextResponse } from "next/server";
import {
  buildAppStateSummary,
  buildMessages,
  detectCommandFlags,
  loadSystemPrompt,
} from "@/lib/edAgent";
import type {
  AppState,
  ChatMessage,
  CommandFlags,
  ModeBlock,
} from "@/lib/agentTypes";

type ChatRequestBody = {
  messages: ChatMessage[];
  appState: AppState;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ChatRequestBody>;
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const appState = body.appState;

    if (!appState || !appState.currentSlug) {
      return NextResponse.json(
        { error: "Invalid appState payload" },
        { status: 400 },
      );
    }

    const latestUser = [...messages].reverse().find((m) => m.role === "user");
    const latestUserText = latestUser?.content ?? "";

    const systemPrompt = await loadSystemPrompt();
    const flags = detectCommandFlags(latestUserText);
    const appStateSummary = buildAppStateSummary(appState);
    const finalMessages = buildMessages(
      systemPrompt,
      messages,
      appStateSummary,
      flags,
    );

    const reply = buildMockReply({
      latestUserText,
      appState,
      flags,
    });

    return NextResponse.json({
      reply,
      flags,
      debug: {
        messageCount: finalMessages.length,
        latestUserLength: latestUserText.length,
        selectedMode: selectMode(flags, latestUserText),
        noQuestions: hasNoQuestionsCommand(latestUserText),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to process chat request",
        debug: String(error),
      },
      { status: 500 },
    );
  }
}

function buildMockReply(args: {
  latestUserText: string;
  appState: AppState;
  flags: CommandFlags;
}): string {
  const { latestUserText, appState, flags } = args;
  const noQuestions = hasNoQuestionsCommand(latestUserText);
  const mode = selectMode(flags, latestUserText);
  const goal = deriveGoal(latestUserText, appState.currentSlug);
  const boundaries = deriveBoundaries(flags, noQuestions);

  if (mode === "Q" && !noQuestions) {
    const questions = buildQuestions(
      latestUserText,
      appState.currentSlug,
    ).slice(0, 5);
    return [
      `[MODE]: Q`,
      `[GOAL]: ${goal}`,
      `[BOUNDARIES]: ${boundaries}`,
      ...questions.map((q) => `- ${q}`),
    ].join("\n");
  }

  const bodyLines = buildNonQuestionBody(
    mode,
    appState.currentSlug,
    latestUserText,
  );

  return [
    `[MODE]: ${mode}`,
    `[GOAL]: ${goal}`,
    `[BOUNDARIES]: ${boundaries}`,
    ...bodyLines,
  ].join("\n");
}

function selectMode(flags: CommandFlags, latestUserText: string): ModeBlock {
  const noQuestions = hasNoQuestionsCommand(latestUserText);

  let mode: ModeBlock = flags.requestedMode ?? "T";

  if (mode === "M") {
    mode = "T";
  }

  if (mode === "Q" && noQuestions) {
    mode = "T";
  }

  return mode;
}

function hasNoQuestionsCommand(text: string): boolean {
  return /\bno\s+questions\b/.test(text.toLowerCase());
}

function deriveGoal(latestUserText: string, slug: string): string {
  const clean = latestUserText.replace(/\s+/g, " ").trim();
  if (!clean) {
    return `Provide process guidance for ${slug}.`;
  }

  const firstSentence = clean.split(/[.!?]/)[0]?.trim() ?? clean;
  return firstSentence.length > 120
    ? `${firstSentence.slice(0, 117)}...`
    : firstSentence;
}

function deriveBoundaries(flags: CommandFlags, noQuestions: boolean): string {
  const items: string[] = [];

  if (!flags.coWriteRequested) items.push("No co-writing by default");
  if (!flags.storyFishingRequested) items.push("No story-fishing by default");
  if (!flags.rewriteRequested) items.push("No rewrites unless requested");
  if (noQuestions) items.push("No questions in this response");

  return items.join("; ");
}

function buildQuestions(userText: string, slug: string): string[] {
  return [
    `What single outcome do you want from this page (${slug}) today?`,
    "Which section should be filled first to unblock progress?",
    "What constraints are fixed versus flexible right now?",
    "What is the smallest next action you can complete in 15 minutes?",
    `Which part of your message needs the most clarification: "${
      userText.split("\n")[0] ?? "(none)"
    }"?`,
  ];
}

function buildNonQuestionBody(
  mode: ModeBlock,
  slug: string,
  latestUserText: string,
): string[] {
  const lead =
    latestUserText.split("\n")[0]?.trim() || "(no user text provided)";

  switch (mode) {
    case "F":
      return [
        `- Feedback focus for ${slug}: structure is clear and ready for refinement.`,
        "- Keep entries specific, measurable, and tied to the current week artifact.",
        `- Review target: ${lead}`,
      ];

    case "P":
      return [
        "- Step 1: capture the objective in one line.",
        "- Step 2: fill the relevant template fields on the current page.",
        "- Step 3: mark completion/checklist items and refresh status.",
      ];

    case "B":
      return [
        "- Request is constrained to process guidance only.",
        "- No direct story writing or unsolicited rewrites are provided.",
        `- You can request explicit rewrite/co-writing if desired: ${lead}`,
      ];

    case "M":
    case "T":
    default:
      return [
        `- Template mode active for ${slug}.`,
        "- Fill fields with your own production/process details.",
        `- Current input captured: ${lead}`,
      ];
  }
}
