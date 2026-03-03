import ContentPage from "@/components/ContentPage";
import ExportNotesButton from "@/components/ExportNotesButton";

export default function Page() {
  return (
    <ContentPage href="/settings" title="Settings">
      <ExportNotesButton />
    </ContentPage>
  );
}
