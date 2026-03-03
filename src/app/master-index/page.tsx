import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SectionBlocks from "@/components/SectionBlocks";
import WeekProgressPanel from "@/components/week/WeekProgressPanel";
import { pageCopy } from "@/content/courseCopy";

const copy = pageCopy["/master-index"];

const quickLinks: [string, string][] = [
  ["/infrastructure", "Infrastructure"],
  ["/week/1", "Week 1 — Start Here"],
  ["/script-lab", "Script Lab"],
  ["/reference-board", "Reference Board"],
  ["/archive", "Archive"],
  ["/settings", "Settings"],
];

export default function MasterIndexPage() {
  return (
    <article>
      <PageHeader title="Master Index" subtitle={copy.intro} />
      <SectionBlocks blocks={copy.blocks} />
      <WeekProgressPanel />
      <ul className="quick-links">
        {quickLinks.map(([href, label]) => (
          <li key={href}>
            <Link href={href}>→ {label}</Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
