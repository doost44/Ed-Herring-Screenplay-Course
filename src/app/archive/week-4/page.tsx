import ContentPage from "@/components/ContentPage";
import ArchiveExcerptsManager from "@/components/archive/ArchiveExcerptsManager";

export default function Page() {
  return (
    <>
      <ContentPage
        href="/archive/week-4"
        title="Archive — Week 4"
        notesSlug="/archive/week-4"
      />
      <ArchiveExcerptsManager week="week-4" />
    </>
  );
}
