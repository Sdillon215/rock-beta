import Hero from "@/components/hero/Hero";
import AreaListSection from "@/components/area_list_section/AreaListSection";


export default async function StatePage() {

  return (
    <div className="grid gap-y-4">
      <Hero />
      <AreaListSection />
    </div>
  );
}
