import ContentPage from "@/components/ContentPage";
import UploadLogManager from "@/components/scriptLab/UploadLogManager";

export default function Page() {
  return (
    <ContentPage href="/script-lab/upload-log" title="Upload Log">
      <UploadLogManager />
    </ContentPage>
  );
}
