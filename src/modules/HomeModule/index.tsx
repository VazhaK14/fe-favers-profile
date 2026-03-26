import { useLoaderData } from "react-router";
import type { TeamMember } from "./const";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { TeamSection } from "./components/TeamSection";

export default function HomeModule() {
  const { members } = useLoaderData() as { members: TeamMember[] };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-slate-100 to-slate-200 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-200/50 rounded-full blur-3xl -z-10 pointer-events-none mix-blend-multiply" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-3xl -z-10 pointer-events-none mix-blend-multiply" />
      <Navbar />
      <div className="relative z-10 grow flex flex-col items-center w-full">
        <HeroSection />
        <TeamSection members={members} />
      </div>
      <Footer />
    </div>
  );
}
