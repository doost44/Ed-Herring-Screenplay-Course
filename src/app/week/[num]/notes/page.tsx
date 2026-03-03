import ContentPage from "@/components/ContentPage";

export default async function Page({
  params,
}: {
  params: Promise<{ num: string }>;
}) {
  const { num } = await params;
  return <ContentPage href={`/week/${num}/notes`} title="Notes" />;
}
