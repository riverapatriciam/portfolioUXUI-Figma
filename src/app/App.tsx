import { useState, useEffect, startTransition } from "react";
import Home from "@/imports/Home-1";
import CaseStudy from "./CaseStudy";
import CaseStudyLuh from "./CaseStudyLuh";
import CaseStudyCove from "./CaseStudyCove";
import { FrameWrapper, FRAME_W } from "./FrameWrapper";

/**
 * The Figma "Home" frame is 1024 px wide.
 *  - Deepest fixed-top element: copyright bar top-[5329px] + h-[47px] = 5376 px.
 *  - 5400 gives 24 px safety margin.
 */
const FRAME_H = 5400;

/**
 * Transparent click-catcher rectangles over each card's "View work ➤" button.
 *
 * All cards share the same in-card button offset:
 *   left-[720px] top-[506px]  (~120 × 40 px gradient pill)
 *
 * Card positions (absolute within the 1024 px frame):
 *   Card-luh   top-[918px]   left-[60px]
 *   Card-AF    top-[1546px]  left-[60px]
 *   Card-cove  top-[2174px]  left-[60px]
 */
const LUH_BTN  = { top: 918  + 506, left: 60 + 720, width: 150, height: 44 };
const AS_BTN   = { top: 1546 + 506, left: 60 + 720, width: 150, height: 44 };
const COVE_BTN = { top: 2174 + 506, left: 60 + 720, width: 150, height: 44 };

type Page = "home" | "case-study-luh" | "case-study-as" | "case-study-cove";

function Overlay({
  btn,
  label,
  onClick,
}: {
  btn: { top: number; left: number; width: number; height: number };
  label: string;
  onClick: () => void;
}) {
  return (
    <div
      role="button"
      aria-label={label}
      onClick={onClick}
      style={{
        position: "absolute",
        top: btn.top,
        left: btn.left,
        width: btn.width,
        height: btn.height,
        cursor: "pointer",
        zIndex: 10,
        background: "transparent",
      }}
    />
  );
}

function HomePage({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <FrameWrapper frameH={FRAME_H}>
      {/*
       * The imported Figma frame — rendered exactly as exported.
       * Every SVG, illustration, glassmorphism card, skills ticker,
       * profile photo, timeline, and footer is intact and unmodified.
       */}
      <Home />

      {/* Transparent overlays wire the design's "View work ➤" buttons to routes */}
      <Overlay btn={LUH_BTN}  label="View Level Up Habits case study" onClick={() => onNav("case-study-luh")} />
      <Overlay btn={AS_BTN}   label="View AfterStory case study"       onClick={() => onNav("case-study-as")} />
      <Overlay btn={COVE_BTN} label="View Cove case study"             onClick={() => onNav("case-study-cove")} />
    </FrameWrapper>
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
