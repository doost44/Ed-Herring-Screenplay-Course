import PageHeader from "@/components/PageHeader";
import SectionBlocks from "@/components/SectionBlocks";
import { pageCopy } from "@/content/courseCopy";
import { buildBreadcrumbs } from "@/content/courseStructure";

interface ContentPageProps {
  href: string;
  title: string;
}

/**
 * Generic content-driven page shell.
 * Pulls copy from the content model by href and renders
 * PageHeader + SectionBlocks.
 */
export default function ContentPage({ href, title }: ContentPageProps) {
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
      {!copy && (
        <p>
          This section is ready for your content. Add notes, uploads, or
          structured data here as the project progresses.
        </p>
      )}
    </article>
  );
}
