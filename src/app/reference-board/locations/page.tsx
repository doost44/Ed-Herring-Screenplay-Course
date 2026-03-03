import ContentPage from "@/components/ContentPage";
import ReferenceItemsManager from "@/components/reference/ReferenceItemsManager";

export default function Page() {
  return (
    <>
      <ContentPage
        href="/reference-board/locations"
        title="Locations"
        notesSlug="/reference-board/locations"
      />
      <ReferenceItemsManager slug="/reference-board/locations" />
    </>
  );
}
