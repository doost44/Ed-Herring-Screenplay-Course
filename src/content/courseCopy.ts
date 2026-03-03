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
  text?: string;            // paragraph / heading text
  items?: string[];         // bullet or checklist items
  fields?: string[];        // template field labels
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
      { kind: "paragraph", text: "Use the sub-pages to manage constraints, the revision log, and milestones." },
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
    intro:
      "Track every major revision to your screenplay and project plan.",
    blocks: [
      { kind: "heading", text: "Revision Entry Template" },
      {
        kind: "template-fields",
        fields: ["Date", "Version", "Summary of changes", "Reason for revision"],
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
      { kind: "paragraph", text: "Use the sub-pages to manage uploads, templates, analysis sessions, and learned techniques." },
    ],
  },
  "/script-lab/index": {
    intro: "Master index of all scripts uploaded and analysed in the Script Lab.",
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
        fields: ["Date", "Script analysed", "Focus area", "Key findings", "Follow-up tasks"],
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
        fields: ["Technique name", "Source / origin", "Description", "Example", "When to use"],
      },
    ],
  },

  /* ---- Reference Board ---- */
  "/reference-board": {
    intro:
      "Visual and auditory references for your short film — mood, texture, colour, location, and sound.",
    blocks: [
      { kind: "paragraph", text: "Browse the sub-pages to curate your reference library." },
    ],
  },
  "/reference-board/visual-moodboard": {
    intro: "Collect images, stills, and visual inspiration for tone and aesthetic.",
    blocks: [
      { kind: "heading", text: "Moodboard Sections" },
      { kind: "bullets", items: ["Tone / atmosphere", "Lighting", "Framing", "Colour grading", "Costume & props"] },
    ],
  },
  "/reference-board/textures": {
    intro: "Texture samples and material references for production design.",
    blocks: [
      { kind: "heading", text: "Categories" },
      { kind: "bullets", items: ["Surfaces", "Fabrics", "Natural elements", "Urban / industrial"] },
    ],
  },
  "/reference-board/locations": {
    intro:
      "Location scouting references — photos, maps, and notes on potential shooting sites.",
    blocks: [
      { kind: "heading", text: "Location Entry Template" },
      {
        kind: "template-fields",
        fields: ["Name", "Address / description", "Permit required?", "Photos", "Notes"],
      },
    ],
  },
  "/reference-board/palettes": {
    intro: "Colour palettes and grading references for your film's visual identity.",
    blocks: [
      { kind: "heading", text: "Palette Workspace" },
      { kind: "paragraph", text: "Add colour swatches, hex codes, and reference stills here." },
    ],
  },
  "/reference-board/shot-refs": {
    intro: "Shot composition, framing, and cinematography references.",
    blocks: [
      { kind: "heading", text: "Shot Reference Categories" },
      { kind: "bullets", items: ["Wide / establishing", "Close-up", "POV / subjective", "Tracking / movement", "Static / tableau"] },
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
      { kind: "bullets", items: ["Ambient / atmos", "Foley", "Score / soundtrack", "Dialogue treatment", "Silence / negative space"] },
    ],
  },

  /* ---- Archive ---- */
  "/archive": {
    intro: "Archived chat imports and historical conversation logs organised by week.",
    blocks: [],
  },

  /* ---- Settings ---- */
  "/settings": {
    intro: "Application preferences, theme options, and configuration.",
    blocks: [
      { kind: "heading", text: "Preferences" },
      { kind: "checklist", items: ["Theme (dark / light)", "Font size", "Sidebar default state", "Chat panel default state"] },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Week page copy (generated per-week)                               */
/* ------------------------------------------------------------------ */

for (let n = 1; n <= 5; n++) {
  // Week overview
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

  // Lecture
  pageCopy[`/week/${n}/lecture`] = {
    intro: `Lecture notes and key takeaways for Week ${n}.`,
    blocks: [
      { kind: "heading", text: "Key Concepts" },
      { kind: "bullets", items: ["Concept 1 — (placeholder)", "Concept 2 — (placeholder)", "Concept 3 — (placeholder)"] },
      { kind: "heading", text: "Takeaways" },
      { kind: "checklist", items: ["Takeaway 1", "Takeaway 2", "Takeaway 3"] },
    ],
  };

  // Exercises
  pageCopy[`/week/${n}/exercises`] = {
    intro: `Practice exercises and prompts for Week ${n}.`,
    blocks: [
      { kind: "heading", text: "Exercise List" },
      {
        kind: "checklist",
        items: [
          "Exercise 1 — (placeholder)",
          "Exercise 2 — (placeholder)",
          "Exercise 3 — (placeholder)",
        ],
      },
    ],
  };

  // Decisions
  pageCopy[`/week/${n}/decisions`] = {
    intro: `Key creative and structural decisions made during Week ${n}.`,
    blocks: [
      { kind: "heading", text: "Decision Log" },
      {
        kind: "template-fields",
        fields: ["Decision", "Rationale", "Alternatives considered", "Status"],
      },
    ],
  };

  // Deliverables
  pageCopy[`/week/${n}/deliverables`] = {
    intro: `Deliverables checklist for Week ${n}. Track what needs to be submitted or completed.`,
    blocks: [
      { kind: "heading", text: "Deliverables Checklist" },
      {
        kind: "checklist",
        items: [
          "Deliverable 1 — (placeholder)",
          "Deliverable 2 — (placeholder)",
          "Deliverable 3 — (placeholder)",
        ],
      },
    ],
  };

  // Notes
  pageCopy[`/week/${n}/notes`] = {
    intro: `Personal notes and reflections for Week ${n}.`,
    blocks: [
      { kind: "heading", text: "Notes" },
      { kind: "paragraph", text: "Add your personal reflections, questions, and observations here." },
    ],
  };

  // Archive week
  pageCopy[`/archive/week-${n}`] = {
    intro: `Archived chat imports and conversation logs from Week ${n}.`,
    blocks: [],
  };
}
