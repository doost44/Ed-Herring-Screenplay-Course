import ContentPage from "@/components/ContentPage";
import ReferenceItemsManager from "@/components/reference/ReferenceItemsManager";

export default function Page() {
  return (
    <>
      <ContentPage
        href="/reference-board"
        title="Reference Board"
        notesSlug="/reference-board"
      />
      <ReferenceItemsManager slug="/reference-board" />
    </>
  );
}
