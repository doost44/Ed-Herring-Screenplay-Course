import ContentPage from "@/components/ContentPage";
import ReferenceItemsManager from "@/components/reference/ReferenceItemsManager";

export default function Page() {
  return (
    <>
      <ContentPage
        href="/reference-board/palettes"
        title="Palettes"
        notesSlug="/reference-board/palettes"
      />
      <ReferenceItemsManager slug="/reference-board/palettes" />
    </>
  );
}
