export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const weeks: NavItem[] = [1, 2, 3, 4, 5].map((n) => ({
  label: `Week ${n}`,
  href: `/week-${n}`,
  children: [
    { label: "Lecture", href: `/week-${n}/lecture` },
    { label: "Exercises", href: `/week-${n}/exercises` },
    { label: "Decisions Summary", href: `/week-${n}/decisions-summary` },
    { label: "Deliverables Checklist", href: `/week-${n}/deliverables-checklist` },
    { label: "Notes", href: `/week-${n}/notes` },
  ],
}));

export const navTree: NavItem[] = [
  { label: "Master Index", href: "/" },
  {
    label: "Project Infrastructure",
    href: "/project-infrastructure",
    children: [
      { label: "Constraints & Resources", href: "/project-infrastructure/constraints-resources" },
      { label: "Revision Log", href: "/project-infrastructure/revision-log" },
      { label: "Milestones", href: "/project-infrastructure/milestones" },
    ],
  },
  ...weeks,
  {
    label: "Script Lab",
    href: "/script-lab",
    children: [
      { label: "Index", href: "/script-lab/index" },
      { label: "Upload Log", href: "/script-lab/upload-log" },
      { label: "Annotation Templates", href: "/script-lab/annotation-templates" },
      { label: "Analysis Sessions", href: "/script-lab/analysis-sessions" },
      { label: "Learned Techniques", href: "/script-lab/learned-techniques" },
    ],
  },
  {
    label: "Reference Board",
    href: "/reference-board",
    children: [
      { label: "Moodboard", href: "/reference-board/moodboard" },
      { label: "Textures", href: "/reference-board/textures" },
      { label: "Locations", href: "/reference-board/locations" },
      { label: "Palettes", href: "/reference-board/palettes" },
      { label: "Shot Refs", href: "/reference-board/shot-refs" },
      { label: "Influence Map", href: "/reference-board/influence-map" },
      { label: "Sound Refs", href: "/reference-board/sound-refs" },
    ],
  },
  {
    label: "Archive",
    href: "/archive",
    children: [1, 2, 3, 4, 5].map((n) => ({
      label: `Chat Import: Week ${n}`,
      href: `/archive/chat-import-week-${n}`,
    })),
  },
];
