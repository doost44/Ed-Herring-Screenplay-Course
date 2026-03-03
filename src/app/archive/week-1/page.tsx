import ContentPage from "@/components/ContentPage";
import ArchiveExcerptsManager from "@/components/archive/ArchiveExcerptsManager";

export default function Page() {
  return (
    <>
      <ContentPage
        href="/archive/week-1"
        title="Archive — Week 1"
        notesSlug="/archive/week-1"
      />
      <ArchiveExcerptsManager week="week-1" />
    </>
  );
}
