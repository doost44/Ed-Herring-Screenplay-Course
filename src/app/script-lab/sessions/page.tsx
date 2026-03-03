import ContentPage from "@/components/ContentPage";
import SessionsManager from "@/components/scriptLab/SessionsManager";

export default function Page() {
  return (
    <ContentPage href="/script-lab/sessions" title="Sessions">
      <SessionsManager />
    </ContentPage>
  );
}
