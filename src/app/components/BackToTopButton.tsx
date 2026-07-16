import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { scrollToHero } from "./scroll";

/**
 * Floating "back to top" shortcut — hidden until the user has scrolled past
 * the Hero into the Case Studies section, then fades in. Mirrors the
 * `scrollToHero` behavior triggered by clicking the "Patricia Rivera" logo
 * in the header, just reachable from anywhere further down the page.
 */
export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = document.getElementById("case-studies");
      setVisible(!!el && el.getBoundingClientRect().top <= 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToHero}
      aria-label="Back to top"
      className={`fixed bottom-[24px] right-[24px] z-40 flex size-[48px] cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#fad89e] to-[#f29bfd] text-[#543976] shadow-[0_0_4px_0_rgba(0,0,0,0.04),0_4px_8px_0_rgba(0,0,0,0.06)] transition-[opacity,box-shadow] duration-300 hover:shadow-[0_0_4px_0_rgba(0,0,0,0.04),0_8px_16px_0_rgba(0,0,0,0.08)] ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ArrowUp size={22} />
    </button>
  );
}
