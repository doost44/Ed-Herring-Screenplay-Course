import ContentPage from "@/components/ContentPage";

export function generateStaticParams() {
  return [1, 2, 3, 4, 5].map((n) => ({ num: String(n) }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ num: string }>;
}) {
  const { num } = await params;
  return <ContentPage href={`/week/${num}/notes`} title="Notes" />;
}
