import { useEffect, useId, useRef, useState, type ReactNode, type SVGProps } from "react";
import { ChevronDown, ChevronUp, MoreVertical, X } from "lucide-react";
import svgPaths from "./svg-qr77o6k7nf";
import imgMobileMockupLuh from "./b3c2d0d39ef8d164ef4f6b454cd7ea3eadde1799.png";
import imgMobileMockupLuh1 from "./43e7918bdb5051d2c77508d8ffa0fcd5b8185746.png";
import imgScreenInsertDesignsHere from "./4c3bf707eed0712579fbc19d8f48018d5c4ee230.png";
import imgScreenInsertDesignsHere1 from "./3a0ca32f84ec842dd6b0cb4828d2a91c5a0a71b4.png";
import imgScreenInsertDesignsHere2 from "./97b01c1ad5125d8dca70471f580fc161e2f8fab0.png";
import imgProfilePhoto from "./6c3788d3a7dd46350fe3b7ad9766a2b91e9d3616.png";
import { Container } from "@/app/components/layout/Grid";

export type CaseStudyId = "luh" | "as" | "cove";

const CV_PDF_URL = "/cv/Patricia-Rivera-CV-EN.pdf";
const CV_DOWNLOAD_NAME = "Patricia Rivera - CV.pdf";

const VIDEO_LUH_URL = "/videos/level-up-habits-preview.mp4";
const VIDEO_AS_URL = "/videos/after-story-preview.mp4";
const VIDEO_COVE_URL = "/videos/cove-preview.mp4";

const IMG_MOCKUP_LUH = "/img/Mockup-luh.svg"
const IMG_MOCKUP_AF = "/img/Mockup-AF.svg"
const IMG_MOCKUP_COVE = "/img/Mockup-cove.svg"

/* ============================== Icons ============================== */

function CvIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" preserveAspectRatio="none" viewBox="0 0 21 27">
      <path d={svgPaths.p3613df80} fill="currentColor" />
      <path clipRule="evenodd" d={svgPaths.p2d758d80} fill="currentColor" fillRule="evenodd" />
      <path d={svgPaths.p23f5a380} fill="currentColor" />
      <path clipRule="evenodd" d={svgPaths.pbc957c0} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

function ChatMailIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" preserveAspectRatio="none" viewBox="0 0 24.003 25.5">
      <path d={svgPaths.p112a9400} fill="currentColor" />
    </svg>
  );
}

function LinkedinIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
      <path d={svgPaths.p5472600} fill="#3E2859" />
    </svg>
  );
}

function WhatsappIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
      <path d={svgPaths.pf262880} fill="#3E2859" />
    </svg>
  );
}

function MapIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
      <path d={svgPaths.p4acd200} fill="#FFF3FF" />
      <path d={svgPaths.pfecb800} fill="#FFF3FF" />
    </svg>
  );
}

/* ============================== Shared bits ============================== */

function GradientText({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`bg-gradient-to-r bg-clip-text text-transparent ${className}`}>{children}</span>
  );
}

function TagPill({
  children,
  textSize = "text-[13px] md:text-[14px]",
}: {
  children: ReactNode;
  textSize?: string;
}) {
  return (
    <span
      className={`relative shrink-0 whitespace-nowrap rounded-[40px] border-3 border-[#fad89e] bg-[#b488eb] px-[14px] py-[8px] font-medium text-[#fff3ff] ${textSize}`}
    >
      {children}
    </span>
  );
}

function GradientButton({
  children,
  className = "",
  onClick,
  href,
  download,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  download?: string;
}) {
  const classes = `inline-flex cursor-pointer items-center justify-center gap-[10px] rounded-[40px] border-2 border-transparent bg-gradient-to-r from-[#fad89e] to-[#f29bfd] px-[20px] py-[10px] text-[#543976] shadow-[0_0_4px_0_rgba(0,0,0,0.04),0_4px_8px_0_rgba(0,0,0,0.06)] transition-[border-color,box-shadow] duration-200 hover:border-[#ff99b9] hover:shadow-[0_0_4px_0_rgba(0,0,0,0.04),0_8px_16px_0_rgba(0,0,0,0.08)] ${className}`;

  if (href) {
    return (
      <a href={href} download={download} onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

/* ============================== Nav ============================== */

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Projects", href: "#case-studies" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const PROJECT_LINKS: { id: CaseStudyId; label: string }[] = [
  { id: "luh", label: "Level Up Habits" },
  { id: "as", label: "After Story" },
  { id: "cove", label: "Cove" },
];

function NavBar({ onOpenCaseStudy }: { onOpenCaseStudy: (id: CaseStudyId) => void }) {
  const [open, setOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!projectsOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (projectsRef.current && !projectsRef.current.contains(e.target as Node)) {
        setProjectsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [projectsOpen]);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (!open) setMobileProjectsOpen(false);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 pt-[16px] md:pt-0">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-[12px] pl-[20px] pr-[20px] md:pl-0 md:pr-[44px] lg:pr-[60px]">
        <div className="flex h-[82px] w-full items-center justify-between gap-[16px] rounded-full bg-[#d7b8ff] px-[20px] py-[6px] md:w-[632px] md:rounded-[0_46px_10px_82px] md:py-[10px] md:pl-[44px] md:pr-[20px] lg:w-[932px] lg:[border-radius:0_46px_10px_150px/0_46px_10px_82px] lg:pl-[60px] lg:pr-[20px]">
          <div className="group flex shrink-0 cursor-default items-center gap-[2px] text-[20px] font-bold lg:text-[24px]">
            <GradientText className="inline-block from-[#fad89e] to-[#f29bfd] text-shadow-[0px_0px_30px_#f29bfd] transition-transform duration-300 group-hover:rotate-[25deg]">❋</GradientText>
            <GradientText className="inline-block from-[#5102a0] to-[#fe85ea] whitespace-nowrap transition-transform duration-300 group-hover:scale-[1.08]">Patricia Rivera</GradientText>
          </div>

          <nav className="hidden items-center gap-[20px] md:flex">
            <div ref={projectsRef} className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={projectsOpen}
                onClick={() => setProjectsOpen((v) => !v)}
                className="font-normal text-[18px] text-[#543976] whitespace-nowrap transition-colors duration-200 hover:text-[#9b72ce]"
              >
                Projects
              </button>
              {projectsOpen && (
                <div
                  role="menu"
                  className="absolute left-0 top-[calc(100%+12px)] z-40 w-[240px] overflow-hidden rounded-2xl border border-[#ff99b9] bg-[#fff3ff] shadow-[0_0_25px_0_rgba(0,0,0,0.05)]"
                >
                  {PROJECT_LINKS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setProjectsOpen(false);
                        onOpenCaseStudy(p.id);
                      }}
                      className="block w-full px-[20px] py-[14px] text-left text-[16px] text-[#543976] transition-colors hover:bg-[#fed5ff]"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {NAV_LINKS.filter((l) => l.label !== "Projects").map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-normal text-[18px] text-[#543976] whitespace-nowrap transition-colors duration-200 hover:text-[#9b72ce]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div ref={mobileMenuRef} className="relative shrink-0 md:hidden">
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex size-[36px] items-center justify-center rounded-full bg-[#fff3ff] text-[#543976]"
            >
              {open ? <X size={20} /> : <MoreVertical size={20} />}
            </button>

            {open && (
              <div
                role="menu"
                className="absolute right-0 top-[calc(100%+12px)] z-40 w-[260px] overflow-hidden rounded-2xl border border-[#ff99b9] bg-[#fff3ff] shadow-[0_0_25px_0_rgba(0,0,0,0.05)]"
              >
                <button
                  type="button"
                  aria-expanded={mobileProjectsOpen}
                  onClick={() => setMobileProjectsOpen((v) => !v)}
                  className="flex w-full items-center justify-between px-[20px] py-[14px] text-left text-[16px] text-[#543976] transition-colors hover:bg-[#fed5ff]"
                >
                  Projects
                  {mobileProjectsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {mobileProjectsOpen && (
                  <>
                    <div className="h-px bg-[#ff99b9]/30" />
                    {PROJECT_LINKS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          onOpenCaseStudy(p.id);
                        }}
                        className="block w-full px-[36px] py-[12px] text-left text-[16px] text-[#543976] transition-colors hover:bg-[#fed5ff]"
                      >
                        {p.label}
                      </button>
                    ))}
                    <div className="h-px bg-[#ff99b9]/30" />
                  </>
                )}

                <a
                  href="#about"
                  onClick={() => setOpen(false)}
                  className="block px-[20px] py-[14px] text-[16px] text-[#543976] transition-colors hover:bg-[#fed5ff]"
                >
                  About me
                </a>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block px-[20px] py-[14px] text-[16px] text-[#543976] transition-colors hover:bg-[#fed5ff]"
                >
                  Contact
                </a>
                <a
                  href={CV_PDF_URL}
                  download={CV_DOWNLOAD_NAME}
                  onClick={() => setOpen(false)}
                  className="block w-full px-[20px] py-[14px] text-left text-[16px] text-[#543976] transition-colors hover:bg-[#fed5ff]"
                >
                  Download CV
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:block lg:hidden">
          <a
            href={CV_PDF_URL}
            download={CV_DOWNLOAD_NAME}
            aria-label="Download CV"
            className="flex size-[56px] items-center justify-center rounded-full bg-gradient-to-r from-[#fad89e] to-[#f29bfd] text-[#543976] drop-shadow-[0px_0px_2px_rgba(0,0,0,0.04),0px_4px_4px_rgba(0,0,0,0.06)]"
          >
            <CvIcon className="size-[24px]" />
          </a>
        </div>

        <div className="hidden lg:block">
          <GradientButton href={CV_PDF_URL} download={CV_DOWNLOAD_NAME}>
            Download CV
            <CvIcon className="size-[24px]" />
          </GradientButton>
        </div>
      </div>
    </header>
  );
}

/* ============================== Hero ============================== */

function scrollToCaseStudies() {
  document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const HERO_CURVE_MOBILE =
  "M785 -1C652.662 4.02065 427.293 146.77 370.747 331.768C314.201 516.766 376.163 722.34 529.076 737.275C658.085 749.875 731.386 652.508 731.386 516.766C731.386 381.024 650.049 243.799 539.129 199.463C428.209 155.126 33.7764 -2.95445 -19 906";
const HERO_CURVE_TABLET =
  "M964.234 3.99878C806.178 7.86252 537.011 117.718 469.476 260.087C401.94 402.456 475.944 560.659 658.574 572.153C812.655 581.85 900.201 506.919 900.201 402.456C900.201 297.993 803.057 192.389 670.581 158.269C538.104 124.148 67.0173 2.49469 3.98438 701.999";
const HERO_CURVE_DESKTOP =
  "M1440 -3C1202.98 2.6849 799.332 164.32 698.055 373.794C596.778 583.269 707.755 816.041 981.63 832.952C1212.69 847.22 1343.97 736.97 1343.97 583.269C1343.97 429.568 1198.3 274.187 999.634 223.985C800.971 173.782 94.5248 -5.21301 0 1024";

/** Animates a path drawing itself along its own trace, from start to end. */
function DrawPath(props: SVGProps<SVGPathElement>) {
  const ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = ref.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    const animation = path.animate(
      [{ strokeDashoffset: length }, { strokeDashoffset: 0 }],
      { duration: 2200, easing: "ease-in-out", fill: "forwards" },
    );
    return () => animation.cancel();
  }, []);

  return <path ref={ref} {...props} />;
}

/**
 * Decorative background curve for the first screen (nav + hero combined).
 * Rendered at the page root, behind everything, flush to the viewport
 * edges with no margin — its bounds are always exactly the viewport width
 * and 100dvh tall (nav + hero), clipped beyond that.
 */
function HeroCurve() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[100dvh] overflow-hidden" aria-hidden>
      <svg className="mx-auto block h-[907px] w-[804px] md:hidden" fill="none" preserveAspectRatio="none" viewBox="0 0 440 907">
        <DrawPath d={HERO_CURVE_MOBILE} stroke="url(#hero-curve-mobile)" strokeWidth="8" />
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="hero-curve-mobile" x1="-19" x2="785" y1="452.5" y2="452.5">
            <stop stopColor="#E9A8FF" />
            <stop offset="1" stopColor="#0FF5E5" />
          </linearGradient>
        </defs>
      </svg>

      <svg className="hidden h-[698px] w-full md:block lg:hidden" fill="none" preserveAspectRatio="none" viewBox="0 0 774 703">
        <DrawPath d={HERO_CURVE_TABLET} stroke="url(#hero-curve-tablet)" strokeWidth="8" />
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="hero-curve-tablet" x1="3.98438" x2="964.234" y1="352.999" y2="352.999">
            <stop stopColor="#E9A8FF" />
            <stop offset="1" stopColor="#0FF5E5" />
          </linearGradient>
        </defs>
      </svg>

      <svg className="mx-auto hidden h-[1027px] w-[1440px] lg:block" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 1025">
        <DrawPath d={HERO_CURVE_DESKTOP} stroke="url(#hero-curve-desktop)" strokeWidth="8" />
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="hero-curve-desktop" x1="0" x2="1440" y1="510.5" y2="510.5">
            <stop stopColor="#E9A8FF" />
            <stop offset="1" stopColor="#0FF5E5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex flex-1 flex-col overflow-hidden">
      <Container className="relative flex flex-1 flex-col items-center justify-center gap-[20px] py-[48px] text-center md:gap-[28px] lg:gap-[32px]">
        <h1 className="max-w-[900px] text-[32px] font-extrabold leading-[1.15] text-[#3e2859] md:text-[42px] lg:text-[52px] lg:leading-[1.1]">
          Design products with{" "}
          <GradientText className="from-[#fe85ea] to-[#5102a0]">empathy</GradientText>, strategy, and
          technical understanding
        </h1>
        <p className="max-w-[320px] text-[16px] text-[#6b4a94] md:max-w-[560px] md:text-[20px] lg:max-w-[800px] lg:text-[24px]">
          My journey helps me create experiences that work for both users and businesses.
        </p>
        <GradientButton onClick={scrollToCaseStudies} className="text-[16px]">
          View work
        </GradientButton>
        <button
          type="button"
          aria-label="Scroll to case studies"
          onClick={scrollToCaseStudies}
          className="cursor-pointer text-[#9b72ce]"
        >
          <ChevronDown className="animate-bounce-soft size-[28px]" aria-hidden />
        </button>
      </Container>

      <SkillsMarquee />
    </section>
  );
}

/* ============================== Skills marquee ============================== */

const SKILLS: string[] = ["UX/UI Designer", "Product Designer", "Figma", "HTML/CSS", "Typescript", "Research"];
const SEO_SKILLS = new Set(["UX/UI Designer", "Product Designer"]);

function SkillsTrack({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <p
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-[8px] whitespace-nowrap px-[8px] text-[18px] leading-[150%]"
    >
      {SKILLS.map((skill, i) => (
        <span key={i} className="flex items-center gap-[8px]">
          <GradientText className="from-[#ff99b9] to-[#fff08f]">{i % 2 === 0 ? "✦" : "✧"}</GradientText>
          <span className={`text-[#452746] ${SEO_SKILLS.has(skill) ? "font-bold" : "font-normal"}`}>{skill}</span>
        </span>
      ))}
    </p>
  );
}

// Repeats per half: the marquee spans the full viewport width (no max-width
// cap), so a single SkillsTrack (~800px) isn't wide enough to cover wide
// desktop screens without the loop exposing empty background near the seam.
// Each half must stay wider than any realistic viewport.
const MARQUEE_REPEATS = 5;

function SkillsMarquee() {
  return (
    <div className="relative flex h-[70px] w-full shrink-0 items-center gap-[10px] overflow-hidden bg-[#d7b8ff] p-[10px]">
      <div className="flex w-max shrink-0 animate-loop-left items-center hover:[animation-play-state:paused]">
        {Array.from({ length: MARQUEE_REPEATS }, (_, i) => (
          <SkillsTrack key={`a${i}`} />
        ))}
        {Array.from({ length: MARQUEE_REPEATS }, (_, i) => (
          <SkillsTrack key={`b${i}`} ariaHidden />
        ))}
      </div>
    </div>
  );
}

/* ============================== Case studies ============================== */

/**
 * Two overlapping phone mockups, matching the design: a small straight-on
 * "vertical" phone (with its own screen/video) sits front-left over a larger
 * tilted background device mockup. Both devices are literal Figma pixel
 * sizes at every breakpoint (mobile/tablet/desktop each have their own),
 * laid out as a flex row with the tilted one pulled left via negative
 * margin to overlap the vertical one by the exact amount Figma specifies.
 */
function DualPhoneMockup({
  title,
  bigImg,
  smallFrameImgs,
  smallScreenImg,
  smallScreenVideo,
}: {
  title: string;
  bigImg: string;
  smallFrameImgs: string[];
  smallScreenImg: string;
  smallScreenVideo?: string;
}) {
  return (
    <div className="relative flex items-end">
      <img
        alt={title}
        className="order-2 -ml-[8px] h-[150px] w-[128px] shrink-0 object-cover md:-ml-[56px] md:h-[282px] md:w-[224px] lg:-ml-[38px] lg:h-[384px] lg:w-[308px]"
        src={bigImg}
      />
      <div className="relative z-10 order-1 ml-[20px] h-[162px] w-[78px] shrink-0 md:ml-[32px] md:h-[298px] md:w-[144px] lg:ml-[70px] lg:h-[398px] lg:w-[194px]">
        {smallFrameImgs[0] && (
          <img alt="" className="absolute inset-0 size-full object-cover" src={smallFrameImgs[0]} />
        )}
        <div className="absolute inset-[1.9%_4.5%] overflow-hidden">
          {smallScreenVideo ? (
            <video
              className="block size-full object-cover"
              src={smallScreenVideo}
              poster={smallScreenImg}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img alt="" className="block size-full object-cover" src={smallScreenImg} />
          )}
        </div>
        {/* Front bezel layer — sits over the screen/video so its rounded frame masks the video's straight rectangular edges. */}
        {smallFrameImgs[1] && (
          <img alt="" className="pointer-events-none absolute inset-0 size-full object-cover" src={smallFrameImgs[1]} />
        )}
      </div>
    </div>
  );
}

/**
 * Ambient blurred gradient blobs behind the mockup — same behavior at every
 * breakpoint. The blobs' own keyframes (`.blur-motion-a/b` in tailwind.css)
 * animate between fixed pixel sizes tuned for the desktop mockup box, so this
 * wrapper is scaled down at smaller breakpoints to match the mockup's own
 * (much smaller) footprint rather than resizing the keyframes themselves.
 */
function BlurMotionBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 origin-center scale-[0.41] md:scale-[0.75] lg:scale-100"
    >
      <div className="blur-motion-a absolute left-[6%] top-[2%] rounded-full bg-gradient-to-r from-[#fad89e] to-[#f29bfd] opacity-70" />
      <div className="blur-motion-b absolute bottom-[4%] right-[8%] rounded-full bg-gradient-to-r from-[#fad89e] to-[#f29bfd] opacity-70" />
    </div>
  );
}

type CaseStudyMeta = { label: string; value: string };

function CaseStudyCard({
  title,
  description,
  meta,
  tags,
  duration,
  mockupImg,
  mobileFrameImgs,
  mobileScreenImg,
  mobileScreenVideo,
  onViewWork,
}: {
  title: string;
  description: string;
  meta: CaseStudyMeta[];
  tags: string[];
  duration: string;
  mockupImg: string;
  mobileFrameImgs: string[];
  mobileScreenImg: string;
  mobileScreenVideo?: string;
  onViewWork: () => void;
}) {
  return (
    <div className="relative mx-auto h-[416px] w-full max-w-[400px] overflow-hidden rounded-[20px] border border-[#fad89e] bg-[rgba(229,217,230,0.24)] p-[16px] backdrop-blur-[7.5px] md:h-[408px] md:max-w-[746px] md:rounded-[30px] md:border-[1.5px] md:p-[32px] md:backdrop-blur-[11.25px] lg:h-[588px] lg:max-w-[1096px] lg:rounded-[40px] lg:border-2 lg:p-[40px] lg:backdrop-blur-[15px]">
      <span className="absolute right-0 top-0 rounded-bl-[20px] bg-[#f7aef8] px-[16px] py-[10px] text-[0.875rem] text-[#543976] md:text-[0.75rem] lg:text-[16px]">
        {duration}
      </span>

      <div className="flex h-full flex-col justify-center gap-[12px] md:flex-row md:items-center md:justify-normal md:gap-[20px] lg:gap-[40px]">
        {/* Base only: mockup + title/description sit side by side as a compact
            row, with Role/tags/button below — the mobile card's fixed height
            doesn't fit the fully stacked layout. md/lg: this wrapper becomes
            `contents` (removes itself from layout) so its two children fall
            back into the tablet/desktop side-by-side column flow, where the
            title/description shown below take over instead — both tablet and
            desktop mockups are tall enough to want a full-height column next
            to a full-height text column, not a compact stacked block. */}
        <div className="flex flex-row items-center gap-[8px] md:contents">
          <div className="relative shrink-0">
            <BlurMotionBackdrop />
            <DualPhoneMockup
              title={title}
              bigImg={mockupImg}
              smallFrameImgs={mobileFrameImgs}
              smallScreenImg={mobileScreenImg}
              smallScreenVideo={mobileScreenVideo}
            />
          </div>

          <div className="flex flex-1 flex-col gap-[4px] text-left md:hidden">
            {/* 1.25rem + font-extrabold clears the WCAG "large text" bold threshold
                (14pt/~18.66px), so the #9b72ce purple only needs 3:1 contrast here
                instead of 4.5:1 — at a smaller size/weight it wouldn't pass AA. */}
            <h3 className="line-clamp-2 text-[1.25rem] font-extrabold leading-[1.2] text-[#9b72ce]">{title}</h3>
            <p className="line-clamp-2 text-[0.75rem] italic leading-[1.3] text-[#543976]">{description}</p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-[8px] text-center md:w-auto md:flex-1 md:items-start md:gap-[12px] md:text-left">
          <h3 className="hidden text-[26px] font-extrabold text-[#9b72ce] md:block md:text-[1.5rem] lg:text-[32px]">{title}</h3>
          <p className="hidden text-[16px] italic text-[#543976] md:block md:text-[0.875rem] lg:text-[18px]">{description}</p>
          {meta.map((m) => (
            <p key={m.label} className="text-[0.75rem] md:text-[18px]">
              {/* #9b72ce only clears AA contrast at large/bold sizes (see title above) —
                  this label is small and regular-weight at every breakpoint, so it uses
                  the darker #543976 instead, which passes 4.5:1 at any size. */}
              <span className="text-[#543976]">{m.label}: </span>
              <span className="text-[#543976]">{m.value}</span>
            </p>
          ))}
          <div className="flex flex-wrap justify-center gap-[8px] md:justify-start md:gap-[10px]">
            {tags.map((t) => (
              <TagPill key={t} textSize="text-[0.8125rem] md:text-[0.75rem] lg:text-[14px]">
                {t}
              </TagPill>
            ))}
          </div>
          <GradientButton
            className="mt-[4px] text-[0.8125rem] md:absolute md:bottom-[20px] md:right-[22px] md:mt-0 md:text-[0.75rem] lg:bottom-[36px] lg:right-[28px] lg:text-[16px]"
            onClick={onViewWork}
          >
            View work ➤
          </GradientButton>
        </div>
      </div>
    </div>
  );
}

function CaseStudiesSection({ onOpenCaseStudy }: { onOpenCaseStudy: (id: CaseStudyId) => void }) {
  return (
    <section id="case-studies" className="scroll-mt-[98px] py-[60px] md:scroll-mt-[82px] md:py-[80px] lg:py-[100px]">
      <Container>
        <h2 className="mb-[32px] text-center text-[32px] font-extrabold md:mb-[40px] md:text-[42px] lg:mb-[48px] lg:text-[52px]">
          <GradientText className="from-[#fe85ea] to-[#5102a0]">Case studies</GradientText>
        </h2>
        <div className="flex flex-col gap-[32px] md:gap-[40px]">
          <CaseStudyCard
            title="Level Up Habits"
            description="Helping people with ADHD build habits through AI-powered gamification."
            meta={[{ label: "Role", value: "Solo UX/UI Designer" }]}
            tags={["UX Research", "UI Design", "Design Thinking"]}
            duration="2 weeks"
            mockupImg={IMG_MOCKUP_LUH}
            mobileFrameImgs={[imgMobileMockupLuh, imgMobileMockupLuh1]}
            mobileScreenImg={imgScreenInsertDesignsHere}
            mobileScreenVideo={VIDEO_LUH_URL}
            onViewWork={() => onOpenCaseStudy("luh")}
          />
          <CaseStudyCard
            title="AfterStory"
            description="Helping anime and manga fans discover stories tailored to their tastes"
            meta={[{ label: "Role", value: "Solo UX/UI Designer" }]}
            tags={["UX Research", "UI Design", "Design Thinking"]}
            duration="3 weeks"
            mockupImg={IMG_MOCKUP_AF}
            mobileFrameImgs={[imgMobileMockupLuh, imgMobileMockupLuh1]}
            mobileScreenImg={imgScreenInsertDesignsHere1}
            mobileScreenVideo={VIDEO_AS_URL}
            onViewWork={() => onOpenCaseStudy("as")}
          />
          <CaseStudyCard
            title="Cove"
            description="Designing a mental health support platform focused on reducing anxiety and stress through professional guidance and crisis assistance."
            meta={[
              { label: "Team", value: "4 Designer" },
              { label: "Role", value: "UI Designer & Prototype Lead" },
            ]}
            tags={["Prototyping", "UI Design", "Design Sprint"]}
            duration="1 week"
            mockupImg={IMG_MOCKUP_COVE}
            mobileFrameImgs={[imgMobileMockupLuh, imgMobileMockupLuh1]}
            mobileScreenImg={imgScreenInsertDesignsHere2}
            mobileScreenVideo={VIDEO_COVE_URL}
            onViewWork={() => onOpenCaseStudy("cove")}
          />
        </div>
      </Container>
    </section>
  );
}

/* ============================== About ============================== */

const SKILL_PILLS = [
  "Product Designer",
  "UX/UI Design",
  "Web UI design",
  "Design system",
  "Token Studio",
  "Supernova",
  "Research",
  "Wireframe",
  "Prototyping",
  "Typescript",
  "IA Agents",
];

/** Scattered floating layout, only meaningful at desktop canvas width. */
const SCATTERED_PILLS: { label: string; top: number; left: number }[] = [
  { label: "Figma", top: 708, left: 94 },
  { label: "UX/UI Design", top: 383, left: 38 },
  { label: "Web UI design", top: 448, left: 13 },
  { label: "Research", top: 23, left: 462 },
  { label: "Typescript", top: 216, left: 609 },
  { label: "IA Agents", top: 281, left: 596 },
  { label: "Supernova", top: 643, left: 45 },
  { label: "Wireframe", top: 82, left: 535 },
  { label: "Product Designer", top: 318, left: 52 },
  { label: "Token Studio", top: 578, left: 7 },
  { label: "Design system", top: 513, left: 0 },
  { label: "Prototyping", top: 151, left: 577 },
];

function AboutSection() {
  return (
    <section id="about" className="py-[60px] md:py-[80px] lg:py-[100px]">
      <Container className="flex flex-col items-center gap-[32px] lg:flex-row lg:items-center lg:gap-[60px]">
        <h2 className="text-center text-[32px] font-extrabold md:text-[42px] lg:hidden">
          <GradientText className="from-[#fe85ea] to-[#5102a0]">About me</GradientText>
        </h2>

        <div className="w-full max-w-[440px] rounded-[20px] border-4 border-[#fad89e] bg-[rgba(229,217,230,0.24)] p-[24px] text-[16px] text-[#543976] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-[31px] md:text-[18px] lg:order-1 lg:w-[442px]">
          <p>
            Hi, I'm <GradientText className="from-[#fe85ea] to-[#5102a0]">Patricia 🌸</GradientText>
          </p>
          <p className="mt-[16px]">
            After working as a Frontend Developer, I discovered that what I truly enjoy is
            <GradientText className="from-[#fe85ea] to-[#5102a0] font-bold"> designing experiences</GradientText>,
            not just building them.
          </p>
          <p className="mt-[16px]">
            Today, I focus on
            <GradientText className="from-[#fe85ea] to-[#5102a0] font-bold"> UX/UI Design</GradientText>, combining
            creativity, empathy, and problem-solving to create products people love using.
          </p>
        </div>

        <div className="relative w-full max-w-[440px] lg:order-2 lg:w-[699px] lg:max-w-none">
          <h2 className="mb-[24px] hidden text-center text-[42px] font-extrabold lg:block lg:text-[52px] lg:text-left">
            <GradientText className="from-[#fe85ea] to-[#5102a0]">About me</GradientText>
          </h2>

          <div className="relative mx-auto w-full max-w-[380px] lg:mx-0 lg:w-[519px]">
            <img alt="Patricia Rivera" className="w-full rounded-[20px] object-cover" src={imgProfilePhoto} />

            {/* Scattered floating pills — desktop only, positioned relative to the 519px-wide photo */}
            <div className="pointer-events-none absolute inset-0 hidden lg:block">
              {SCATTERED_PILLS.map((p) => (
                <div
                  key={p.label}
                  className="pointer-events-auto absolute"
                  style={{ top: p.top - 71, left: p.left }}
                >
                  <TagPill>{p.label}</TagPill>
                </div>
              ))}
            </div>
          </div>

          {/* Same skills, flowing tag list — base/tablet only */}
          <div className="mt-[20px] flex flex-wrap justify-center gap-[10px] lg:hidden">
            {SKILL_PILLS.map((label) => (
              <TagPill key={label}>{label}</TagPill>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ============================== Stats ============================== */

const STATS: { value: string; label: string }[] = [
  { value: "+4", label: "years of experience in digital product development and frontend engineering" },
  { value: "3", label: "Case studies where challenge my UX/UI skills" },
  { value: "+6", label: "diferents digital projects as a frontend developer and Web UI developer" },
];

function StatsRow() {
  return (
    <section className="pb-[60px] md:pb-[80px] lg:pb-[100px]">
      <Container className="flex flex-wrap justify-center gap-x-[48px] gap-y-[32px] lg:gap-x-[100px]">
        {STATS.map((s) => (
          <div key={s.label} className="flex w-[180px] flex-col items-center gap-[3px] text-center md:w-[211px]">
            <GradientText className="from-[#fe85ea] to-[#5102a0] text-[36px] font-extrabold leading-[1.1] md:text-[44px]">
              {s.value}
            </GradientText>
            <p className="text-[13px] font-medium text-[#6b4a94] md:text-[14px]">{s.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}

/* ============================== Timeline ============================== */

const TIMELINE: { role: string; period: string; company: string; desc: string }[] = [
  {
    role: "Web UI Developer",
    period: "August 2023 - May 2026",
    company: "Globant | Iberia | Openbank",
    desc: "Bridged design and development by translating UI concepts into scalable and user-friendly web experiences",
  },
  {
    role: "Frontend Developer",
    period: "June 2022 - August 2023",
    company: "Venpend",
    desc: "Developed intuitive interfaces while gaining a deeper understanding of usability, accessibility, and user-centered thinking.",
  },
  {
    role: "HR Operation Lead",
    period: "May 2018 - Dec 2021",
    company: "Improving",
    desc: "Improved employee experiences through process optimization, stakeholder management, and problem-solving",
  },
  {
    role: "System analyst",
    period: "Dec 2015 - May 2018",
    company: "Esvenca",
    desc: "Connected business goals and technical requirements, building a foundation in problem-solving and systems thinking",
  },
];

function TimelineDot() {
  const uid = useId();
  const ringId = `dot-ring-${uid}`;
  const fillId = `dot-fill-${uid}`;
  return (
    <svg className="size-[40px] shrink-0 lg:size-[48px]" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
      <rect fill="#FFF3FF" height="48" rx="24" width="48" x="1" y="1" />
      <rect height="48" rx="24" stroke={`url(#${ringId})`} strokeDasharray="7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="48" x="1" y="1" />
      <circle cx="25" cy="25" fill={`url(#${fillId})`} r="18" />
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" id={ringId} x1="1" x2="49" y1="25" y2="25">
          <stop stopColor="#FCBFD5" />
          <stop offset="1" stopColor="#8D75FA" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id={fillId} x1="7" x2="43" y1="25" y2="25">
          <stop stopColor="#FCBFD5" />
          <stop offset="1" stopColor="#8D75FA" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function TimelineSection() {
  return (
    <section className="pb-[60px] md:pb-[80px] lg:pb-[100px]">
      <Container>
        {/* Base/tablet: single stacked column */}
        <div className="flex flex-col gap-[10px] lg:hidden">
          {TIMELINE.map((item, i) => (
            <div key={item.role} className="flex gap-[16px]">
              <div className="flex flex-col items-center">
                <TimelineDot />
                {i < TIMELINE.length - 1 && (
                  <div className="w-0 flex-1 border-l-2 border-dashed border-[#8D75FA]" />
                )}
              </div>
              <div className="flex flex-col gap-[6px] pb-[32px]">
                <p className="text-[22px] font-extrabold text-[#3e2859] md:text-[28px]">{item.role}</p>
                <p className="text-[15px] text-[#543976] md:text-[16px]">{item.period}</p>
                <p className="mt-[6px] text-[18px] font-extrabold text-[#3e2859] md:text-[22px]">{item.company}</p>
                <p className="text-[15px] text-[#543976] md:text-[16px]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: three columns (dates | dotted line+dots | descriptions) */}
        <div className="hidden lg:flex lg:items-stretch lg:gap-[24px]">
          <div className="flex flex-col justify-between gap-[24px]">
            {TIMELINE.map((item) => (
              <div key={item.role} className="flex flex-col gap-[14px]">
                <p className="text-[32px] font-extrabold text-[#3e2859]">{item.role}</p>
                <p className="text-[18px] text-[#543976]">{item.period}</p>
              </div>
            ))}
          </div>
          <div className="relative flex flex-col items-center justify-between">
            <div className="absolute bottom-0 top-0 w-0 border-l-2 border-dashed border-[#8D75FA]" />
            {TIMELINE.map((item) => (
              <TimelineDot key={item.role} />
            ))}
          </div>
          <div className="flex flex-col justify-between gap-[24px]">
            {TIMELINE.map((item) => (
              <div key={item.role} className="flex flex-col gap-[14px]">
                <p className="text-[32px] font-extrabold text-[#3e2859]">{item.company}</p>
                <p className="max-w-[444px] text-[18px] text-[#543976]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ============================== Contact + Footer ============================== */

function ContactSection() {
  return (
    <section id="contact" className="relative bg-[#825db1] pb-[40px] pt-[60px] md:pt-[80px]">
      <Container>
        <div className="flex justify-center">
          <div className="flex items-center gap-[10px] rounded-full border-3 border-[#ff99b9] px-[20px] py-[10px]">
            <MapIcon className="size-[24px]" />
            <span className="text-[16px] text-[#fff3ff] md:text-[18px]">Madrid, Spain</span>
          </div>
        </div>

        <div className="relative mt-[32px] overflow-hidden rounded-[20px] bg-[rgba(229,217,230,0.24)] px-[24px] py-[40px] backdrop-blur-[32px] md:px-[40px] md:py-[55px]">
          <h2 className="text-center text-[30px] font-extrabold leading-[1.15] [text-shadow:4px_6px_6px_rgba(73,73,73,0.25)] md:text-[40px] lg:text-[52px] lg:leading-[1.1]">
            <GradientText className="from-[#ff99b9] to-[#fff08f]">
              Let's build meaningful products together
            </GradientText>
          </h2>
          <div className="mt-[32px] flex flex-col items-center justify-center gap-[20px] sm:flex-row">
            <GradientButton className="w-full text-[20px] sm:w-auto md:text-[24px]">
              Get in touch
              <ChatMailIcon className="size-[26px] text-[#543976] md:size-[30px]" />
            </GradientButton>
            <a
              href={CV_PDF_URL}
              download={CV_DOWNLOAD_NAME}
              className="inline-flex w-full items-center justify-center gap-[10px] rounded-[40px] border-4 border-[#fad89e] px-[20px] py-[10px] text-[20px] text-[#ffd6a5] drop-shadow-[0px_0px_2px_rgba(0,0,0,0.04),0px_4px_4px_rgba(0,0,0,0.06)] sm:w-auto md:text-[24px]"
            >
              Download CV
              <CvIcon className="size-[26px] text-[#ffd6a5] md:size-[30px]" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#c79aff]">
      <Container className="flex flex-wrap items-center justify-center gap-x-[24px] gap-y-[12px] py-[20px] text-center md:justify-between">
        <p className="text-[16px] font-bold text-[#3e2859] md:text-[18px]">UX/UI Designer | Product Designer</p>
        <div className="flex items-center gap-[16px]">
          <LinkedinIcon className="size-[26px] md:size-[30px]" />
          <WhatsappIcon className="size-[26px] md:size-[30px]" />
          <span className="text-[14px] font-medium text-[#3e2859] md:text-[18px]">riverapatriciam20@gmail.com</span>
        </div>
      </Container>
      <Container className="flex flex-col items-center justify-between gap-[8px] border-t border-white/20 py-[14px] text-center text-[12px] font-medium md:flex-row md:text-[14px]">
        <p className="text-[#fff3ff]">© 2026 Patricia Rivera. All rights reserved.</p>
        <p className="text-[#e8d6ff]">
          Designed & Built with <GradientText className="from-[#ff99b9] to-[#fff08f]">passion</GradientText>
        </p>
      </Container>
    </footer>
  );
}

/* ============================== Page ============================== */

export default function Home({ onOpenCaseStudy }: { onOpenCaseStudy: (id: CaseStudyId) => void }) {
  return (
    <div className="relative w-full overflow-x-clip bg-[#fff3ff]" data-name="Home">
      <HeroCurve />
      <NavBar onOpenCaseStudy={onOpenCaseStudy} />
      <div className="flex min-h-[calc(100dvh-98px)] flex-col md:min-h-[calc(100dvh-82px)]">
        <Hero />
      </div>
      <CaseStudiesSection onOpenCaseStudy={onOpenCaseStudy} />
      <AboutSection />
      <StatsRow />
      <TimelineSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
