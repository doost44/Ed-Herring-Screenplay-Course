export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const weeks: NavItem[] = [1, 2, 3, 4, 5].map((n) => ({
  label: `Week ${n}`,
  href: `/week/${n}`,
  children: [
    { label: "Lecture", href: `/week/${n}/lecture` },
    { label: "Exercises", href: `/week/${n}/exercises` },
    { label: "Decisions", href: `/week/${n}/decisions` },
    { label: "Deliverables", href: `/week/${n}/deliverables` },
    { label: "Notes", href: `/week/${n}/notes` },
  ],
}));

export const navTree: NavItem[] = [
  { label: "Master Index", href: "/master-index" },
  {
    label: "Infrastructure",
    href: "/infrastructure",
    children: [
      { label: "Constraints", href: "/infrastructure/constraints" },
      { label: "Revision Log", href: "/infrastructure/revision-log" },
      { label: "Milestones", href: "/infrastructure/milestones" },
    ],
  },
  ...weeks,
  {
    label: "Script Lab",
    href: "/script-lab",
    children: [
      { label: "Index", href: "/script-lab/index" },
      { label: "Upload Log", href: "/script-lab/upload-log" },
      { label: "Templates", href: "/script-lab/templates" },
      { label: "Sessions", href: "/script-lab/sessions" },
      { label: "Techniques", href: "/script-lab/techniques" },
    ],
  },
  {
    label: "Reference Board",
    href: "/reference-board",
    children: [
      { label: "Visual Moodboard", href: "/reference-board/visual-moodboard" },
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
      label: `Week ${n}`,
      href: `/archive/week-${n}`,
    })),
  },
  { label: "Settings", href: "/settings" },
];
