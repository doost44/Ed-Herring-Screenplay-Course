import ContentPage from "@/components/ContentPage";
import ArchiveExcerptsManager from "@/components/archive/ArchiveExcerptsManager";

export default function Page() {
  return (
    <>
      <ContentPage
        href="/archive/week-2"
        title="Archive — Week 2"
        notesSlug="/archive/week-2"
      />
      <ArchiveExcerptsManager week="week-2" />
    </>
  );
}
