import type { ModeBlock } from "@/lib/agentTypes";

export interface SafetyResult {
  shouldRefuse: boolean;
  reason?: string;
}

const SEXUAL_PATTERN =
  /\b(explicit sex|sexual acts?|porn|erotic|nsfw|nude|incest|minor\s*sex|underage\s*sex)\b/i;

const HARM_ILLEGAL_PATTERN =
  /\b(make\s+a\s+bomb|build\s+a\s+weapon|buy\s+illegal\s+drugs|how\s+to\s+kill|murder\s+someone|bypass\s+security|hack\s+into|steal\s+identity|fraud\s+instructions?)\b/i;

export function checkSafety(text: string): SafetyResult {
  const input = text.trim();
  if (!input) return { shouldRefuse: false };

  if (SEXUAL_PATTERN.test(input)) {
    return {
      shouldRefuse: true,
      reason: "sexual content request",
    };
  }

  if (HARM_ILLEGAL_PATTERN.test(input)) {
    return {
      shouldRefuse: true,
      reason: "harmful or illegal instruction request",
    };
  }

  return { shouldRefuse: false };
}

export function buildEdRefusal(params: {
  goal: string;
  reason: string;
}): string {
  const mode: ModeBlock = "B";
  return [
    `[MODE]: ${mode}`,
    `[GOAL]: ${params.goal}`,
    "[BOUNDARIES]: Refusal for unsafe scope; no harmful/illegal/sexual instruction assistance",
    `- I can't help with that request (${params.reason}).`,
    "- I can help with safe, process-focused alternatives inside this course workflow.",
  ].join("\n");
}
