/* ------------------------------------------------------------------ */
/*  courseStructure.ts – Notebook hierarchy for the Short Film Lab     */
/*  Structure-only: no film-specific story content.                   */
/* ------------------------------------------------------------------ */

/** Type of page inside a weekly section. */
export type WeekPageType =
  | "lecture"
  | "exercises"
  | "decisions"
  | "deliverables"
  | "notes";

/** A leaf or branch node in the course hierarchy. */
export interface PageNode {
  slug: string;          // URL path segment (e.g. "constraints")
  title: string;         // Display title (matches OneNote outline)
  href: string;          // Full href from root
  weekNumber?: number;   // Present only for week-scoped pages
  weekPageType?: WeekPageType;
  children?: PageNode[];
}

/** Top-level section descriptor. */
export interface Section {
  slug: string;
  title: string;
  href: string;
  children?: PageNode[];
}

/* ------------------------------------------------------------------ */
/*  Week sub-pages                                                    */
/* ------------------------------------------------------------------ */

function weekChildren(n: number): PageNode[] {
  return [
    { slug: "lecture",      title: "Lecture",      href: `/week/${n}/lecture`,      weekNumber: n, weekPageType: "lecture" },
    { slug: "exercises",    title: "Exercises",    href: `/week/${n}/exercises`,    weekNumber: n, weekPageType: "exercises" },
    { slug: "decisions",    title: "Decisions",    href: `/week/${n}/decisions`,    weekNumber: n, weekPageType: "decisions" },
    { slug: "deliverables", title: "Deliverables", href: `/week/${n}/deliverables`, weekNumber: n, weekPageType: "deliverables" },
    { slug: "notes",        title: "Notes",        href: `/week/${n}/notes`,        weekNumber: n, weekPageType: "notes" },
  ];
}

/* ------------------------------------------------------------------ */
/*  Week sections (1 – 5)                                             */
/* ------------------------------------------------------------------ */

const weeks: Section[] = [1, 2, 3, 4, 5].map((n) => ({
  slug: `week-${n}`,
  title: `Week ${n}`,
  href: `/week/${n}`,
  children: weekChildren(n),
}));

/* ------------------------------------------------------------------ */
/*  Full course structure                                             */
/* ------------------------------------------------------------------ */

export const courseStructure: Section[] = [
  {
    slug: "master-index",
    title: "Master Index",
    href: "/master-index",
  },
  {
    slug: "infrastructure",
    title: "Infrastructure",
    href: "/infrastructure",
    children: [
      { slug: "constraints",   title: "Constraints",   href: "/infrastructure/constraints" },
      { slug: "revision-log",  title: "Revision Log",  href: "/infrastructure/revision-log" },
      { slug: "milestones",    title: "Milestones",     href: "/infrastructure/milestones" },
    ],
  },
  ...weeks,
  {
    slug: "script-lab",
    title: "Script Lab",
    href: "/script-lab",
    children: [
      { slug: "index",      title: "Index",      href: "/script-lab/index" },
      { slug: "upload-log",  title: "Upload Log", href: "/script-lab/upload-log" },
      { slug: "templates",   title: "Templates",  href: "/script-lab/templates" },
      { slug: "sessions",    title: "Sessions",   href: "/script-lab/sessions" },
      { slug: "techniques",  title: "Techniques", href: "/script-lab/techniques" },
    ],
  },
  {
    slug: "reference-board",
    title: "Reference Board",
    href: "/reference-board",
    children: [
      { slug: "visual-moodboard", title: "Visual Moodboard", href: "/reference-board/visual-moodboard" },
      { slug: "textures",         title: "Textures",         href: "/reference-board/textures" },
      { slug: "locations",        title: "Locations",        href: "/reference-board/locations" },
      { slug: "palettes",         title: "Palettes",         href: "/reference-board/palettes" },
      { slug: "shot-refs",        title: "Shot Refs",        href: "/reference-board/shot-refs" },
      { slug: "influence-map",    title: "Influence Map",    href: "/reference-board/influence-map" },
      { slug: "sound-refs",       title: "Sound Refs",       href: "/reference-board/sound-refs" },
    ],
  },
  {
    slug: "archive",
    title: "Archive",
    href: "/archive",
    children: [1, 2, 3, 4, 5].map((n) => ({
      slug: `week-${n}`,
      title: `Week ${n}`,
      href: `/archive/week-${n}`,
    })),
  },
  {
    slug: "settings",
    title: "Settings",
    href: "/settings",
  },
];

/* ------------------------------------------------------------------ */
/*  Lookup helpers                                                    */
/* ------------------------------------------------------------------ */

/** Flat map: href → PageNode / Section. */
const _lookup = new Map<string, Section | PageNode>();
for (const section of courseStructure) {
  _lookup.set(section.href, section);
  if (section.children) {
    for (const child of section.children) {
      _lookup.set(child.href, child);
    }
  }
}

/** Return the page node for a given href, or undefined. */
export function getPageByHref(href: string): Section | PageNode | undefined {
  return _lookup.get(href);
}

/** Return the parent section for a given page href. */
export function getParentSection(href: string): Section | undefined {
  return courseStructure.find(
    (s) => s.href === href || s.children?.some((c) => c.href === href),
  );
}

/** Build breadcrumb tuples [label, href] for a given path. */
export function buildBreadcrumbs(href: string): { label: string; href: string }[] {
  const crumbs: { label: string; href: string }[] = [];
  const parent = getParentSection(href);
  if (parent && parent.href !== href) {
    crumbs.push({ label: parent.title, href: parent.href });
  }
  const node = getPageByHref(href);
  if (node) {
    crumbs.push({ label: node.title, href: node.href });
  }
  return crumbs;
}
