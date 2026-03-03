import ContentPage from "@/components/ContentPage";
import DeliverablesChecklist from "@/components/week/DeliverablesChecklist";
import { weekTemplates } from "@/content/weekTemplates";

export function generateStaticParams() {
  return [1, 2, 3, 4, 5].map((n) => ({ num: String(n) }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ num: string }>;
}) {
  const { num } = await params;
  const weekNumber = Number(num);
  const template = weekTemplates[weekNumber];

  return (
    <ContentPage href={`/week/${num}/deliverables`} title="Deliverables">
      <DeliverablesChecklist
        weekNumber={weekNumber}
        items={template?.deliverablesItems ?? []}
      />
    </ContentPage>
  );
}
