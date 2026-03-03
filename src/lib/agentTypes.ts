export type ChatRole = "system" | "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
  createdAt?: string;
}

export interface WeekCompletionFlags {
  week1: boolean;
  week2: boolean;
  week3: boolean;
  week4: boolean;
  week5: boolean;
}

export interface ConstraintsSummary {
  locations?: string;
  props?: string;
  castAvailability?: string;
  sound?: string;
  lighting?: string;
  schedule?: string;
}

export interface AppState {
  currentSlug: string;
  analysisMode?: boolean;
  weekCompletion: WeekCompletionFlags;
  constraintsSummary: ConstraintsSummary;
}

export type ModeBlock = "T" | "F" | "Q" | "P" | "B" | "M";

export interface CommandFlags {
  coWriteRequested: boolean;
  storyFishingRequested: boolean;
  rewriteRequested: boolean;
  requestedMode: ModeBlock | null;
}
