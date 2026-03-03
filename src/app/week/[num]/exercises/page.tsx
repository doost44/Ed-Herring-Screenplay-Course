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
      title="Exercises"
      description={`Practice exercises and prompts for Week ${num}.`}
    />
  );
}
