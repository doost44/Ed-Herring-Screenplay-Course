import ContentPage from "@/components/ContentPage";
import TemplateNotesManager from "@/components/scriptLab/TemplateNotesManager";

export default function Page() {
  return (
    <ContentPage href="/script-lab/templates" title="Templates">
      <TemplateNotesManager />
    </ContentPage>
  );
}
