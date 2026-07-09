import { useState, useEffect, startTransition } from "react";
import Home, { type CaseStudyId } from "@/imports/Home-1";
import CaseStudy from "./CaseStudy";
import CaseStudyLuh from "./CaseStudyLuh";
import CaseStudyCove from "./CaseStudyCove";

type Page = "home" | "case-study-luh" | "case-study-as" | "case-study-cove";

const CASE_STUDY_PAGE: Record<CaseStudyId, Page> = {
  luh: "case-study-luh",
  as: "case-study-as",
  cove: "case-study-cove",
};

function HomePage({
  onNav,
  scrollToId,
  onScrolled,
}: {
  onNav: (p: Page) => void;
  scrollToId: "about" | "contact" | null;
  onScrolled: () => void;
}) {
  return (
    <Home
      onOpenCaseStudy={(id) => onNav(CASE_STUDY_PAGE[id])}
      scrollToId={scrollToId}
      onScrolled={onScrolled}
    />
  );
}

export default function App() {
  const [page, setPage] = useState<Page>(() => {
    const h = window.location.hash;
    if (h === "#case-study-luh")  return "case-study-luh";
    if (h === "#case-study-as")   return "case-study-as";
    if (h === "#case-study-cove") return "case-study-cove";
    return "home";
  });
  const [pendingScroll, setPendingScroll] = useState<"about" | "contact" | null>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.style.backgroundColor = "#fff3ff";
  }, []);

  const navigate = (target: Page) => {
    window.location.hash = target === "home" ? "" : target;
    startTransition(() => setPage(target));
  };

  const goTo = (target: Page) => {
    navigate(target);
    window.scrollTo(0, 0);
  };

  const openCaseStudy = (id: CaseStudyId) => goTo(CASE_STUDY_PAGE[id]);

  const goToSection = (anchor: "about" | "contact") => {
    setPendingScroll(anchor);
    navigate("home");
  };

  if (page === "case-study-luh")
    return <CaseStudyLuh onBack={() => goTo("home")} onOpenCaseStudy={openCaseStudy} onNavigateHome={goToSection} />;
  if (page === "case-study-as")
    return <CaseStudy onBack={() => goTo("home")} onOpenCaseStudy={openCaseStudy} onNavigateHome={goToSection} />;
  if (page === "case-study-cove")
    return <CaseStudyCove onBack={() => goTo("home")} onOpenCaseStudy={openCaseStudy} onNavigateHome={goToSection} />;

  return (
    <HomePage
      onNav={goTo}
      scrollToId={pendingScroll}
      onScrolled={() => setPendingScroll(null)}
    />
  );
}
