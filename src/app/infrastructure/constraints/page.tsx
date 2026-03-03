import ContentPage from "@/components/ContentPage";
import ConstraintsForm from "@/components/infrastructure/ConstraintsForm";

export default function Page() {
  return (
    <ContentPage href="/infrastructure/constraints" title="Constraints">
      <ConstraintsForm />
    </ContentPage>
  );
}
