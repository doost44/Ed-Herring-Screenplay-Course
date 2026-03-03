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
      {
        id: "sensory-facts",
        prompt:
          "Pick a real place you can access — a room, a street corner, a stairwell. Sit there for 10 minutes and write down everything a camera would record: light direction, ambient sounds, textures, temperature cues, smells (translated into visual proxies — steam, condensation, dust). No emotions, no interpretations. Just sensory facts. Aim for 15–20 items.",
      },
      {
        id: "internal-tension",
        prompt:
          "Look at the list you made in Exercise 1. Find two items that pull against each other — warmth vs. emptiness, order vs. erosion, stillness vs. a distant vibration. Write a single sentence that captures that tension pair. Then ask: if I held a camera on the place where these two forces meet, what would the audience see? Describe that shot in 2–3 sentences.",
      },
      {
        id: "sensory-logic",
        prompt:
          "Choose the dominant sense for your film: light, sound, or motion. Now write 5 rules that govern how that sense behaves in your world. Example (light): 'Warm light means safety. Cold light means exposure. Shadows move independently of their sources. The brightest point in the frame is always the thing the character avoids. Light flickers before something changes.' These rules become your sensory grammar.",
      },
      {
        id: "uncanny-rule",
        prompt:
          "Invent one rule that is slightly off — a single departure from how the real world works. It must be visual (the camera can show it), consistent (it always works the same way), and unexplained (no character comments on it). Write the rule as a single declarative sentence. Then write 3 specific moments in the film where this rule is visible. The audience should accept the rule because you commit to it completely.",
      },
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
      {
        id: "behavior-mapping",
        prompt:
          "Think of a real person you've observed closely — a family member, a colleague, a stranger on a commute. List 5–7 surface behaviors: physical habits, routines, the way they hold objects, how they sit, how they enter a room. Then list 2 fracture behaviors: moments where the pattern broke — a sudden gesture, a pause that lasted too long, a routine interrupted. Write each behavior as a single observable action, not a feeling.",
      },
      {
        id: "object-relationship",
        prompt:
          "Choose one object your character has a visible relationship with. Not a prop — a relationship. Describe 5 specific moments across the film where the character interacts with this object differently: touches it gently, avoids it, hides it, returns to it, breaks it. Each interaction should be one sentence. The object should reveal something the camera can't otherwise show.",
      },
      {
        id: "spatial-behavior",
        prompt:
          "Draw or describe the primary space your character occupies (a room, a corridor, a yard). Now map how the character uses it: which areas they stay in, which they avoid, where they pause. What is the furthest point from the door and do they ever reach it? Is there furniture between them and an exit? Write a paragraph describing how the character's use of this space tells the audience about them without any dialogue.",
      },
      {
        id: "emotional-orbit",
        prompt:
          "Define an 'emotional orbit rule' — an invisible force that governs how close your character gets to other people, objects, or spaces. Example: 'She is always within arm's reach of a wall.' Example: 'He never faces another person directly — always at an angle.' Write your rule as one sentence, then describe 3 moments in the film where the audience can see this rule operating. What happens when the rule is broken?",
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
        prompt:
          "Map your film's tension using the 3-part model. Under ESTABLISH, describe the pattern: what repeats, how often, what the audience learns to expect. Under SUSTAIN, describe the pressure: what small detail shifts while the pattern continues? What should the audience feel without being able to name? Under FRACTURE, describe the break: what specific element fails, and what does the audience see in the moment it fails? Write each phase as 2–3 concrete sentences.",
      },
      {
        id: "spatial-escalation",
        prompt:
          "Design how the space itself changes across the film's repetitions. Start with the space in its 'normal' state and describe 3–4 progressive changes — the space slightly wrong, then more wrong, then unmistakably altered. These changes should be subtle enough that the audience might not consciously register the first one, but they should feel accumulated wrongness by the third. Each change must be visual and specific: an object that moves, a light that shifts, a door that is now open.",
      },
      {
        id: "repetition-pattern",
        prompt:
          "List 3–5 elements that repeat in your film: actions, sounds, visual framings, spatial positions, silences. For each one, describe: (a) what it is, (b) how many times it repeats, (c) the interval between repetitions (every scene? every other scene? at irregular intervals?), and (d) which repetition is the one where something is slightly different. This list is the rhythm engine of your film.",
      },
      {
        id: "pattern-break",
        prompt:
          "Write the exact moment the pattern fails. One concrete, filmable sentence: what the character does, what the camera sees, what sound is present or absent. This is the fracture — the single element that changes while everything else holds. Then write 2 sentences describing what the audience should feel in this moment and why the break works (i.e., what expectation it violates). The break must be visible, not explained.",
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
      {
        id: "beat-shapes",
        prompt:
          "For each scene in your scene list, draw or describe its emotional contour as a shape: rising (building pressure), falling (release or decay), flat (sustained stillness), or spiking (sudden jolt). Then arrange the shapes in sequence and look at the overall rhythm. Do you have three rising shapes in a row? That's exhausting. A flat followed by a spike? That's effective. Adjust the sequence until the rhythm feels like breathing — tension, release, tension, release, then a held breath.",
      },
      {
        id: "visual-motifs",
        prompt:
          "Identify one visual element that will recur in at least 3 scenes: a colour, an object, a type of light, a framing pattern, a gesture. For each appearance, describe: (a) how it looks in that scene, (b) whether anything about it has changed since the last appearance, and (c) what the accumulated effect should be. The motif should deepen in meaning through repetition without being explained.",
      },
      {
        id: "silence-vs-noise",
        prompt:
          "Create a sound chart for your film. For each scene, note: dominant sound (what the audience hears most), secondary sound (background layer), and silence pockets (moments of deliberate quiet). Then identify the sonic turning point — the moment where the dominant sound environment inverts (silence becomes noise, or noise becomes silence). Describe this turning point in 2–3 sentences: when it happens, what triggers it, and what the audience hears.",
      },
      {
        id: "scene-logic",
        prompt:
          "For each scene transition in your film, describe the sensory shift: what changes between one scene and the next? At least one dominant quality must shift — light temperature, sound level, spatial openness, motion speed, or frame density. Write each transition as a single sentence: 'From [Scene A quality] to [Scene B quality].' Example: 'From cramped warmth and clock ticking to open cold and total silence.' Avoid plot-based transitions like 'She decides to leave.'",
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
        prompt:
          "Before writing your script, write the beat-by-beat shape as single sentences — one sentence per beat. A beat is not a scene; it's a unit of change. 'The room is empty and still. A sound enters from outside. The character appears in the doorway but does not enter. The sound stops. The character steps in.' Aim for 15–25 beats. This is the skeleton your script hangs on. Do not describe emotions — describe what the audience sees and hears.",
      },
      {
        id: "blocking-notes",
        prompt:
          "For each scene, describe the blocking: where is the camera, where is the character's body, what is the spatial relationship between them? Is the camera static or moving? If moving, in what direction and at what speed? Where does the character start in the frame and where do they end? Is there an object between the character and the camera? Write each scene's blocking as 3–4 sentences. These notes are production instructions, not descriptions.",
      },
      {
        id: "location-limitations",
        prompt:
          "List every location in your script. For each one, write two columns: GIVES (what you get for free — natural light, ambient sound, built-in textures, existing furniture) and PREVENTS (what you cannot do — no power outlets, noise from traffic, limited shooting hours, can't rearrange furniture). Then review your scene list and adjust: does any scene require something the location prevents? Solve it now by rewriting the scene to use what the location gives instead.",
      },
      {
        id: "practical-sfx",
        prompt:
          "Create a sound production chart. List every significant sound in your film. For each one, categorise it as CAPTURE (must be recorded on set — footsteps, door creaks, ambient room tone, dialogue) or DESIGN (built in post — layered atmospheres, processed effects, music). For each capture sound, note what equipment you need and when in the shoot it gets recorded. For each design sound, note the source material and the effect you're aiming for. This chart is your sound department's bible.",
      },
    ],
  },
};
