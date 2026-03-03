import ContentPage from "@/components/ContentPage";
import MilestonesTracker from "@/components/infrastructure/MilestonesTracker";

export default function Page() {
  return (
    <ContentPage href="/infrastructure/milestones" title="Milestones">
      <MilestonesTracker />
    </ContentPage>
  );
}
