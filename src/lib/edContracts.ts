import type { ChatMessage, ModeBlock } from "@/lib/agentTypes";

export interface ParsedEdReply {
  mode: ModeBlock | null;
  goal: string | null;
  boundaries: string | null;
  body: string[];
}

export interface EdContractValidation {
  isValid: boolean;
  errors: string[];
}

export const MODE_TRANSITION_MAP: Record<ModeBlock, ModeBlock[]> = {
  T: ["T", "F", "Q", "P", "B"],
  F: ["F", "T", "Q", "P", "B"],
  Q: ["Q", "T", "F", "P"],
  P: ["P", "T", "F", "Q", "B"],
  B: ["B", "T", "F", "Q", "P"],
  M: ["T"],
};

function normalizeMode(mode: ModeBlock | null): ModeBlock | null {
  if (!mode) return null;
  if (mode === "M") return "T";
  return mode;
}

export function resolveModeTransition(params: {
  previousMode: ModeBlock | null;
  requestedMode: ModeBlock | null;
  noQuestions: boolean;
  analysisMode?: boolean;
}): ModeBlock {
  const previous = normalizeMode(params.previousMode) ?? "T";
  let requested = normalizeMode(params.requestedMode);

  if (!requested) {
    requested = params.analysisMode && !params.noQuestions ? "T" : previous;
  }

  if (requested === "Q" && params.noQuestions) {
    return "T";
  }

  const allowed = MODE_TRANSITION_MAP[previous] ?? MODE_TRANSITION_MAP.T;
  if (!allowed.includes(requested)) {
    return "T";
  }

  return requested;
}

export function parseEdReply(text: string): ParsedEdReply {
  const lines = text.split(/\r?\n/);

  const modeLine = lines.find((line) => line.toUpperCase().startsWith("[MODE]:"));
  const goalLine = lines.find((line) => line.toUpperCase().startsWith("[GOAL]:"));
  const boundariesLine = lines.find((line) =>
    line.toUpperCase().startsWith("[BOUNDARIES]:"),
  );

  const modeValue = modeLine?.split(":").slice(1).join(":").trim().toUpperCase();
  const mode = ["T", "F", "Q", "P", "B", "M"].includes(modeValue ?? "")
    ? normalizeMode(modeValue as ModeBlock)
    : null;

  const goal = goalLine?.split(":").slice(1).join(":").trim() || null;
  const boundaries =
    boundariesLine?.split(":").slice(1).join(":").trim() || null;

  const bodyStart = lines.findIndex((line) =>
    line.toUpperCase().startsWith("[BOUNDARIES]:"),
  );
  const body = bodyStart >= 0 ? lines.slice(bodyStart + 1).filter(Boolean) : [];

  return { mode, goal, boundaries, body };
}

export function validateEdReply(
  parsed: ParsedEdReply,
  options?: {
    expectedMode?: ModeBlock;
    noQuestions?: boolean;
  },
): EdContractValidation {
  const errors: string[] = [];

  if (!parsed.mode) errors.push("Missing or invalid [MODE]");
  if (!parsed.goal) errors.push("Missing [GOAL]");
  if (!parsed.boundaries) errors.push("Missing [BOUNDARIES]");

  if (options?.expectedMode) {
    const expected = normalizeMode(options.expectedMode);
    if (parsed.mode !== expected) {
      errors.push(`Expected mode ${expected}, received ${parsed.mode ?? "none"}`);
    }
  }

  const bodyText = parsed.body.join(" ");
  const hasQuestionMark = /\?/.test(bodyText);

  if (options?.noQuestions && hasQuestionMark) {
    errors.push("Reply includes questions while no-questions command is active");
  }

  if (parsed.mode === "Q") {
    const questionLines = parsed.body.filter((line) => /\?/.test(line));
    if (questionLines.length === 0) {
      errors.push("Q mode must include at least one question");
    }
    if (questionLines.length > 5) {
      errors.push("Q mode must include at most 5 questions");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function enforceEdReplyContract(params: {
  reply: string;
  expectedMode: ModeBlock;
  goal: string;
  boundaries: string;
  noQuestions: boolean;
}): string {
  const parsed = parseEdReply(params.reply);
  const validation = validateEdReply(parsed, {
    expectedMode: params.expectedMode,
    noQuestions: params.noQuestions,
  });

  if (validation.isValid) {
    return params.reply;
  }

  const safeMode = params.noQuestions && params.expectedMode === "Q" ? "T" : params.expectedMode;

  return [
    `[MODE]: ${safeMode}`,
    `[GOAL]: ${params.goal}`,
    `[BOUNDARIES]: ${params.boundaries}`,
    "- Response adjusted to preserve runtime contract.",
    "- Continue with focused, bounded guidance for the current page.",
  ].join("\n");
}

export function findLastAssistantMode(messages: ChatMessage[]): ModeBlock | null {
  const lastAssistant = [...messages].reverse().find((message) => message.role === "assistant");
  if (!lastAssistant) return null;
  return parseEdReply(lastAssistant.content).mode;
}