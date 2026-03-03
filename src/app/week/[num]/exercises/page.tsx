import ContentPage from "@/components/ContentPage";
import ExerciseRunner from "@/components/week/ExerciseRunner";
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
    <ContentPage href={`/week/${num}/exercises`} title="Exercises">
      <ExerciseRunner
        weekNumber={weekNumber}
        exercises={template?.exercises ?? []}
      />
    </ContentPage>
  );
}
