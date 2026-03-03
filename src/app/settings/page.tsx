import ContentPage from "@/components/ContentPage";
import ExportNotesButton from "@/components/ExportNotesButton";
import LlmSettings from "@/components/LlmSettings";

export default function Page() {
  return (
    <ContentPage href="/settings" title="Settings">
      <LlmSettings />
      <hr style={{ margin: "2rem 0", borderColor: "var(--border)" }} />
      <ExportNotesButton />
    </ContentPage>
  );
}
