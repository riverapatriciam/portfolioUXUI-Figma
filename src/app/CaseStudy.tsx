import { useEffect } from "react";
import { ArrowLeft, MoreVertical } from "lucide-react";
import CaseStudyAsImport, { CaseStudyAsMobile } from "@/imports/CaseStudyAs";
import { Footer } from "@/imports/Home-1";
import { FrameWrapper, useFrameScale } from "./FrameWrapper";

/**
 * The Figma "Case study – AfterStory" frame is 1024 px wide.
 *
 * Frame height calculation:
 *  - Frame20 (copyright bar, h=47px) is `absolute bottom-0`.
 *  - Frame22 (social bar,  h=89px) is `absolute bottom-[47px]`.
 *  - Container height 6200 px places the footer at y=6153 / y=6064,
 *    leaving ~147 px breathing room after the deepest content (~5917 px).
 */
const FRAME_H = 6200;

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

export default function CaseStudy({ onBack }: { onBack: () => void }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      {/* Tablet/desktop: unchanged — the entire Figma frame, uniformly scaled. */}
      <div className="hidden md:contents">
        <BackButton onBack={onBack} />
        <FrameWrapper frameH={FRAME_H}>
          <CaseStudyAsImport />
        </FrameWrapper>
      </div>

      {/* Mobile: hand-built responsive tree matching the native mobile Figma frame. */}
      <div className="md:hidden">
        <MobileNavBar onBack={onBack} />
        <CaseStudyAsMobile />
        <Footer />
      </div>
    </>
  );
}
