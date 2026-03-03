import {
  parseEdReply,
  resolveModeTransition,
  validateEdReply,
} from "@/lib/edContracts";

function assert(condition: unknown, message: string) {
  if (!condition) {
    throw new Error(`edContracts test failed: ${message}`);
  }
}

export function runEdContractSelfTests() {
  const parsed = parseEdReply(
    [
      "[MODE]: Q",
      "[GOAL]: Clarify intent",
      "[BOUNDARIES]: Questions only",
      "- What is the target runtime?",
      "- Which part should be implemented first?",
    ].join("\n"),
  );

  assert(parsed.mode === "Q", "Parser should detect Q mode");
  assert(parsed.goal === "Clarify intent", "Parser should read goal");

  const valid = validateEdReply(parsed, {
    expectedMode: "Q",
    noQuestions: false,
  });
  assert(valid.isValid, "Q response with two questions should validate");

  const invalidNoQuestions = validateEdReply(parsed, {
    expectedMode: "Q",
    noQuestions: true,
  });
  assert(
    !invalidNoQuestions.isValid,
    "Question response should fail when no-questions command is active",
  );

  const transitioned = resolveModeTransition({
    previousMode: "Q",
    requestedMode: "M",
    noQuestions: false,
  });

  assert(transitioned === "T", "M should normalize and transition to T");

  return {
    passed: true,
  };
}
