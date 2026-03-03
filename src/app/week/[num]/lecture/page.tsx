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
      title="Lecture"
      description={`Lecture notes and key takeaways for Week ${num}.`}
    />
  );
}
