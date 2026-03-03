import ContentPage from "@/components/ContentPage";
import ArchiveExcerptsManager from "@/components/archive/ArchiveExcerptsManager";

export default function Page() {
  return (
    <>
      <ContentPage
        href="/archive/week-3"
        title="Archive — Week 3"
        notesSlug="/archive/week-3"
      />
      <ArchiveExcerptsManager week="week-3" />
    </>
  );
}
