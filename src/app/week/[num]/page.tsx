import PlaceholderPage from "@/components/PlaceholderPage";

export default async function Page({
  params,
}: {
  params: Promise<{ num: string }>;
}) {
  const { num } = await params;
  return (
    <PlaceholderPage
      section={`Week ${num}`}
      title={`Week ${num} Overview`}
      description={`An overview of the goals, themes, and tasks for Week ${num} of the Short Film Lab.`}
      details="Use the sub-pages to access lecture notes, exercises, decisions, deliverables, and personal notes."
    />
  );
}
