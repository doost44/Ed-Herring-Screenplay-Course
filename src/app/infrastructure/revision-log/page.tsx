import ContentPage from "@/components/ContentPage";
import RevisionLog from "@/components/infrastructure/RevisionLog";

export default function Page() {
  return (
    <ContentPage href="/infrastructure/revision-log" title="Revision Log">
      <RevisionLog />
    </ContentPage>
  );
}
