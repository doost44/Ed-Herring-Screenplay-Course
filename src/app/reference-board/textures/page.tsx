import ContentPage from "@/components/ContentPage";
import ReferenceItemsManager from "@/components/reference/ReferenceItemsManager";

export default function Page() {
  return (
    <>
      <ContentPage
        href="/reference-board/textures"
        title="Textures"
        notesSlug="/reference-board/textures"
      />
      <ReferenceItemsManager slug="/reference-board/textures" />
    </>
  );
}
