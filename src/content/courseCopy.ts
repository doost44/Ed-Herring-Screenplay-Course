/* ------------------------------------------------------------------ */
/*  courseCopy.ts – Generic (non-story) copy for every page           */
/*  Structure-only: no film-specific content.                         */
/* ------------------------------------------------------------------ */

export type BlockKind =
  | "paragraph"
  | "heading"
  | "bullets"
  | "checklist"
  | "template-fields";

export interface ContentBlock {
  kind: BlockKind;
  text?: string; // paragraph / heading text
  items?: string[]; // bullet or checklist items
  fields?: string[]; // template field labels
}

export interface PageCopy {
  intro: string;
  blocks: ContentBlock[];
}

/* ------------------------------------------------------------------ */
/*  Helper                                                            */
/* ------------------------------------------------------------------ */

function weekIntro(n: number): string {
  return `Overview of goals, themes, and tasks for Week ${n}.  Use the sub-pages to access lecture notes, exercises, decisions, deliverables, and personal notes.`;
}

/* ------------------------------------------------------------------ */
/*  Copy keyed by route href                                          */
/* ------------------------------------------------------------------ */

export const pageCopy: Record<string, PageCopy> = {
  /* ---- Master Index ---- */
  "/master-index": {
    intro:
      "Welcome to Mirror Mentor — Short Film Lab. This workspace organises every stage of your short film development: weekly coursework, script analysis, visual references, and archived conversations.",
    blocks: [
      {
        kind: "heading",
        text: "Quick Links",
      },
      {
        kind: "bullets",
        items: [
          "Infrastructure — project constraints, revision log, milestones",
          "Week 1 — Start Here",
          "Script Lab — screenplay analysis workspace",
          "Reference Board — visual and audio references",
          "Archive — historical conversation logs",
          "Settings — preferences and configuration",
        ],
      },
    ],
  },

  /* ---- Infrastructure ---- */
  "/infrastructure": {
    intro:
      "Central hub for project constraints, revision history, and milestone tracking.",
    blocks: [
      {
        kind: "paragraph",
        text: "Use the sub-pages to manage constraints, the revision log, and milestones.",
      },
    ],
  },
  "/infrastructure/constraints": {
    intro:
      "Document project constraints such as budget, time, equipment, locations, and crew availability.",
    blocks: [
      { kind: "heading", text: "Constraint Categories" },
      {
        kind: "checklist",
        items: [
          "Budget ceiling",
          "Shooting days available",
          "Equipment on hand",
          "Location access / permits",
          "Crew & cast availability",
          "Post-production timeline",
        ],
      },
    ],
  },
  "/infrastructure/revision-log": {
    intro: "Track every major revision to your screenplay and project plan.",
    blocks: [
      { kind: "heading", text: "Revision Entry Template" },
      {
        kind: "template-fields",
        fields: [
          "Date",
          "Version",
          "Summary of changes",
          "Reason for revision",
        ],
      },
    ],
  },
  "/infrastructure/milestones": {
    intro:
      "Define and track key project milestones from concept to final draft.",
    blocks: [
      { kind: "heading", text: "Milestone Checklist" },
      {
        kind: "checklist",
        items: [
          "Concept / logline locked",
          "Treatment complete",
          "First draft complete",
          "Table read complete",
          "Revision pass complete",
          "Shooting script locked",
        ],
      },
    ],
  },

  /* ---- Script Lab ---- */
  "/script-lab": {
    intro:
      "Your workspace for screenplay analysis, annotation, and technique mastery.",
    blocks: [
      {
        kind: "paragraph",
        text: "Use the sub-pages to manage uploads, templates, analysis sessions, and learned techniques.",
      },
    ],
  },
  "/script-lab/index": {
    intro:
      "Master index of all scripts uploaded and analysed in the Script Lab.",
    blocks: [
      { kind: "heading", text: "Script Register" },
      {
        kind: "template-fields",
        fields: ["Title", "Author", "Date uploaded", "Status", "Notes"],
      },
    ],
  },
  "/script-lab/upload-log": {
    intro: "Log of uploaded screenplays with dates, sources, and notes.",
    blocks: [
      { kind: "heading", text: "Upload Entry" },
      {
        kind: "template-fields",
        fields: ["Filename", "Source", "Date", "Comments"],
      },
    ],
  },
  "/script-lab/templates": {
    intro: "Annotation and analysis templates for structured screenplay study.",
    blocks: [
      { kind: "heading", text: "Available Templates" },
      {
        kind: "bullets",
        items: [
          "Scene-by-scene breakdown",
          "Character arc tracker",
          "Dialogue analysis grid",
          "Theme & motif map",
          "Structure overlay (3-act / sequence)",
        ],
      },
    ],
  },
  "/script-lab/sessions": {
    intro:
      "Detailed records of analysis sessions — what you studied, discovered, and noted.",
    blocks: [
      { kind: "heading", text: "Session Entry Template" },
      {
        kind: "template-fields",
        fields: [
          "Date",
          "Script analysed",
          "Focus area",
          "Key findings",
          "Follow-up tasks",
        ],
      },
    ],
  },
  "/script-lab/techniques": {
    intro:
      "Catalogue of screenwriting techniques learned through analysis and coursework.",
    blocks: [
      { kind: "heading", text: "Technique Card Template" },
      {
        kind: "template-fields",
        fields: [
          "Technique name",
          "Source / origin",
          "Description",
          "Example",
          "When to use",
        ],
      },
    ],
  },

  /* ---- Reference Board ---- */
  "/reference-board": {
    intro:
      "Visual and auditory references for your short film — mood, texture, colour, location, and sound.",
    blocks: [
      {
        kind: "paragraph",
        text: "Browse the sub-pages to curate your reference library.",
      },
    ],
  },
  "/reference-board/visual-moodboard": {
    intro:
      "Collect images, stills, and visual inspiration for tone and aesthetic.",
    blocks: [
      { kind: "heading", text: "Moodboard Sections" },
      {
        kind: "bullets",
        items: [
          "Tone / atmosphere",
          "Lighting",
          "Framing",
          "Colour grading",
          "Costume & props",
        ],
      },
    ],
  },
  "/reference-board/textures": {
    intro: "Texture samples and material references for production design.",
    blocks: [
      { kind: "heading", text: "Categories" },
      {
        kind: "bullets",
        items: [
          "Surfaces",
          "Fabrics",
          "Natural elements",
          "Urban / industrial",
        ],
      },
    ],
  },
  "/reference-board/locations": {
    intro:
      "Location scouting references — photos, maps, and notes on potential shooting sites.",
    blocks: [
      { kind: "heading", text: "Location Entry Template" },
      {
        kind: "template-fields",
        fields: [
          "Name",
          "Address / description",
          "Permit required?",
          "Photos",
          "Notes",
        ],
      },
    ],
  },
  "/reference-board/palettes": {
    intro:
      "Colour palettes and grading references for your film's visual identity.",
    blocks: [
      { kind: "heading", text: "Palette Workspace" },
      {
        kind: "paragraph",
        text: "Add colour swatches, hex codes, and reference stills here.",
      },
    ],
  },
  "/reference-board/shot-refs": {
    intro: "Shot composition, framing, and cinematography references.",
    blocks: [
      { kind: "heading", text: "Shot Reference Categories" },
      {
        kind: "bullets",
        items: [
          "Wide / establishing",
          "Close-up",
          "POV / subjective",
          "Tracking / movement",
          "Static / tableau",
        ],
      },
    ],
  },
  "/reference-board/influence-map": {
    intro:
      "Map of films, directors, and artists that influence your project's creative direction.",
    blocks: [
      { kind: "heading", text: "Influence Entry Template" },
      {
        kind: "template-fields",
        fields: ["Name", "Medium", "What to borrow", "Relevance to project"],
      },
    ],
  },
  "/reference-board/sound-refs": {
    intro: "Sound design, music, and audio atmosphere references.",
    blocks: [
      { kind: "heading", text: "Sound Categories" },
      {
        kind: "bullets",
        items: [
          "Ambient / atmos",
          "Foley",
          "Score / soundtrack",
          "Dialogue treatment",
          "Silence / negative space",
        ],
      },
    ],
  },

  /* ---- Archive ---- */
  "/archive": {
    intro:
      "Archived chat imports and historical conversation logs organised by week.",
    blocks: [],
  },

  /* ---- Settings ---- */
  "/settings": {
    intro: "Application preferences, theme options, and configuration.",
    blocks: [
      { kind: "heading", text: "Preferences" },
      {
        kind: "checklist",
        items: [
          "Theme (dark / light)",
          "Font size",
          "Sidebar default state",
          "Chat panel default state",
        ],
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Week page copy (generated per-week)                               */
/* ------------------------------------------------------------------ */

/* ================================================================== */
/*  Week overview + notes + archive (shared pattern)                  */
/* ================================================================== */
for (let n = 1; n <= 5; n++) {
  pageCopy[`/week/${n}`] = {
    intro: weekIntro(n),
    blocks: [
      {
        kind: "bullets",
        items: [
          "Lecture — key concepts and takeaways",
          "Exercises — practice prompts",
          "Decisions — creative and structural choices",
          "Deliverables — submission checklist",
          "Notes — personal reflections",
        ],
      },
    ],
  };

  pageCopy[`/week/${n}/notes`] = {
    intro: `Personal notes and reflections for Week ${n}.`,
    blocks: [
      { kind: "heading", text: "Notes" },
      {
        kind: "paragraph",
        text: "Add your personal reflections, questions, and observations here.",
      },
    ],
  };

  pageCopy[`/archive/week-${n}`] = {
    intro: `Archived chat imports and conversation logs from Week ${n}.`,
    blocks: [],
  };
}

/* ================================================================== */
/*  WEEK 1 — Concept & Sensory Foundation                             */
/* ================================================================== */

pageCopy["/week/1/lecture"] = {
  intro:
    "Week 1 is about seeing before storytelling. A short film begins with what the camera can observe — light, sound, texture, motion — not with a plot summary. Your job this week is to find a single image that contains unresolved tension, and build a sensory world around it.",
  blocks: [
    {
      kind: "heading",
      text: "Core Principle: The Camera Observes, It Doesn't Narrate",
    },
    {
      kind: "paragraph",
      text: "Forget character backstories. Forget three-act structure. A short film under 15 minutes has no room for exposition. Instead, it works like a photograph that moves: the audience reads what they see and hear, and they construct meaning from that evidence. Your first task is to think like a camera.",
    },
    {
      kind: "heading",
      text: "Finding Your Central Image",
    },
    {
      kind: "bullets",
      items: [
        "Start with a single concrete image, not a story idea — a dripping tap in an empty kitchen, a figure standing motionless at a bus stop at 3am, a child's shoe on a staircase",
        "The image should have inherent tension: something unresolved, incomplete, or slightly wrong",
        "You do not need to know what it 'means' yet — meaning is the audience's job",
        "Ask: if I held a camera on this image for 60 seconds, would it hold attention? If not, the tension is missing",
      ],
    },
    {
      kind: "heading",
      text: "Internal Tension",
    },
    {
      kind: "paragraph",
      text: "Every strong short film image contains a tension pair — two forces that pull against each other within the same frame. This is not conflict between characters. It is conflict inside the image itself: stillness vs. urgency, order vs. decay, warmth vs. absence. Identify one tension pair that lives inside your central image.",
    },
    {
      kind: "bullets",
      items: [
        "Stillness vs. urgency — a kettle boiling in an empty room",
        "Order vs. decay — a perfectly made bed in a crumbling house",
        "Warmth vs. absence — a single lit candle on a table set for two",
        "Familiarity vs. strangeness — a routine gesture performed in the wrong context",
      ],
    },
    {
      kind: "heading",
      text: "Sensory Logic",
    },
    {
      kind: "paragraph",
      text: "Every frame in your film has a dominant sense — what the audience feels most strongly in that moment. Sensory logic is the grammar of your film: how light, sound, and motion work together to create a consistent world. Define your sensory grammar early: is your film governed by light (what's visible vs. hidden), by sound (what's heard vs. silent), or by motion (what moves vs. what's still)?",
    },
    {
      kind: "bullets",
      items: [
        "Light-governed: the story lives in what is illuminated vs. what is in shadow",
        "Sound-governed: the story lives in what the audience hears vs. what is conspicuously silent",
        "Motion-governed: the story lives in what moves vs. what remains fixed",
        "Pick one dominant sense — you can layer the others, but one sense should rule",
      ],
    },
    {
      kind: "heading",
      text: "The Uncanny Rule",
    },
    {
      kind: "paragraph",
      text: "Every short film needs one rule that is slightly off — a single departure from normality that the audience accepts because the film commits to it completely. This is not a twist; it is a ground rule. Examples: gravity works differently in one room; a character can only move when unobserved; every clock in the house shows a different time. The rule should be visual, observable, and consistent.",
    },
    {
      kind: "heading",
      text: "Key Takeaways",
    },
    {
      kind: "checklist",
      items: [
        "Start with observation, not narration — think like a camera",
        "Find one central image with inherent tension",
        "Identify the tension pair inside that image",
        "Define your sensory grammar (light / sound / motion)",
        "Establish one uncanny rule the film commits to fully",
        "Do not plan endings, arcs, or themes yet — those come later",
      ],
    },
  ],
};

pageCopy["/week/1/exercises"] = {
  intro:
    "These exercises build your observation skills and force you to think in images, not stories. Complete them in order — each one feeds into the next.",
  blocks: [
    { kind: "heading", text: "Exercise List" },
    {
      kind: "checklist",
      items: [
        "Sensory Facts — catalogue what a camera would record",
        "Internal Tension — find the opposing forces inside an image",
        "Sensory Logic — define the dominant sense governing your film",
        "Uncanny Rule — invent one consistent departure from normality",
      ],
    },
  ],
};

pageCopy["/week/1/decisions"] = {
  intro:
    "This week's decisions lock your foundation. You are choosing what the camera will see, not what the story means.",
  blocks: [
    { kind: "heading", text: "Decision Fields" },
    {
      kind: "template-fields",
      fields: [
        "Central image — one concrete image with inherent tension",
        "Internal tension — the pair of opposing forces inside that image",
        "Sensory logic — dominant sense (light / sound / motion) and grammar",
        "Uncanny rule — one consistent departure from normality",
      ],
    },
  ],
};

pageCopy["/week/1/deliverables"] = {
  intro:
    "By end of Week 1, you should have these four artifacts completed. Each one is a single, specific statement — not a paragraph.",
  blocks: [
    { kind: "heading", text: "Deliverables Checklist" },
    {
      kind: "checklist",
      items: [
        "Anchor frame description — one sentence describing the single most important image in your film",
        "One tension pair — the two forces pulling against each other inside that image",
        "Sensory grammar — which sense dominates and how it operates",
        "One repeatable rule — the uncanny rule stated as a clear, observable behavior",
      ],
    },
  ],
};

/* ================================================================== */
/*  WEEK 2 — Character as Behavior                                    */
/* ================================================================== */

pageCopy["/week/2/lecture"] = {
  intro:
    "Week 2 is about character — but not in the way you've been taught. In a short film, a character is not a biography. A character is a body in space doing observable things. The camera cannot see psychology. It can only see behavior.",
  blocks: [
    {
      kind: "heading",
      text: "Core Principle: Character Is What the Camera Can Record",
    },
    {
      kind: "paragraph",
      text: "Forget backstory. Forget motivation charts. Forget 'wants and wounds.' In a short film, you have no time for any of that. What you have is a person doing things in a space. The audience will infer everything else. Your job is to design those observable behaviors — what the character does with their hands, how they move through a room, what they avoid, what they repeat.",
    },
    {
      kind: "heading",
      text: "Surface Behaviors",
    },
    {
      kind: "paragraph",
      text: "Surface behaviors are the observable routines your character performs when things are normal. These are habits, patterns, rituals — things the audience reads as 'this is how this person operates.' You need 5–7 surface behaviors. Not personality traits. Behaviors. Things a camera can record.",
    },
    {
      kind: "bullets",
      items: [
        "How do they enter a room? (fast / slow / sideways / checking first)",
        "What do they do with their hands when unoccupied?",
        "How do they sit? Stand? Wait?",
        "What small ritual do they perform repeatedly?",
        "Do they touch objects? Avoid objects? Rearrange objects?",
        "How do they react to sound? To silence?",
        "What is their posture's default state?",
      ],
    },
    {
      kind: "heading",
      text: "Fracture Behaviors",
    },
    {
      kind: "paragraph",
      text: "Fracture behaviors are what happens when the surface cracks — when the routine breaks or the character encounters something that disrupts their pattern. You need exactly 2 fracture behaviors. These are the moments where the audience leans in because something changed.",
    },
    {
      kind: "bullets",
      items: [
        "A fracture behavior is a visible departure from the surface pattern",
        "It is not an emotion — it is a change in physical behavior",
        "Example: a character who always folds napkins symmetrically suddenly crumples one",
        "Example: a character who never looks at the door suddenly cannot stop looking at it",
      ],
    },
    {
      kind: "heading",
      text: "Silence & Avoidance Behaviors",
    },
    {
      kind: "paragraph",
      text: "What your character avoids tells the audience as much as what they do. Define 3 avoidance behaviors — things the character actively does not do, places they do not go, objects they do not touch, sounds they do not acknowledge. Silence is behavior.",
    },
    {
      kind: "heading",
      text: "The Object Relationship",
    },
    {
      kind: "paragraph",
      text: "Every short film character needs one object they have a visible relationship with. Not a prop — a relationship. The character touches it, avoids it, arranges it, hides it, returns to it. This object becomes a proxy for the internal state the camera cannot see. Choose one object and define the relationship precisely.",
    },
    {
      kind: "heading",
      text: "Character Container: Body in Space",
    },
    {
      kind: "paragraph",
      text: "Your character does not exist in a vacuum. They exist in a specific space with specific boundaries. The 'character container' is where the character's body and the space interact. How much of the room do they use? Do they stay in one corner? Do they pace? Is there a piece of furniture between them and the door? Space is character.",
    },
    {
      kind: "heading",
      text: "Key Takeaways",
    },
    {
      kind: "checklist",
      items: [
        "Character = observable behavior, not biography",
        "Define 5–7 surface behaviors (routines, habits, physical patterns)",
        "Define exactly 2 fracture behaviors (visible cracks in the pattern)",
        "Define 3 silence / avoidance behaviors (what the character does not do)",
        "Choose one object the character has a visible relationship with",
        "Map the character container — how the body uses the space",
        "Do not write backstory — the camera cannot see it",
      ],
    },
  ],
};

pageCopy["/week/2/exercises"] = {
  intro:
    "These exercises force you to observe human behavior as a camera would — through action, space, and objects, not through internal states.",
  blocks: [
    { kind: "heading", text: "Exercise List" },
    {
      kind: "checklist",
      items: [
        "Behavior Mapping — catalogue surface and fracture behaviors",
        "Object Relationship — define the character's relationship to one object",
        "Spatial Behavior — map how the character uses the room",
        "Emotional Orbit Rule — define the invisible force that governs proximity and distance",
      ],
    },
  ],
};

pageCopy["/week/2/decisions"] = {
  intro:
    "This week you decide how your character occupies space and interacts with the world the camera can see.",
  blocks: [
    { kind: "heading", text: "Decision Fields" },
    {
      kind: "template-fields",
      fields: [
        "Core behavior pattern — the dominant physical habit or routine",
        "Character container — how the body occupies and uses the space",
        "Interaction with uncanny — how the character physically responds to the rule from Week 1",
      ],
    },
  ],
};

pageCopy["/week/2/deliverables"] = {
  intro:
    "By end of Week 2, you should have a complete behavioral profile — not a character biography.",
  blocks: [
    { kind: "heading", text: "Deliverables Checklist" },
    {
      kind: "checklist",
      items: [
        "Surface behaviors (5–7) — observable routines and habits",
        "Fracture behaviors (2) — visible pattern breaks",
        "Silence / avoidance behaviors (3) — what the character does not do",
        "One object relationship — the object and how the character interacts with it",
      ],
    },
  ],
};

/* ================================================================== */
/*  WEEK 3 — Tension Architecture                                     */
/* ================================================================== */

pageCopy["/week/3/lecture"] = {
  intro:
    "Week 3 is about building tension — not through plot twists or reveals, but through repetition, rhythm, and controlled breakage. In a short film, tension is what you build by doing nearly the same thing multiple times until one detail shifts.",
  blocks: [
    {
      kind: "heading",
      text: "Core Principle: Tension Is Rhythm, Not Surprise",
    },
    {
      kind: "paragraph",
      text: "Forget twists. A short film under 15 minutes cannot earn a twist — there is no time to establish the expectation that makes a twist meaningful. What a short film can do is establish a pattern so precisely that the audience feels it in their body, and then break exactly one element of that pattern. That is tension.",
    },
    {
      kind: "heading",
      text: "The 3-Part Tension Model",
    },
    {
      kind: "paragraph",
      text: "Short film tension works in three phases. This is not a three-act structure — it is a rhythm structure.",
    },
    {
      kind: "bullets",
      items: [
        "ESTABLISH — show the pattern. The audience learns what 'normal' looks like. Repeat it at least twice so the rhythm is felt, not just understood",
        "SUSTAIN — hold the pattern under pressure. Something small changes (timing, framing, a sound), but the pattern itself continues. The audience feels that something is wrong but cannot name it",
        "FRACTURE — break one specific element. Not everything falls apart. One precise thing changes, and the pattern can no longer hold. The break should be visible, audible, or spatial — not explained",
      ],
    },
    {
      kind: "heading",
      text: "Key Repetitions",
    },
    {
      kind: "paragraph",
      text: "Repetition is the engine of short film tension. You need 3–5 repeating elements — actions, sounds, visual motifs, spatial patterns — that recur throughout the film. Each repetition trains the audience to expect the pattern. When you finally alter one, they feel it physically.",
    },
    {
      kind: "bullets",
      items: [
        "A sound that recurs at a regular interval (dripping tap, ticking clock, a door opening)",
        "A physical action the character performs each time they enter a space",
        "A visual framing that repeats (same angle, same composition) until it doesn't",
        "A spatial relationship that holds steady (character always on the left) until it reverses",
        "A silence that lives in the same place in each cycle",
      ],
    },
    {
      kind: "heading",
      text: "What Shifts — Rule Escalation vs. Perception Shift",
    },
    {
      kind: "paragraph",
      text: "When the tension breaks, it can break in two ways. Rule escalation: the uncanny rule from Week 1 intensifies — it happens faster, louder, closer, more visibly. Perception shift: the audience suddenly sees the same pattern differently because one new piece of information recontextualises everything. Choose one. Not both.",
    },
    {
      kind: "heading",
      text: "The Defined Break",
    },
    {
      kind: "paragraph",
      text: "You must define exactly how the pattern fails or changes. This is not 'and then things get weird.' It is: 'the character always straightens the picture frame; in the final cycle, the frame will not stay straight.' One concrete, filmable break. Write it as a single sentence.",
    },
    {
      kind: "heading",
      text: "Key Takeaways",
    },
    {
      kind: "checklist",
      items: [
        "Tension = repetition + controlled breakage, not plot twists",
        "Use the 3-part model: Establish → Sustain → Fracture",
        "Define 3–5 repeating elements (sound, action, visual, spatial, silence)",
        "Choose one break type: rule escalation or perception shift",
        "Write the defined break as one concrete, filmable sentence",
        "The audience should feel the break, not have it explained to them",
      ],
    },
  ],
};

pageCopy["/week/3/exercises"] = {
  intro:
    "These exercises train you to build and break patterns. Work through them in order — the tension plan at the end depends on the earlier exercises.",
  blocks: [
    { kind: "heading", text: "Exercise List" },
    {
      kind: "checklist",
      items: [
        "3-Part Tension Curve — map the establish / sustain / fracture phases",
        "Spatial Escalation — design how the space itself changes across repetitions",
        "Repetition Pattern — list your repeating elements and their cycle timing",
        "Breaking The Pattern — write the exact moment the pattern fails",
      ],
    },
  ],
};

pageCopy["/week/3/decisions"] = {
  intro:
    "This week you design the architecture of tension — the rhythm engine that drives the entire film.",
  blocks: [
    { kind: "heading", text: "Decision Fields" },
    {
      kind: "template-fields",
      fields: [
        "Tension architecture — the 3-part structure (establish / sustain / fracture)",
        "Key repetitions — the 3–5 elements that recur and train the audience",
        "What shifts — rule escalation or perception shift, and the specific break",
      ],
    },
  ],
};

pageCopy["/week/3/deliverables"] = {
  intro:
    "By end of Week 3, you should have a complete tension blueprint — the rhythm structure your film runs on.",
  blocks: [
    { kind: "heading", text: "Deliverables Checklist" },
    {
      kind: "checklist",
      items: [
        "3-part tension plan — establish / sustain / fracture described concretely",
        "Repetition list (3–5) — what repeats, how often, and in what form",
        "One defined break — exactly how the pattern fails, in one filmable sentence",
      ],
    },
  ],
};

/* ================================================================== */
/*  WEEK 4 — Scene Logic & Atmosphere                                  */
/* ================================================================== */

pageCopy["/week/4/lecture"] = {
  intro:
    "Week 4 is about building scenes — but scenes are not plot containers. A scene in a short film is an atmosphere unit. Each scene has a dominant sensory quality, and transitions between scenes are shifts in that quality.",
  blocks: [
    {
      kind: "heading",
      text: "Core Principle: Scenes Are Atmosphere, Not Plot Delivery",
    },
    {
      kind: "paragraph",
      text: "In feature writing, scenes exist to deliver story information: a character learns something, a conflict escalates, a decision is made. In a short film, scenes exist to create and shift atmosphere. A scene should be defined not by what happens in it, but by what it feels like — and how that feeling differs from the scene before and after.",
    },
    {
      kind: "heading",
      text: "Building a Scene List",
    },
    {
      kind: "paragraph",
      text: "Your film needs 5–10 scenes. Each scene should be described by a title (not a plot summary) and an atmosphere note. The title names the container; the atmosphere note describes what the audience feels.",
    },
    {
      kind: "bullets",
      items: [
        "Title format: location + dominant quality — e.g. 'Kitchen — dripping stillness', 'Stairwell — held breath'",
        "Atmosphere note: one sentence describing the sensory state — what the audience sees, hears, and feels",
        "No plot descriptions — 'character discovers the letter' is plot, not atmosphere",
        "Instead: 'the room is too quiet and the light has shifted since we were last here'",
      ],
    },
    {
      kind: "heading",
      text: "Scene-to-Scene Logic",
    },
    {
      kind: "paragraph",
      text: "Transitions between scenes should be sensory shifts, not story beats. Each transition should change at least one dominant sensory quality: the light changes, the sound changes, the space opens or closes, motion accelerates or stops. The audience should feel the shift without needing dialogue or exposition to explain it.",
    },
    {
      kind: "bullets",
      items: [
        "From warm light to cold light",
        "From ambient noise to sharp silence",
        "From constricted space to open space (or the reverse)",
        "From slow motion to sudden speed",
        "From occupied frame to empty frame",
      ],
    },
    {
      kind: "heading",
      text: "Visual and Sound Motifs",
    },
    {
      kind: "paragraph",
      text: "A motif is a repeating sensory element that threads through multiple scenes and accumulates meaning through repetition. You need at least one planned motif — visual or auditory — that appears in at least three scenes. The motif connects scenes without exposition. It works like a recurring melody in music: each appearance deepens the feeling.",
    },
    {
      kind: "heading",
      text: "The Silence / Noise Plan",
    },
    {
      kind: "paragraph",
      text: "Sound design starts in the script, not in post-production. Your silence/noise plan defines where the film is quiet and where it is loud, and — critically — where the turn happens. Every short film has a sonic turning point: the moment where the dominant sound environment inverts. Silence becomes noise, or noise becomes silence. Plan this now.",
    },
    {
      kind: "heading",
      text: "Shot Logic and Blocking",
    },
    {
      kind: "paragraph",
      text: "Shot logic is not storyboarding. It is the set of spatial rules that govern how the camera behaves in each scene. Does the camera stay on one side of the room? Does it move with the character or hold still? Does the framing tighten as tension increases? Blocking notes describe how bodies and objects are arranged in the frame. Together, shot logic and blocking are the physical grammar of each scene.",
    },
    {
      kind: "heading",
      text: "Key Takeaways",
    },
    {
      kind: "checklist",
      items: [
        "Scenes are atmosphere units, not plot containers",
        "Build a scene list with titles and atmosphere notes, not plot descriptions",
        "Design scene-to-scene transitions as sensory shifts",
        "Plan at least one motif (visual or sound) that appears in 3+ scenes",
        "Define the silence/noise turning point explicitly",
        "Write shot logic and blocking notes for each scene",
        "No scene should exist solely to deliver information",
      ],
    },
  ],
};

pageCopy["/week/4/exercises"] = {
  intro:
    "These exercises build your scene-level craft — atmosphere design, motif placement, and the sound/silence architecture of your film.",
  blocks: [
    { kind: "heading", text: "Exercise List" },
    {
      kind: "checklist",
      items: [
        "Beat Shapes — map the emotional contour of each scene as a shape (rising, falling, flat, spiking)",
        "Visual Motifs — identify your recurring visual element and place it across 3+ scenes",
        "Silence vs Noise Use — chart the sonic landscape and pinpoint the turning moment",
        "Scene-to-Scene Logic — describe each transition as a sensory shift",
      ],
    },
  ],
};

pageCopy["/week/4/decisions"] = {
  intro:
    "This week you build the scene structure — not a plot outline, but an atmosphere map of your entire film.",
  blocks: [
    { kind: "heading", text: "Decision Fields" },
    {
      kind: "template-fields",
      fields: [
        "Scene list — titles and atmosphere notes for each scene",
        "Atmosphere notes per scene — dominant sensory quality for each",
        "Shot logic / blocking notes — camera rules and spatial arrangement",
      ],
    },
  ],
};

pageCopy["/week/4/deliverables"] = {
  intro:
    "By end of Week 4, you should have a complete atmospheric scene map — the structural scaffold your script hangs on.",
  blocks: [
    { kind: "heading", text: "Deliverables Checklist" },
    {
      kind: "checklist",
      items: [
        "Scene list (5–10 scenes) — each with a title and atmosphere note",
        "One motif plan — the visual or sound element threaded through 3+ scenes",
        "Silence / noise plan — where the turn happens and why it matters",
      ],
    },
  ],
};

/* ================================================================== */
/*  WEEK 5 — Script Draft & Production Feasibility                     */
/* ================================================================== */

pageCopy["/week/5/lecture"] = {
  intro:
    "Week 5 is where everything becomes a production document. The script is not a literary artifact — it is a blueprint for a shoot. Every line should be filmable with the resources you actually have.",
  blocks: [
    {
      kind: "heading",
      text: "Core Principle: The Script Is a Production Blueprint",
    },
    {
      kind: "paragraph",
      text: "A screenplay for a short film is not trying to impress a reader. It is trying to tell a crew what to build, where to point the camera, and what sounds to capture. Write it for the people who will make it — including yourself. If a line cannot be produced with your available resources, it does not belong in this draft.",
    },
    {
      kind: "heading",
      text: "Script Goals",
    },
    {
      kind: "paragraph",
      text: "Before you write a single scene heading, define what the script must achieve. Not story goals — production goals. What must be true of this draft for it to be shootable?",
    },
    {
      kind: "bullets",
      items: [
        "Does every scene take place in a location you can access?",
        "Can the film be shot within your available time window?",
        "Does the cast requirement match who is actually available?",
        "Is the sound design achievable with your equipment?",
        "Are there any VFX, stunts, or special requirements — and can you execute them practically?",
      ],
    },
    {
      kind: "heading",
      text: "Production-Ready Constraints",
    },
    {
      kind: "paragraph",
      text: "Pull your constraints from the Infrastructure page and apply them to every scene. Each constraint is a creative parameter, not a limitation. Constraints force specificity — and specificity is what makes short films work. A film set entirely in one room because that's all you have access to is more honest and more filmable than a film that needs six locations you can't secure.",
    },
    {
      kind: "heading",
      text: "Blocking Notes",
    },
    {
      kind: "paragraph",
      text: "Your script should include blocking notes: where bodies are in the frame, how they move relative to each other and to the camera, what the spatial relationships are at key moments. These are not optional extras; they are how the script communicates physicality to the director (which may be you).",
    },
    {
      kind: "heading",
      text: "Sound Design in the Script",
    },
    {
      kind: "paragraph",
      text: "Sound starts in the script. Every significant sound should be noted — not as post-production instructions, but as on-set capture requirements. If a scene depends on the sound of rain, that rain needs to be in the script as a production element, not a mood note. Include both capture sounds (recorded on set) and design sounds (created in post) in separate notes.",
    },
    {
      kind: "heading",
      text: "Non-Negotiables",
    },
    {
      kind: "paragraph",
      text: "Define 3–5 things that must survive every revision. These are the elements you will fight for — the image, the rule, the motif, the one moment of silence. Everything else can adapt. Non-negotiables prevent the film from being revised into something generic.",
    },
    {
      kind: "heading",
      text: "First Draft Discipline",
    },
    {
      kind: "paragraph",
      text: "Your first draft should be 5–15 pages. Write it fast. Do not polish. Do not rewrite scenes as you go. Get the shape down — the atmosphere sequence, the behavior patterns, the tension architecture, the break. You can refine everything later. A messy complete draft is infinitely more useful than three perfect pages of an unfinished script.",
    },
    {
      kind: "heading",
      text: "Key Takeaways",
    },
    {
      kind: "checklist",
      items: [
        "The script is a production document, not a literary one",
        "Define script goals as production goals before writing",
        "Apply constraints to every scene — constraints create specificity",
        "Include blocking notes — where bodies are in frame and how they move",
        "Start sound design in the script — capture and design sounds",
        "Lock 3–5 non-negotiables that must survive every revision",
        "Write the first draft fast (5–15 pages) — shape first, polish later",
      ],
    },
  ],
};

pageCopy["/week/5/exercises"] = {
  intro:
    "These exercises translate your concept, character, and tension work into a shootable document. Each one addresses a different production layer.",
  blocks: [
    { kind: "heading", text: "Exercise List" },
    {
      kind: "checklist",
      items: [
        "First Draft Beats — write the beat-by-beat shape of your script in single sentences before drafting",
        "Blocking Notes — for each scene, describe where the camera is and how the body moves through the frame",
        "Location Limitations — list what each location gives you and what it prevents, then adjust scenes accordingly",
        "Practical SFX Planning — chart every sound in your film: what gets captured on set vs. what gets built in post",
      ],
    },
  ],
};

pageCopy["/week/5/decisions"] = {
  intro:
    "This week you commit to what the script is and what the shoot requires. These decisions are production commitments.",
  blocks: [
    { kind: "heading", text: "Decision Fields" },
    {
      kind: "template-fields",
      fields: [
        "Script goals — what must be true of this draft to be shootable",
        "Production-ready constraints — resources, access, and limits applied to every scene",
        "Non-negotiables — 3–5 elements that must survive every revision",
      ],
    },
  ],
};

pageCopy["/week/5/deliverables"] = {
  intro:
    "By end of Week 5, you should have a complete first draft and the production documents that support it.",
  blocks: [
    { kind: "heading", text: "Deliverables Checklist" },
    {
      kind: "checklist",
      items: [
        "Draft v1 (5–15 pages) — complete first draft, shape over polish",
        "Blocking notes per scene — camera position and body movement",
        "Production feasibility checklist — every scene verified against constraints",
        "Sound plan (capture + design) — what gets recorded on set vs. built in post",
      ],
    },
  ],
};
