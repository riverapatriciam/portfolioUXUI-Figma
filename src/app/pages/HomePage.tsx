import { useEffect } from "react";
import type { CaseStudyId, HomeAnchor } from "../router";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { BackToTopButton } from "../components/BackToTopButton";
import { ScrollDrawLine } from "../components/ScrollDrawLine";
import { Hero, HeroCurve } from "../sections/Hero";
import { CaseStudiesSection } from "../sections/CaseStudies";
import { AboutSection, StatsRow } from "../sections/About";
import { TimelineSection } from "../sections/Timeline";
import { ContactSection } from "../sections/Contact";

export default function HomePage({
  onOpenCaseStudy,
  scrollToId,
  onScrolled,
}: {
  onOpenCaseStudy: (id: CaseStudyId) => void;
  scrollToId?: HomeAnchor | null;
  onScrolled?: () => void;
}) {
  useEffect(() => {
    if (!scrollToId) return;
    document.getElementById(scrollToId)?.scrollIntoView({ behavior: "smooth" });
    onScrolled?.();
  }, [scrollToId, onScrolled]);

  return (
    <div className="relative w-full overflow-x-clip bg-[#fff3ff]" data-name="Home">
      <HeroCurve />
      <NavBar onOpenCaseStudy={onOpenCaseStudy} />
      <main>
        <div
          id="hero"
          className="flex min-h-[calc(100dvh-98px)] scroll-mt-[98px] flex-col md:min-h-[calc(100dvh-82px)] md:scroll-mt-[82px]"
        >
          <Hero />
        </div>
        <div className="relative z-0">
          <ScrollDrawLine />
          <CaseStudiesSection onOpenCaseStudy={onOpenCaseStudy} />
          <AboutSection />
          <StatsRow />
          <TimelineSection />
        </div>
        <ContactSection />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
