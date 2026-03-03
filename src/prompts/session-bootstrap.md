# Mirror Mentor — Session Bootstrap Prompt

> Paste this entire document at the start of a new conversation to resume building the Short Film Lab course app. The AI will have full context to continue development, populate lecture content, and evolve the Ed agent based on your conversations.

---

## 1. Project Identity

**App name:** Mirror Mentor — Short Film Lab  
**Stack:** Next.js 16 App Router, React 19, TypeScript, static export to GitHub Pages  
**Repo:** `doost44/Ed-Herring-Screenplay-Course` (branch: `main`)  
**Local path:** `c:\Users\cheet\Downloads\Ed-Herring-Screenplay-Course`  
**Run locally:** `cmd /c npm run dev` → `http://localhost:3000`  
**Build:** `cmd /c npm run build` (static export)  
**Deploy:** GitHub Actions workflow → GitHub Pages

---

## 2. Course Curriculum — What Each Week Teaches

The course guides one student through developing a short film from concept to shooting script over 5 weeks. Ed (the AI mentor) teaches via structure and process, not by writing the film for the student.

### Week 1 — Concept & Sensory Foundation

**Theme:** Find the central image, not the plot.  
**Key concepts:** Sensory facts, internal tension, sensory logic (light/sound/motion), uncanny rules.  
**Decisions the student makes:** Central image, internal tension pair, sensory grammar, one repeatable rule.  
**Deliverables:** Anchor frame description, one tension pair, sensory grammar, one repeatable rule.  
**Exercises:** Sensory Facts, Internal Tension, Sensory Logic, Uncanny Rule.  
**Ed's lecture approach:** Teach observation-first filmmaking. No plot, no character arcs, no endings. Just: what does the camera see, hear, and feel? What is the one strange rule that governs this world?

### Week 2 — Character as Behavior

**Theme:** Characters are defined by what they do, not who they are.  
**Key concepts:** Core behavior patterns, character containers (body-in-space), interaction with the uncanny rule.  
**Decisions:** Core behavior pattern, character container, rule contact points.  
**Deliverables:** Surface behaviors (5–7), fracture behaviors (2), silence/avoidance behaviors (3), one object relationship.  
**Exercises:** Behavior Mapping, Object Relationship, Spatial Behavior, Emotional Orbit Rule.  
**Ed's lecture approach:** Teach behavior as the only evidence the camera has. No backstory, no psychology lectures. What does the character do with their hands? How do they move through space? What object do they keep returning to?

### Week 3 — Tension Architecture

**Theme:** Tension is built through repetition and controlled shifts, not through plot twists.  
**Key concepts:** Tension architecture, key repetitions, rule escalation, perception shifts.  
**Decisions:** Tension architecture, key repetitions, what shifts.  
**Deliverables:** 3-part tension plan, repetition list (3–5), one defined break (how pattern fails/changes).  
**Exercises:** 3-Part Tension Curve, Spatial Escalation, Repetition Pattern, Breaking The Pattern.  
**Ed's lecture approach:** Teach tension as rhythm. A short film builds tension through what repeats and what eventually breaks. No traditional "rising action" — instead: establish, sustain, fracture.

### Week 4 — Scene Logic & Atmosphere

**Theme:** Scenes are containers for atmosphere, not plot delivery vehicles.  
**Key concepts:** Scene list construction, atmosphere notes, shot logic, blocking notes, visual/sound motifs.  
**Decisions:** Scene list (titles only), atmosphere notes per scene, shot logic/blocking notes.  
**Deliverables:** Scene list (5–10 scenes), one motif plan, silence/noise plan.  
**Exercises:** Beat Shapes, Visual Motifs, Silence vs Noise Use, Scene-to-Scene Logic.  
**Ed's lecture approach:** Teach scene construction as atmosphere design. Each scene has a dominant sensory quality. Transitions are shifts in that quality. No scene should exist solely to deliver information.

### Week 5 — Script Draft & Production Feasibility

**Theme:** The script is a production document, not a literary artifact.  
**Key concepts:** Script goals, production-ready constraints, non-negotiables, blocking, sound planning.  
**Decisions:** Script goals, production-ready constraints, non-negotiables.  
**Deliverables:** Draft v1 (5–15 pages), blocking notes per scene, production feasibility checklist, sound plan.  
**Exercises:** First Draft Beats, Blocking Notes, Location Limitations, Practical SFX Planning.  
**Ed's lecture approach:** Teach the script as a blueprint for a shoot. Every line should be producible with available resources. Sound design starts in the script, not in post.

---

## 3. App Architecture — File Map

```
src/
  app/                          # Next.js App Router pages
    layout.tsx                  # Shell: Sidebar + ChatPanel + main content
    page.tsx                    # Root redirect → /master-index
    globals.css                 # All styles (dark theme)
    master-index/page.tsx       # Dashboard + WeekProgressPanel + GlobalSearchPanel
    infrastructure/             # Constraints, Revision Log, Milestones
    week/[num]/                 # Dynamic week routes (lecture, exercises, decisions, deliverables, notes)
    script-lab/                 # Upload Log, Templates, Sessions, Techniques, Index
    reference-board/            # Visual Moodboard, Textures, Locations, Palettes, Shot Refs, Influence Map, Sound Refs
    archive/                    # Week 1–5 archive pages with excerpt managers
    settings/page.tsx           # Preferences + ExportNotesButton
    api/chat/route.ts           # POST /api/chat — Ed agent backend
  components/
    Sidebar.tsx                 # Navigation sidebar
    ChatPanel.tsx               # Persistent Ed chat panel (right column / mobile drawer)
    ContentPage.tsx             # Shared page shell (PageHeader + SectionBlocks + NotesArea)
    PageHeader.tsx              # Title + breadcrumbs + subtitle
    SectionBlocks.tsx           # Renders ContentBlock[] from courseCopy
    NotesArea.tsx               # Autosaving textarea → mm_notes:{slug}
    ExportNotesButton.tsx       # JSON export of all mm_* localStorage
    infrastructure/             # ConstraintsForm, RevisionLog, MilestonesTracker
    week/                       # DecisionsTemplate, DeliverablesChecklist, ExerciseRunner, WeekCompleteToggle, WeekProgressPanel
    scriptLab/                  # UploadLogManager, TemplateNotesManager, SessionsManager
    reference/                  # ReferenceItemsManager (title + url + notes + tags)
    archive/                    # ArchiveExcerptsManager (date + title + content)
    master/                     # GlobalSearchPanel
  content/
    courseStructure.ts           # Full hierarchy: sections → children → slugs/hrefs
    courseCopy.ts                # PageCopy per route: intro text + ContentBlock[]
    weekTemplates.ts             # Per-week: decisionsFields, deliverablesItems, exercises
    nav.ts                       # Sidebar navigation data
  lib/
    storage.ts                   # getJSON / setJSON / removeKey (localStorage)
    agentTypes.ts                # ChatMessage, AppState, ModeBlock, CommandFlags, etc.
    edAgent.ts                   # loadSystemPrompt, detectCommandFlags, buildMessages, buildDeveloperDirective, postProcessEdReply, detectNoStoryShapingNeed
    edContracts.ts               # parseEdReply, validateEdReply, enforceEdReplyContract, resolveModeTransition, MODE_TRANSITION_MAP, findLastAssistantMode
    llmProvider.ts               # OpenAI/Azure provider abstraction + generateText
    safety.ts                    # checkSafety + buildEdRefusal
    notebookSearch.ts            # searchNotebook — scans mm_notes, mm_week, mm_revisionLog, mm_archive keys
  prompts/
    ed.system.md                 # Ed's system prompt (loaded server-side)
    session-bootstrap.md         # THIS FILE
```

---

## 4. localStorage Persistence Keys

All user data lives in the browser. Keys and their shapes:

| Key pattern                | Shape                                                               | Used by                 |
| -------------------------- | ------------------------------------------------------------------- | ----------------------- |
| `mm_notes:{slug}`          | `{ slug, content, updatedAt }`                                      | NotesArea on every page |
| `mm_constraints`           | `{ locations, props, castAvailability, sound, lighting, schedule }` | ConstraintsForm         |
| `mm_revisionLog`           | `RevisionEntry[]` `{ id, date, category, description }`             | RevisionLog             |
| `mm_milestones`            | `Record<string, boolean>`                                           | MilestonesTracker       |
| `mm_week:{n}:decisions`    | `Record<fieldName, string>`                                         | DecisionsTemplate       |
| `mm_week:{n}:deliverables` | `Record<itemName, boolean>`                                         | DeliverablesChecklist   |
| `mm_week:{n}:exercises`    | `Record<exerciseId, string>`                                        | ExerciseRunner          |
| `mm_week:{n}:completed`    | `boolean`                                                           | WeekCompleteToggle      |
| `mm_chat`                  | `ChatMessage[]`                                                     | ChatPanel               |
| `mm_scriptUploads`         | `UploadEntry[]`                                                     | UploadLogManager        |
| `mm_scriptTemplateNotes`   | `Record<templateId, string>`                                        | TemplateNotesManager    |
| `mm_scriptSessions`        | `SessionEntry[]`                                                    | SessionsManager         |
| `mm_reference:{slug}`      | `ReferenceItem[]` `{ id, title, url, notes, tags[] }`               | ReferenceItemsManager   |
| `mm_archive:{week}`        | `ArchiveExcerpt[]` `{ id, date, title, content }`                   | ArchiveExcerptsManager  |

---

## 5. Ed Agent Architecture

### System prompt

Loaded from `src/prompts/ed.system.md` at runtime. Defines Ed's defaults (no co-writing, no story-fishing, no rewrites unless asked), mandatory response headers, block types, and week gating.

### Mode blocks

| Code | Name      | Purpose                                       |
| ---- | --------- | --------------------------------------------- |
| T    | Template  | Fillable structure, checklists, fields        |
| F    | Feedback  | Assessment — what's working / unclear         |
| Q    | Questions | Targeted clarifying questions (max 5)         |
| P    | Plan      | Ordered next actions                          |
| B    | Boundary  | Safety/scope limits and refusals              |
| M    | Meta      | Workflow/status (always maps to T at runtime) |

### Mode transition map

From any mode, only certain transitions are valid:

- T → T, F, Q, P, B
- F → F, T, Q, P, B
- Q → Q, T, F, P
- P → P, T, F, Q, B
- B → B, T, F, Q, P
- M → T (always)

### Mandatory response header

Every Ed reply must start with:

```
[MODE]: <T|F|Q|P|B>
[GOAL]: <single sentence>
[BOUNDARIES]: <what Ed will NOT do>
```

### Command flags detected from user text

- `coWriteRequested` — "co-write", "draft it", "write it for me"
- `storyFishingRequested` — "backstory", "lore", "origin story"
- `rewriteRequested` — "rewrite", "polish", "improve this text"
- `requestedMode` — "teaching only" → T, "questions only" → Q, "no questions" → suppress Q, "stop steering" → M→T

### Enforcement pipeline (in `/api/chat`)

1. Week-1 gate check (blocks arcs/endings/theme before W1 complete)
2. No-story-shaping check (redirects to process tools unless brainstorming explicitly requested)
3. Safety check (refuses sexual/harmful/illegal)
4. Provider call (real LLM if configured) or mock fallback
5. `postProcessEdReply` — ensures headers present
6. `enforceEdReplyContract` — validates mode, boundaries, question counts; replaces non-conforming replies

### Analysis mode

When `appState.analysisMode === true` (set on Script Lab pages), Ed biases toward teaching analysis tools (behavior cues, silence cues, blocking cues, sound cues) and avoids reproducing user text.

---

## 6. How to Build Lectures Through Conversation

This is the key workflow. Instead of writing lecture content in isolation, **have a conversation with Ed about each week's topic**, then codify the results into the app.

### Step-by-step process for each week:

**A. Have the teaching conversation**

```
User: "Let's work on Week 1's lecture. The theme is 'concept and sensory foundation.'
       Teach me about observation-first filmmaking and finding a central image."
```

Ed responds with structured teaching content — concepts, examples (generic, not from the student's film), process steps, and fillable frameworks.

**B. Extract lecture content from the conversation**
Take Ed's teaching output and structure it into `courseCopy.ts` entries:

```typescript
// Replace the placeholder in courseCopy.ts for /week/1/lecture
pageCopy["/week/1/lecture"] = {
  intro: "Week 1 explores observation-first filmmaking...",
  blocks: [
    {
      kind: "heading",
      text: "Core Principle: The Camera Observes, It Doesn't Narrate",
    },
    {
      kind: "paragraph",
      text: "A short film begins with what the camera can see and hear...",
    },
    { kind: "heading", text: "Finding Your Central Image" },
    {
      kind: "bullets",
      items: [
        "Start with a single concrete image, not a story idea",
        "The image should have inherent tension — something unresolved",
        "...",
      ],
    },
    { kind: "heading", text: "Sensory Logic" },
    { kind: "paragraph", text: "Every frame has a dominant sense..." },
    // ...
  ],
};
```

**C. Refine exercises based on the conversation**
If the teaching conversation reveals better exercise prompts, update `weekTemplates.ts`:

```typescript
weekTemplates[1].exercises = [
  {
    id: "sensory-facts",
    prompt:
      "Exercise 1 — List 10 sensory facts about a location you know well. No adjectives, no feelings — only what a camera would record.",
  },
  // ...
];
```

**D. Archive the conversation**
Paste key excerpts into the Archive (`/archive/week-1`) using the ArchiveExcerptsManager so the student can reference them later.

**E. Mark progress**
Once lecture content is populated and exercises are refined, the week's lecture page is no longer a placeholder.

### What to tell the AI in each session:

```
"We're building Week [N]'s lecture content. The topic is [TOPIC].
Teach me about it as Ed would — structured, process-focused, using generic examples.
After we finish the teaching conversation, help me codify the results into:
1. courseCopy.ts entries for the lecture page
2. Updated exercise prompts in weekTemplates.ts if needed
3. Any new decision fields or deliverable items that emerged
Then we'll commit and move to the next section."
```

---

## 7. Content Block Types (for courseCopy.ts)

When codifying lecture content, use these block kinds:

```typescript
type BlockKind = "paragraph" | "heading" | "bullets" | "checklist" | "template-fields";

// paragraph — prose explanation
{ kind: "paragraph", text: "..." }

// heading — section title
{ kind: "heading", text: "..." }

// bullets — conceptual list (not interactive)
{ kind: "bullets", items: ["...", "..."] }

// checklist — interactive-looking list (rendered with ☐)
{ kind: "checklist", items: ["...", "..."] }

// template-fields — fillable field labels (rendered as table placeholders)
{ kind: "template-fields", fields: ["Label 1", "Label 2"] }
```

---

## 8. Current State — What's Built vs. What's Placeholder

### Fully functional (interactive, persisting data):

- Infrastructure: Constraints form, Revision Log, Milestones tracker
- Week toolkit: Decisions template, Deliverables checklist, Exercise runner, Week completion toggle
- Script Lab: Upload log, Template notes, Sessions with Send-to-Ed
- Reference Board: Structured items (title/url/notes/tags) on all 7 sub-pages + root
- Archive: Structured excerpts (date/title/content) on all 5 week pages
- Master Index: Week progress panel + Global Search across all localStorage data
- Chat: Persistent history, command chips, route context, responsive layout
- Ed backend: `/api/chat` with mock fallback, optional real LLM, safety, enforcement

### Still placeholder content (needs lecture conversations to populate):

- **Week 1–5 lecture pages** — have generic "Concept 1 (placeholder)" bullets
- **Week 1–5 exercise prompts** — have short labels but no detailed instructions
- **courseCopy entries** for week lectures — generic intro text only

### To populate a lecture page:

1. Have a teaching conversation about the week's topic
2. Structure the output into `courseCopy.ts` blocks
3. Optionally update `weekTemplates.ts` exercise prompts with richer descriptions
4. Build and verify

---

## 9. Ed Interaction Contracts (Runtime Enforcement)

The app enforces these contracts on every Ed response:

1. **Header presence** — `[MODE]`, `[GOAL]`, `[BOUNDARIES]` must all appear
2. **Mode validity** — must be one of T/F/Q/P/B (M normalizes to T)
3. **Transition legality** — current mode must be reachable from previous mode via transition map
4. **Question limits** — Q mode: 1–5 questions; no-questions command: zero questions in body
5. **Week gating** — before Week 1 complete: no endings/arcs/theme/wants/wounds/scene lists
6. **No story shaping** — unless explicit brainstorming request, redirect to process tools
7. **Safety** — refuse sexual/harmful/illegal content with Ed-formatted boundary block

Non-conforming responses are replaced with a safe contract-preserving fallback.

---

## 10. Environment & Provider Setup

For real LLM responses (optional — mock works without):

```env
# .env.local
LLM_PROVIDER=openai           # or "azure"
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o           # optional, defaults to gpt-4o
# OPENAI_BASE_URL=...         # optional custom endpoint
# AZURE_OPENAI_ENDPOINT=...
# AZURE_OPENAI_DEPLOYMENT=...
# AZURE_OPENAI_API_KEY=...
```

Without these, the app uses deterministic mock responses that follow all contracts.

---

## 11. Session Workflow Summary

Each time you start a new session with this prompt:

1. **State where you are:** "I'm working on Week N's lecture" or "I need to fix X" or "Let's build the next feature"
2. **For lecture building:** Have a teaching conversation, then ask the AI to codify results into `courseCopy.ts` and `weekTemplates.ts`
3. **For feature work:** Describe the feature, the AI implements it using the architecture above
4. **For bug fixes:** Describe the issue, the AI diagnoses and fixes using the file map above
5. **Always verify:** `cmd /c npm run build` then check `http://localhost:3000`

The AI should always:

- Use the exact file paths and patterns documented here
- Preserve localStorage key conventions
- Follow the Ed contract enforcement pipeline
- Never invent story content — only teach process and structure
- Build incrementally and verify with builds after changes
