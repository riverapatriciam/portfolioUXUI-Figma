import { useEffect } from "react";
import { ArrowLeft, MoreVertical } from "lucide-react";
import CaseStudyLuhImport, { CaseStudyLuhMobile } from "@/imports/CaseStudyLuh";
import { Footer } from "@/imports/Home-1";
import { FrameWrapper, useFrameScale } from "./FrameWrapper";

/**
 * The Figma "Case study – LUH" frame is 1024 px wide.
 *
 * Frame height calculation:
 *  - Deepest fixed-top content: top-[5271px] (Key learnings) + ~200px ≈ 5471 px
 *  - Footer social bar:  absolute bottom-[47px]  h-[89px]
 *  - Footer copyright:   absolute bottom-0       h-[47px]
 *
 * At FRAME_H = 5700 px:
 *  - Social bar top:   5700 − 47 − 89 = 5564 px  (93 px gap after content ✓)
 *  - Copyright top:    5700 − 47      = 5653 px
 */
const FRAME_H = 5700;

function BackButton({ onBack }: { onBack: () => void }) {
  const scale = useFrameScale();
  return (
    <div
      className="fixed z-[200]"
      style={{ top: Math.round(20 * scale), left: "50%", transform: "translateX(-50%)" }}
    >
      <button
        onClick={onBack}
        aria-label="Back to Home"
        className="
          flex items-center gap-1.5
          bg-[#d7b8ff]/80 backdrop-blur-md
          border border-[#fad89e]/60
          text-[#543976] font-medium
          rounded-full shadow-sm
          transition-all duration-150
          hover:bg-[#d7b8ff] hover:shadow-md active:scale-95 cursor-pointer
        "
        style={{
          fontSize: Math.round(14 * scale),
          padding: `${Math.round(6 * scale)}px ${Math.round(16 * scale)}px`,
        }}
      >
        <ArrowLeft size={Math.round(15 * scale)} />
        Back to Home
      </button>
    </div>
  );
}

/** Mobile-only nav bar — the desktop `BackButton` is a floating scaled pill; the mobile Figma design wants a full-width bar instead. */
function MobileNavBar({ onBack }: { onBack: () => void }) {
  return (
    <div className="mx-[12px] mt-[12px] flex items-center justify-between rounded-full bg-[#d7b8ff] px-[20px] py-[16px]">
      <button onClick={onBack} aria-label="Back to Home" className="flex items-center gap-1.5 text-[#3e2859] font-medium">
        <ArrowLeft size={18} />
        Back
      </button>
      <MoreVertical className="text-[#3e2859]" size={20} />
    </div>
  );
}

export default function CaseStudyLuh({ onBack }: { onBack: () => void }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      {/* Tablet/desktop: unchanged — the entire Figma frame, uniformly scaled. */}
      <div className="hidden md:contents">
        <BackButton onBack={onBack} />
        <FrameWrapper frameH={FRAME_H}>
          <CaseStudyLuhImport />
        </FrameWrapper>
      </div>

      {/* Mobile: hand-built responsive tree matching the native mobile Figma frame. */}
      <div className="md:hidden">
        <MobileNavBar onBack={onBack} />
        <CaseStudyLuhMobile />
        <Footer />
      </div>
    </>
  );
}
