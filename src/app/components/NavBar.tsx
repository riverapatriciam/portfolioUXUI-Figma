import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, ChevronUp, MoreVertical, X } from "lucide-react";
import type { CaseStudyId, HomeAnchor } from "../router";
import { CV_DOWNLOAD_NAME, CV_PDF_URL, NAV_LINKS, PROJECT_LINKS } from "../content/site";
import { GradientButton, GradientText } from "./primitives";
import { CvIcon } from "./icons";
import { scrollToHero } from "./scroll";

export type NavCta = {
  label: string;
  icon: ReactNode;
  href: string;
  download?: string;
  target?: string;
};

export function NavBar({
  onOpenCaseStudy,
  variant = "home",
  onBack,
  onNavigateHome,
  cta,
}: {
  onOpenCaseStudy: (id: CaseStudyId) => void;
  variant?: "home" | "back";
  onBack?: () => void;
  onNavigateHome?: (anchor: HomeAnchor) => void;
  cta?: NavCta;
}) {
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
    // Collapse the mobile "Projects" submenu whenever the menu itself closes —
    // `open` is flipped from several places (toggle, click-outside, item click),
    // so resetting here beats duplicating the reset at every call site.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!open) setMobileProjectsOpen(false);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 pt-[16px] md:pt-0">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-[12px] pl-[20px] pr-[20px] md:pl-0 md:pr-[44px] lg:pr-[60px]">
        <div className="flex h-[82px] w-full items-center justify-between gap-[16px] rounded-full bg-[#d7b8ff] px-[20px] py-[6px] md:w-[632px] md:rounded-[0_46px_10px_82px] md:py-[10px] md:pl-[44px] md:pr-[20px] lg:w-[932px] lg:[border-radius:0_46px_10px_150px/0_46px_10px_82px] lg:pl-[60px] lg:pr-[20px]">
          {variant === "back" ? (
            <button
              type="button"
              onClick={onBack}
              className="shrink-0 cursor-pointer whitespace-nowrap text-[18px] font-medium text-[#543976] transition-colors duration-200 hover:text-[#9b72ce]"
            >
              {"< Back"}
            </button>
          ) : (
            <button
              type="button"
              onClick={scrollToHero}
              className="group flex shrink-0 cursor-pointer items-center gap-[2px] text-[20px] font-bold lg:text-[24px] hover:scale-[1.08]"
            >
              <GradientText className="inline-block from-[#fad89e] to-[#f29bfd] text-shadow-[0px_0px_30px_#f29bfd] transition-transform duration-300 group-hover:rotate-[25deg]">
                ❋
              </GradientText>
              <GradientText className="inline-block from-[#5102a0] to-[#fe85ea] whitespace-nowrap transition-transform duration-300">
                Patricia Rivera
              </GradientText>
            </button>
          )}

          <nav className="hidden items-center gap-[20px] md:flex">
            <div ref={projectsRef} className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={projectsOpen}
                onClick={() => setProjectsOpen((v) => !v)}
                className="cursor-pointer font-normal text-[18px] text-[#543976] whitespace-nowrap transition-colors duration-200 hover:text-[#9b72ce]"
              >
                Projects
              </button>
              {projectsOpen && (
                <div
                  role="menu"
                  className="absolute left-0 top-[calc(100%+12px)] bg-[#FFF3FF] z-40 w-[240px] overflow-hidden rounded-2xl border border-[#ff99b9] shadow-[0_0_25px_0_rgba(0,0,0,0.05)]"
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
            {NAV_LINKS.filter((l) => l.label !== "Projects").map((l) =>
              variant === "back" ? (
                <button
                  key={l.label}
                  type="button"
                  onClick={() => onNavigateHome?.(l.href.slice(1) as HomeAnchor)}
                  className="font-normal text-[18px] text-[#543976] whitespace-nowrap transition-colors duration-200 hover:text-[#9b72ce]"
                >
                  {l.label}
                </button>
              ) : (
                <a
                  key={l.label}
                  href={l.href}
                  className="font-normal text-[18px] text-[#543976] whitespace-nowrap transition-colors duration-200 hover:text-[#9b72ce]"
                >
                  {l.label}
                </a>
              ),
            )}
          </nav>

          <div ref={mobileMenuRef} className="relative shrink-0 md:hidden">
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex size-[36px] items-center justify-center rounded-full text-[#543976]"
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

                {variant === "back" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        onNavigateHome?.("about");
                      }}
                      className="block w-full px-[20px] py-[14px] text-left text-[16px] text-[#543976] transition-colors hover:bg-[#fed5ff]"
                    >
                      About me
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        onNavigateHome?.("contact");
                      }}
                      className="block w-full px-[20px] py-[14px] text-left text-[16px] text-[#543976] transition-colors hover:bg-[#fed5ff]"
                    >
                      Contact
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
                <a
                  href={cta?.href ?? CV_PDF_URL}
                  download={cta?.download ?? (cta ? undefined : CV_DOWNLOAD_NAME)}
                  target={cta?.target}
                  rel={cta?.target === "_blank" ? "noopener noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  className="block w-full px-[20px] py-[14px] text-left text-[16px] text-[#543976] transition-colors hover:bg-[#fed5ff]"
                >
                  {cta?.label ?? "Download CV"}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:block lg:hidden">
          <a
            href={cta?.href ?? CV_PDF_URL}
            download={cta?.download ?? (cta ? undefined : CV_DOWNLOAD_NAME)}
            target={cta?.target}
            rel={cta?.target === "_blank" ? "noopener noreferrer" : undefined}
            aria-label={cta?.label ?? "Download CV"}
            className="flex size-[56px] items-center justify-center rounded-full bg-gradient-to-r from-[#fad89e] to-[#f29bfd] text-[#543976] drop-shadow-[0px_0px_2px_rgba(0,0,0,0.04),0px_4px_4px_rgba(0,0,0,0.06)]"
          >
            {cta?.icon ?? <CvIcon className="size-[24px]" />}
          </a>
        </div>

        <div className="hidden lg:block">
          <GradientButton
            href={cta?.href ?? CV_PDF_URL}
            download={cta?.download ?? (cta ? undefined : CV_DOWNLOAD_NAME)}
            target={cta?.target}
          >
            {cta?.label ?? "Download CV"}
            {cta?.icon ?? <CvIcon className="size-[24px]" />}
          </GradientButton>
        </div>
      </div>
    </header>
  );
}
