import { useEffect, lazy, Suspense, type ReactNode } from "react";
import Home from "@/imports/Home-1";
import { useRouter } from "./router";

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
  if (page === "case-study-luh") caseStudyElement = <CaseStudyLuh {...caseStudyProps} />;
  else if (page === "case-study-as") caseStudyElement = <CaseStudy {...caseStudyProps} />;
  else if (page === "case-study-cove") caseStudyElement = <CaseStudyCove {...caseStudyProps} />;

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
