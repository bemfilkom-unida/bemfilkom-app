import PlexusEffect from "@/components/effects/PlexusEffect";
import {
  Hero,
  ProgramsIntro,
  VisionMission,
  Timeline,
  ProgramTabs,
  FinalCTA,
} from "@/components/home";

export default function Index() {
  return (
    <div className="relative">
      <PlexusEffect
        nodeCount={60}
        connectionDistance={100}
        animationSpeed={0.3}
        colors={{
          primary: 'rgba(107, 200, 226, 0.6)',
          secondary: 'rgba(75, 180, 210, 0.4)',
          accent: 'rgba(230, 148, 78, 0.5)',
        }}
      />
      <div className="relative z-10">
        <Hero />
        <ProgramsIntro />
        <VisionMission />
        <Timeline />
        <ProgramTabs />
        <FinalCTA />
      </div>
    </div>
  );
}