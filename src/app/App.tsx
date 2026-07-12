import { useState, useEffect, startTransition, lazy, Suspense, type ReactNode } from "react";
import Home, { type CaseStudyId } from "@/imports/Home-1";

const CaseStudy = lazy(() => import("./CaseStudy"));
const CaseStudyLuh = lazy(() => import("./CaseStudyLuh"));
const CaseStudyCove = lazy(() => import("./CaseStudyCove"));

function CaseStudyFallback() {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-[#fff3ff] text-[#3e2859]">
      Loading…
    </div>
  );
}

type Page = "home" | "case-study-luh" | "case-study-as" | "case-study-cove";

const CASE_STUDY_PAGE: Record<CaseStudyId, Page> = {
  luh: "case-study-luh",
  as: "case-study-as",
  cove: "case-study-cove",
};

function hashToPage(hash: string): Page {
  if (hash === "#case-study-luh") return "case-study-luh";
  if (hash === "#case-study-as") return "case-study-as";
  if (hash === "#case-study-cove") return "case-study-cove";
  return "home";
}

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
  const [page, setPage] = useState<Page>(() => hashToPage(window.location.hash));
  const [pendingScroll, setPendingScroll] = useState<"about" | "contact" | null>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.style.backgroundColor = "#fff3ff";
  }, []);

  // Reading `location.hash` only in the `useState` initializer above only covers the
  // very first mount — a hash change that doesn't trigger a full page reload (browser
  // back/forward, or a hash-only link opened in a tab that already has this app loaded)
  // never re-runs it, silently stranding the user on whatever page was already showing.
  // No `scrollTo` here: `#about`/`#contact` are real in-page anchors the browser already
  // scrolls to natively while on Home, and `goTo`/`goToSection` above already own scroll
  // behavior for actual page swaps — duplicating it here would fight both.
  useEffect(() => {
    const onHashChange = () => startTransition(() => setPage(hashToPage(window.location.hash)));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
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

  let caseStudyElement: ReactNode = null;
  if (page === "case-study-luh")
    caseStudyElement = <CaseStudyLuh onBack={() => goTo("home")} onOpenCaseStudy={openCaseStudy} onNavigateHome={goToSection} />;
  else if (page === "case-study-as")
    caseStudyElement = <CaseStudy onBack={() => goTo("home")} onOpenCaseStudy={openCaseStudy} onNavigateHome={goToSection} />;
  else if (page === "case-study-cove")
    caseStudyElement = <CaseStudyCove onBack={() => goTo("home")} onOpenCaseStudy={openCaseStudy} onNavigateHome={goToSection} />;

  if (caseStudyElement) {
    return <Suspense fallback={<CaseStudyFallback />}>{caseStudyElement}</Suspense>;
  }

  return (
    <HomePage
      onNav={goTo}
      scrollToId={pendingScroll}
      onScrolled={() => setPendingScroll(null)}
    />
  );
}
