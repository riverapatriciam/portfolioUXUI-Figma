import { useEffect, lazy, Suspense, type ReactNode } from "react";
import Home from "./pages/HomePage";
import { useRouter } from "./router";

const AfterStory = lazy(() => import("./pages/case-studies/AfterStory"));
const LevelUpHabits = lazy(() => import("./pages/case-studies/LevelUpHabits"));
const Cove = lazy(() => import("./pages/case-studies/Cove"));

function CaseStudyFallback() {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-[#fff3ff] text-[#3e2859]">
      Loading…
    </div>
  );
}

export default function App() {
  const { page, goTo, openCaseStudy, goToSection, pendingScroll, clearPendingScroll } = useRouter();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.style.backgroundColor = "#fff3ff";
  }, []);

  const caseStudyProps = {
    onBack: () => goTo("home"),
    onOpenCaseStudy: openCaseStudy,
    onNavigateHome: goToSection,
  };

  let caseStudyElement: ReactNode = null;
  if (page === "case-study-luh") caseStudyElement = <LevelUpHabits {...caseStudyProps} />;
  else if (page === "case-study-as") caseStudyElement = <AfterStory {...caseStudyProps} />;
  else if (page === "case-study-cove") caseStudyElement = <Cove {...caseStudyProps} />;

  if (caseStudyElement) {
    return <Suspense fallback={<CaseStudyFallback />}>{caseStudyElement}</Suspense>;
  }

  return (
    <Home
      onOpenCaseStudy={openCaseStudy}
      scrollToId={pendingScroll}
      onScrolled={clearPendingScroll}
    />
  );
}
