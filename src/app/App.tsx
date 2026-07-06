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

function HomePage({ onNav }: { onNav: (p: Page) => void }) {
  return <Home onOpenCaseStudy={(id) => onNav(CASE_STUDY_PAGE[id])} />;
}

export default function App() {
  const [page, setPage] = useState<Page>(() => {
    const h = window.location.hash;
    if (h === "#case-study-luh")  return "case-study-luh";
    if (h === "#case-study-as")   return "case-study-as";
    if (h === "#case-study-cove") return "case-study-cove";
    return "home";
  });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.style.backgroundColor = "#fff3ff";
  }, []);

  const goTo = (target: Page) => {
    window.location.hash = target === "home" ? "" : target;
    window.scrollTo(0, 0);
    startTransition(() => setPage(target));
  };

  if (page === "case-study-luh")  return <CaseStudyLuh  onBack={() => goTo("home")} />;
  if (page === "case-study-as")   return <CaseStudy     onBack={() => goTo("home")} />;
  if (page === "case-study-cove") return <CaseStudyCove onBack={() => goTo("home")} />;

  return <HomePage onNav={goTo} />;
}
