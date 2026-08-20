import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { ProgramsSection } from "../components/ProgramsSection";
import { ImpactSection } from "../components/ImpactSection";
import { VolunteerSection } from "../components/VolunteerSection";
import { EventsSection } from "../components/EventsSection";
import { NewsSection } from "../components/NewsSection";
import { DonateSection } from "../components/DonateSection";
import { ContactSection } from "../components/ContactSection";

export function HomePage() {
  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <HeroSection onScrollToNext={handleScrollToAbout} />
      <AboutSection />
      <ProgramsSection />
      <ImpactSection />
      <VolunteerSection />
      <EventsSection />
      <NewsSection />
      <DonateSection />
      <ContactSection />
    </>
  );
}
