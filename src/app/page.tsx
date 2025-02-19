import Hero from "@/components/hero/Hero";
import ClassicClimbSection from "@/components/classic_climbs_section/ClassicClimbsSection";
import AreaListSection from "@/components/area_list_section/AreaListSection";

export default async function Home() {

  return (
    <div className="grid gap-y-4">
      <Hero />
      <ClassicClimbSection />
      <AreaListSection />
    </div>
  );
}
