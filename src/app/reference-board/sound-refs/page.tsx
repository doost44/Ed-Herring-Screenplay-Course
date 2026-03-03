import ContentPage from "@/components/ContentPage";
import ReferenceItemsManager from "@/components/reference/ReferenceItemsManager";

export default function Page() {
  return (
    <>
      <ContentPage
        href="/reference-board/sound-refs"
        title="Sound Refs"
        notesSlug="/reference-board/sound-refs"
      />
      <ReferenceItemsManager slug="/reference-board/sound-refs" />
    </>
  );
}
