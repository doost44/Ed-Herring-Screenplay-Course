import PageHeader from "@/components/PageHeader";
import NotesArea from "@/components/NotesArea";
import SectionBlocks from "@/components/SectionBlocks";
import { pageCopy } from "@/content/courseCopy";
import { buildBreadcrumbs } from "@/content/courseStructure";
import type { ReactNode } from "react";

interface ContentPageProps {
  href: string;
  title: string;
  notesSlug?: string;
  children?: ReactNode;
}

/**
 * Generic content-driven page shell.
 * Pulls copy from the content model by href and renders
 * PageHeader + SectionBlocks.
 */
export default function ContentPage({
  href,
  title,
  notesSlug,
  children,
}: ContentPageProps) {
  const copy = pageCopy[href];
  const breadcrumbs = buildBreadcrumbs(href);

  return (
    <article>
      <PageHeader
        title={title}
        subtitle={copy?.intro}
        breadcrumbs={breadcrumbs}
      />
      {copy?.blocks && <SectionBlocks blocks={copy.blocks} />}
      {notesSlug && <NotesArea slug={notesSlug} />}
      {children}
      {!copy && (
        <p>
          This section is ready for your content. Add notes, uploads, or
          structured data here as the project progresses.
        </p>
      )}
    </article>
  );
}
