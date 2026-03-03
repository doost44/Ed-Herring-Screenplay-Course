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
      title="Deliverables"
      description={`Deliverables checklist for Week ${num}. Track what needs to be submitted or completed.`}
    />
  );
}
