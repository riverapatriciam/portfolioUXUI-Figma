import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import CaseStudyLuhImport from "@/imports/CaseStudyLuh";
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

export default function CaseStudyLuh({ onBack }: { onBack: () => void }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <BackButton onBack={onBack} />
      <FrameWrapper frameH={FRAME_H}>
        {/*
         * CaseStudyLuhImport renders the entire Figma frame unchanged:
         *  - root:    `relative size-full`  → fills FRAME_W × FRAME_H
         *  - all children: pixel-exact absolute positions from Figma export
         *  - footer bars: `absolute bottom-0` / `absolute bottom-[47px]`
         *  - background wave SVG, illustrations, and phone mockups intact
         *  - Rajdhani, Orbitron, Patrick Hand fonts used throughout
         */}
        <CaseStudyLuhImport />
      </FrameWrapper>
    </>
  );
}
