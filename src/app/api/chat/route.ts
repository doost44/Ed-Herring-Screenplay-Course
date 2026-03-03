import { NextResponse } from "next/server";
import {
  buildNoStoryShapingReply,
  buildAppStateSummary,
  buildMessages,
  detectNoStoryShapingNeed,
  detectCommandFlags,
  loadSystemPrompt,
  postProcessEdReply,
} from "@/lib/edAgent";
import {
  enforceEdReplyContract,
  findLastAssistantMode,
  resolveModeTransition,
} from "@/lib/edContracts";
import { generateText, getConfiguredProvider } from "@/lib/llmProvider";
import { buildEdRefusal, checkSafety } from "@/lib/safety";
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
      appState,
      latestUserText,
    );

    const goal = deriveGoal(latestUserText, appState.currentSlug);
    const noQuestions = hasNoQuestionsCommand(latestUserText);
    const lastAssistantMode = findLastAssistantMode(messages);
    const mode = selectMode(flags, latestUserText, appState, lastAssistantMode);
    const boundaries = deriveBoundaries(
      flags,
      noQuestions,
      appState.analysisMode,
    );

    if (shouldApplyWeek1Gate(latestUserText, appState)) {
      return NextResponse.json({
        reply: buildWeek1GateReply(goal),
        flags,
        debug: {
          messageCount: finalMessages.length,
          latestUserLength: latestUserText.length,
          selectedMode: "T",
          noQuestions,
          provider: "week1-gate",
        },
      });
    }

    if (detectNoStoryShapingNeed({ userText: latestUserText })) {
      return NextResponse.json({
        reply: buildNoStoryShapingReply({ goal, slug: appState.currentSlug }),
        flags,
        debug: {
          messageCount: finalMessages.length,
          latestUserLength: latestUserText.length,
          selectedMode: "T",
          noQuestions,
          provider: "no-story-shaping",
        },
      });
    }

    const safety = checkSafety(latestUserText);
    if (safety.shouldRefuse) {
      return NextResponse.json({
        reply: buildEdRefusal({
          goal,
          reason: safety.reason ?? "unsafe request",
        }),
        flags,
        debug: {
          messageCount: finalMessages.length,
          latestUserLength: latestUserText.length,
          selectedMode: "B",
          noQuestions,
          provider: "safety-refusal",
        },
      });
    }

    const provider = getConfiguredProvider();
    let reply: string;
    let providerUsed: string;
    const hasHardCommandOverride = Boolean(flags.requestedMode) || noQuestions;

    if (hasHardCommandOverride) {
      reply = buildMockReply({
        latestUserText,
        appState,
        flags,
      });
      providerUsed = "mock-command-override";
    } else if (provider) {
      try {
        const generated = await generateText({
          messages: finalMessages,
          temperature: 0.4,
          maxTokens: 600,
        });
        reply = postProcessEdReply({
          reply: generated,
          mode,
          goal,
          boundaries,
        });
        providerUsed = provider;
      } catch {
        reply = buildMockReply({
          latestUserText,
          appState,
          flags,
        });
        providerUsed = `${provider}-fallback-mock`;
      }
    } else {
      reply = buildMockReply({
        latestUserText,
        appState,
        flags,
      });
      providerUsed = "mock";
    }

    reply = enforceEdReplyContract({
      reply,
      expectedMode: mode,
      goal,
      boundaries,
      noQuestions,
    });

    return NextResponse.json({
      reply,
      flags,
      debug: {
        messageCount: finalMessages.length,
        latestUserLength: latestUserText.length,
        selectedMode: mode,
        noQuestions,
        provider: providerUsed,
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

function shouldApplyWeek1Gate(userText: string, appState: AppState): boolean {
  if (appState.weekCompletion.week1) return false;

  return /\b(ending|endings|character\s*arc|arcs|theme|wants?|wounds?|scene\s*list|scene\s*lists)\b/i.test(
    userText,
  );
}

function buildWeek1GateReply(goal: string): string {
  return [
    "[MODE]: T",
    `[GOAL]: ${goal}`,
    "[BOUNDARIES]: Week 1 gate active; avoid endings/arcs/theme/wants/wounds/scene lists until Week 1 is complete",
    "- Complete Week 1 concept decisions and deliverables first.",
    "- I can help with constraints, sensory logic, and process templates right now.",
    "- Once Week 1 is marked complete, those advanced topics can be addressed.",
  ].join("\n");
}

function buildMockReply(args: {
  latestUserText: string;
  appState: AppState;
  flags: CommandFlags;
}): string {
  const { latestUserText, appState, flags } = args;
  const noQuestions = hasNoQuestionsCommand(latestUserText);
  const mode = selectMode(flags, latestUserText, appState);
  const goal = deriveGoal(latestUserText, appState.currentSlug);
  const boundaries = deriveBoundaries(
    flags,
    noQuestions,
    appState.analysisMode,
  );

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
    appState.analysisMode,
  );

  return [
    `[MODE]: ${mode}`,
    `[GOAL]: ${goal}`,
    `[BOUNDARIES]: ${boundaries}`,
    ...bodyLines,
  ].join("\n");
}

function selectMode(
  flags: CommandFlags,
  latestUserText: string,
  appState?: AppState,
  lastAssistantMode?: ModeBlock | null,
): ModeBlock {
  const noQuestions = hasNoQuestionsCommand(latestUserText);

  return resolveModeTransition({
    previousMode: lastAssistantMode ?? null,
    requestedMode: flags.requestedMode,
    noQuestions,
    analysisMode: appState?.analysisMode,
  });
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

function deriveBoundaries(
  flags: CommandFlags,
  noQuestions: boolean,
  analysisMode?: boolean,
): string {
  const items: string[] = [];

  if (!flags.coWriteRequested) items.push("No co-writing by default");
  if (!flags.storyFishingRequested) items.push("No story-fishing by default");
  if (!flags.rewriteRequested) items.push("No rewrites unless requested");
  if (noQuestions) items.push("No questions in this response");
  if (analysisMode) {
    items.push(
      "Analysis Mode: teach analysis tools, avoid reproducing text by default",
    );
  }

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
  analysisMode?: boolean,
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
      if (analysisMode) {
        return [
          `- Analysis mode active for ${slug}.`,
          "- Use behavior cues, silence/space cues, blocking cues, and sound cues.",
          "- Focus on interpretive tools and process notes, not text reproduction.",
        ];
      }

      return [
        `- Template mode active for ${slug}.`,
        "- Fill fields with your own production/process details.",
        `- Current input captured: ${lead}`,
      ];
  }
}
