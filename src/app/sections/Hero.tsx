import { ChevronDown } from "lucide-react";
import { Container } from "../components/layout/Grid";
import { GradientButton, GradientText } from "../components/primitives";
import { DrawPath } from "../components/DrawPath";
import { scrollToCaseStudies } from "../components/scroll";
import { SkillsMarquee } from "./SkillsMarquee";

const HERO_CURVE_MOBILE =
  "M785 -1C652.662 4.02065 427.293 146.77 370.747 331.768C314.201 516.766 376.163 722.34 529.076 737.275C658.085 749.875 731.386 652.508 731.386 516.766C731.386 381.024 650.049 243.799 539.129 199.463C428.209 155.126 33.7764 -2.95445 -19 906";
const HERO_CURVE_TABLET =
  "M964.234 3.99878C806.178 7.86252 537.011 117.718 469.476 260.087C401.94 402.456 475.944 560.659 658.574 572.153C812.655 581.85 900.201 506.919 900.201 402.456C900.201 297.993 803.057 192.389 670.581 158.269C538.104 124.148 67.0173 2.49469 3.98438 701.999";
const HERO_CURVE_DESKTOP =
  "M1440 -3C1202.98 2.6849 799.332 164.32 698.055 373.794C596.778 583.269 707.755 816.041 981.63 832.952C1212.69 847.22 1343.97 736.97 1343.97 583.269C1343.97 429.568 1198.3 274.187 999.634 223.985C800.971 173.782 94.5248 -5.21301 0 1024";

/**
 * Decorative background curve for the first screen (nav + hero combined).
 * Rendered at the page root, behind everything, flush to the viewport
 * edges with no margin — its bounds are always exactly the viewport width
 * and 100dvh tall (nav + hero), clipped beyond that.
 */
export function HeroCurve() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-[100dvh] overflow-hidden"
      aria-hidden
    >
      <svg
        className="mx-auto block h-[907px] w-[804px] md:hidden"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 440 907"
      >
        <DrawPath d={HERO_CURVE_MOBILE} stroke="url(#hero-curve-mobile)" strokeWidth="8" />
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="hero-curve-mobile"
            x1="-19"
            x2="785"
            y1="452.5"
            y2="452.5"
          >
            <stop stopColor="#E9A8FF" />
            <stop offset="1" stopColor="#0FF5E5" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        className="hidden h-[698px] w-full md:block lg:hidden"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 774 703"
      >
        <DrawPath d={HERO_CURVE_TABLET} stroke="url(#hero-curve-tablet)" strokeWidth="8" />
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="hero-curve-tablet"
            x1="3.98438"
            x2="964.234"
            y1="352.999"
            y2="352.999"
          >
            <stop stopColor="#E9A8FF" />
            <stop offset="1" stopColor="#0FF5E5" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        className="mx-auto hidden h-[1027px] w-[1440px] lg:block"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 1440 1025"
      >
        <DrawPath d={HERO_CURVE_DESKTOP} stroke="url(#hero-curve-desktop)" strokeWidth="8" />
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="hero-curve-desktop"
            x1="0"
            x2="1440"
            y1="510.5"
            y2="510.5"
          >
            <stop stopColor="#E9A8FF" />
            <stop offset="1" stopColor="#0FF5E5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative flex flex-1 flex-col overflow-hidden">
      <Container className="relative flex flex-1 flex-col items-center justify-center gap-[20px] py-[48px] text-center md:gap-[28px] lg:gap-[32px]">
        <h1 className="max-w-[900px] text-[32px] font-extrabold leading-[1.15] text-[#3e2859] md:text-[42px] lg:text-[52px] lg:leading-[1.1]">
          Design products with{" "}
          <GradientText className="from-[#fe85ea] to-[#5102a0]">empathy</GradientText>, strategy,
          and technical understanding
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
