import ContentPage from "@/components/ContentPage";
import ReferenceItemsManager from "@/components/reference/ReferenceItemsManager";

export default function Page() {
  return (
    <>
      <ContentPage
        href="/reference-board/shot-refs"
        title="Shot Refs"
        notesSlug="/reference-board/shot-refs"
      />
      <ReferenceItemsManager slug="/reference-board/shot-refs" />
    </>
  );
}
