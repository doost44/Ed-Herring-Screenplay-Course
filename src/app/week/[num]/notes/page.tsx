import PlaceholderPage from "@/components/PlaceholderPage";

export default async function Page({ params }: { params: Promise<{ num: string }> }) {
  const { num } = await params;
  return (
    <PlaceholderPage
      section={`Week ${num}`}
      title="Notes"
      description={`Personal notes and reflections for Week ${num}.`}
    />
  );
}
