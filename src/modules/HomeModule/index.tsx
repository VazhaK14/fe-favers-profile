import { useLoaderData } from "react-router";
import type { TeamMember } from "./const";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HeroSection } from "./sections/HeroSection";
import { TeamSection } from "./sections/TeamSection";
import { ThemeSettings } from "./components/ThemeSettings";

export default function HomeModule() {
  const { members, theme } = useLoaderData() as { members: TeamMember[], theme: any };

  // Map your backend properties to Tailwind root CSS variables inline
  const customStyle = {
    "--background": theme?.backgroundColor,
    "--foreground": theme?.textColor,
    "--card": theme?.cardColor,
    "--primary": theme?.primaryColor,
    "--accent": theme?.accentColor,
    fontFamily: theme?.fontFamily || "Geist Variable",
  } as React.CSSProperties;

  return (
    <div 
      style={customStyle} 
      className="min-h-screen flex flex-col relative overflow-hidden bg-background text-foreground transition-colors duration-300"
    >
      <Navbar />
      <div className="relative z-10 grow flex flex-col items-center w-full">
        <HeroSection />
        <TeamSection members={members} />
      </div>
      <Footer />
      {/* Settings widget automatically checks permissions internally */}
      <ThemeSettings currentTheme={theme} />
    </div>
  );
}