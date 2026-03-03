import ContentPage from "@/components/ContentPage";
import WeekCompleteToggle from "@/components/week/WeekCompleteToggle";

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
  return (
    <ContentPage href={`/week/${num}`} title={`Week ${num} Overview`}>
      <WeekCompleteToggle weekNumber={weekNumber} />
    </ContentPage>
  );
}
