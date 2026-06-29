import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import CaseStudyAs from "@/imports/CaseStudyAs";
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

export default function CaseStudy({ onBack }: { onBack: () => void }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <BackButton onBack={onBack} />
      <FrameWrapper frameH={FRAME_H}>
        {/*
         * CaseStudyAs renders the entire Figma frame with:
         *  - root: `relative size-full`  (fills FRAME_W × FRAME_H)
         *  - all children: `absolute` positioned in pixel-exact Figma coords
         *  - footer bars: `absolute bottom-0` / `absolute bottom-[47px]`
         *  - decorative wave SVG: `absolute h-[6791px] top-[-77px]`
         *  - all SVG illustrations, mockup images, and glassmorphism cards intact
         */}
        <CaseStudyAs />
      </FrameWrapper>
    </>
  );
}
