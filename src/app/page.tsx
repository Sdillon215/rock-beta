import Hero from "@/components/hero/Hero";
import ClassicClimbs from "@/components/classic_climbs_section/ClassicClimbsSection";

export default function Home() {
  return (
    <div className="grid gap-y-4">
      <Hero />
      <ClassicClimbs />
    </div>
  );
}
