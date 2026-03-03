import ContentPage from "@/components/ContentPage";
import ReferenceItemsManager from "@/components/reference/ReferenceItemsManager";

export default function Page() {
  return (
    <>
      <ContentPage
        href="/reference-board/visual-moodboard"
        title="Visual Moodboard"
        notesSlug="/reference-board/visual-moodboard"
      />
      <ReferenceItemsManager slug="/reference-board/visual-moodboard" />
    </>
  );
}
