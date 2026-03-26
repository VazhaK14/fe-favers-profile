import { useLoaderData } from "react-router";
import type { TeamMember } from "./const";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HeroSection } from "./sections/HeroSection";
import { TeamSection } from "./sections/TeamSection";

export default function HomeModule() {
  const { members } = useLoaderData() as { members: TeamMember[] };

  return (
    <div className="min-h-screen flex flex-col  relative overflow-hidden">
      <Navbar />
      <div className="relative z-10 grow flex flex-col items-center w-full">
        <HeroSection />
        <TeamSection members={members} />
      </div>
      <Footer />
    </div>
  );
}
