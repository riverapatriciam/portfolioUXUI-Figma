import { useEffect } from "react";
import CaseStudyCoveImport, { CaseStudyCoveMobile } from "@/imports/CaseStudyCove";
import { Footer, NavBar, type CaseStudyId } from "@/imports/Home-1";
import { FrameWrapper } from "./components/FrameWrapper";

/**
 * The Figma "Case study – Cove" frame is 1024 px wide.
 *
 * The frame no longer includes its own footer (the embedded copyright/social
 * bars were removed in favor of the shared `Home-1` `Footer`, rendered after
 * `FrameWrapper` below) — height only needs to cover the deepest real
 * content, "Key learnings" (~top-[5474px]), plus a little breathing room.
 */
const FRAME_H = 5880;

const PLAY_DEMO_URL =
  "https://www.figma.com/proto/gIEUzqHhcGxGaGPPEPvgo6/Grupo-2---UI?node-id=211-1621&p=f&viewport=279%2C-49%2C0.08&t=0QFF01ppu3W6mVz0-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=271%3A906&page-id=0%3A1";

function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M2.25 5.03294C2.25008 2.12699 5.4165 0.346875 7.95508 1.7263L20.7676 8.69407H20.7666C21.3646 9.01336 21.8647 9.48891 22.2139 10.07C22.564 10.6529 22.749 11.3198 22.749 11.9997C22.749 12.6798 22.5641 13.3475 22.2139 13.9304C21.8648 14.5114 21.3644 14.9861 20.7666 15.3054L7.95508 22.2722L7.95605 22.2732C5.4171 23.6553 2.25032 21.873 2.25 18.9685V5.03294ZM3.75 18.9685C3.75033 20.6815 5.6515 21.8186 7.23828 20.9548L20.0508 13.988L20.0566 13.9851C20.4168 13.7936 20.7186 13.5076 20.9287 13.1579C21.1388 12.8083 21.249 12.4076 21.249 11.9997C21.249 11.5921 21.1386 11.192 20.9287 10.8425C20.7186 10.4929 20.4168 10.2069 20.0566 10.0154L20.0508 10.0115L7.23828 3.04368C5.65105 2.18179 3.75008 3.31924 3.75 5.03294V18.9685Z"
        fill="#543976"
      />
    </svg>
  );
}

export default function CaseStudyCove({
  onBack,
  onOpenCaseStudy,
  onNavigateHome,
}: {
  onBack: () => void;
  onOpenCaseStudy: (id: CaseStudyId) => void;
  onNavigateHome: (anchor: "about" | "contact") => void;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Shared Home-1 header (back variant) — handles its own desktop/tablet/mobile layouts internally. */}
      <NavBar
        variant="back"
        onBack={onBack}
        onOpenCaseStudy={onOpenCaseStudy}
        onNavigateHome={onNavigateHome}
        cta={{
          label: "Play demo",
          icon: <PlayIcon className="size-[24px]" />,
          href: PLAY_DEMO_URL,
          target: "_blank",
        }}
      />

      <main>
        {/* Tablet/desktop: the Figma frame, uniformly scaled. */}
        <div className="hidden md:contents">
          <FrameWrapper frameH={FRAME_H}>
            <CaseStudyCoveImport />
          </FrameWrapper>
        </div>

        {/* Mobile: hand-built responsive tree matching the native 440px Figma mobile frame. */}
        <div className="md:hidden">
          <CaseStudyCoveMobile />
        </div>
      </main>
      <Footer />
    </>
  );
}
