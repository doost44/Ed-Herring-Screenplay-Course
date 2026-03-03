import ContentPage from "@/components/ContentPage";
import ReferenceItemsManager from "@/components/reference/ReferenceItemsManager";

export default function Page() {
  return (
    <>
      <ContentPage
        href="/reference-board/influence-map"
        title="Influence Map"
        notesSlug="/reference-board/influence-map"
      />
      <ReferenceItemsManager slug="/reference-board/influence-map" />
    </>
  );
}
