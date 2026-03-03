export interface WeekExercise {
  id: string;
  prompt: string;
}

export interface WeekTemplate {
  weekNumber: number;
  decisionsFields: string[];
  deliverablesItems: string[];
  exercises: WeekExercise[];
}

export const weekTemplates: Record<number, WeekTemplate> = {
  1: {
    weekNumber: 1,
    decisionsFields: [
      "Central image",
      "Internal tension",
      "Sensory logic (light / sound / motion)",
      "Uncanny rule",
    ],
    deliverablesItems: [
      "Anchor frame description",
      "One tension pair",
      "Sensory grammar",
      "One repeatable rule",
    ],
    exercises: [
      { id: "sensory-facts", prompt: "Exercise 1 — Sensory Facts" },
      { id: "internal-tension", prompt: "Exercise 2 — Internal Tension" },
      { id: "sensory-logic", prompt: "Exercise 3 — Sensory Logic" },
      { id: "uncanny-rule", prompt: "Exercise 4 — Uncanny Rule" },
    ],
  },
  2: {
    weekNumber: 2,
    decisionsFields: [
      "Core behavior pattern",
      "Character container (body-in-space)",
      "Interaction with uncanny (rule contact points)",
    ],
    deliverablesItems: [
      "Surface behaviors (5–7)",
      "Fracture behaviors (2)",
      "Silence / avoidance behaviors (3)",
      "One object relationship",
    ],
    exercises: [
      { id: "behavior-mapping", prompt: "Exercise 1 — Behavior Mapping" },
      {
        id: "object-relationship",
        prompt: "Exercise 2 — Object Relationship",
      },
      { id: "spatial-behavior", prompt: "Exercise 3 — Spatial Behavior" },
      {
        id: "emotional-orbit",
        prompt: "Exercise 4 — Emotional Orbit Rule",
      },
    ],
  },
  3: {
    weekNumber: 3,
    decisionsFields: [
      "Tension architecture",
      "Key repetitions",
      "What shifts (rule escalation / perception shift)",
    ],
    deliverablesItems: [
      "3-part tension plan",
      "Repetition list (3–5)",
      "One defined break (how pattern fails or changes)",
    ],
    exercises: [
      {
        id: "tension-curve",
        prompt: "Exercise 1 — 3-Part Tension Curve",
      },
      {
        id: "spatial-escalation",
        prompt: "Exercise 2 — Spatial Escalation",
      },
      {
        id: "repetition-pattern",
        prompt: "Exercise 3 — Repetition Pattern",
      },
      {
        id: "pattern-break",
        prompt: "Exercise 4 — Breaking The Pattern",
      },
    ],
  },
  4: {
    weekNumber: 4,
    decisionsFields: [
      "Scene list (titles only)",
      "Atmosphere notes per scene",
      "Shot logic / blocking notes",
    ],
    deliverablesItems: [
      "Scene list (5–10 scenes)",
      "One motif plan (visual / sound)",
      "Silence / noise plan (where it turns)",
    ],
    exercises: [
      { id: "beat-shapes", prompt: "Exercise 1 — Beat Shapes" },
      { id: "visual-motifs", prompt: "Exercise 2 — Visual Motifs" },
      {
        id: "silence-vs-noise",
        prompt: "Exercise 3 — Silence vs Noise Use",
      },
      {
        id: "scene-logic",
        prompt: "Exercise 4 — Scene-to-Scene Logic",
      },
    ],
  },
  5: {
    weekNumber: 5,
    decisionsFields: [
      "Script goals",
      "Production-ready constraints",
      "Non-negotiables",
    ],
    deliverablesItems: [
      "Draft v1 (5–15 pages)",
      "Blocking notes per scene",
      "Production feasibility checklist",
      "Sound plan (capture + design)",
    ],
    exercises: [
      {
        id: "first-draft-beats",
        prompt: "Exercise 1 — First Draft Beats",
      },
      { id: "blocking-notes", prompt: "Exercise 2 — Blocking Notes" },
      {
        id: "location-limitations",
        prompt: "Exercise 3 — Location Limitations",
      },
      {
        id: "practical-sfx",
        prompt: "Exercise 4 — Practical SFX Planning",
      },
    ],
  },
};
