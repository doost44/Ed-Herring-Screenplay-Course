import ContentPage from "@/components/ContentPage";
import ArchiveExcerptsManager from "@/components/archive/ArchiveExcerptsManager";

export default function Page() {
  return (
    <>
      <ContentPage
        href="/archive/week-5"
        title="Archive — Week 5"
        notesSlug="/archive/week-5"
      />
      <ArchiveExcerptsManager week="week-5" />
    </>
  );
}
