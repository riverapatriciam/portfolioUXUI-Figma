import { Container } from "../components/layout/Grid";
import { GradientButton, GradientText } from "../components/primitives";
import { ChatMailIcon, MapIcon } from "../components/icons";
import { DrawPath } from "../components/DrawPath";
import { CONTACT_EMAIL } from "../content/site";

/**
 * Same curve family as `HERO_CURVE_DESKTOP`, vertically compressed to fit the
 * Contact section's much shorter canvas (567 tall vs. Hero's 1025) — Y values
 * scaled by 567/1025, X left untouched since the section is the same 1440
 * width. No exact Figma coordinates were given for this curve, so it reuses
 * the established curve shape/gradient rather than an unrelated new one.
 */
const CONTACT_CURVE_DESKTOP =
  "M1440 -1.66C1202.98 1.49 799.332 90.9 698.055 206.7C596.778 322.6 707.755 451.5 981.63 460.8C1212.69 468.7 1343.97 407.7 1343.97 322.6C1343.97 237.6 1198.3 151.7 999.634 123.9C800.971 96.1 94.5248 -2.88 0 566.5";
/** Same curve, X compressed by 834/1440 to fit the tablet canvas (height barely changes: 567 -> 568). */
const CONTACT_CURVE_TABLET =
  "M834 -1.66C696.5 1.49 462.8 90.9 404.2 206.7C345.5 322.6 409.8 451.5 568.4 460.8C702.3 468.7 778.2 407.7 778.2 322.6C778.2 237.6 693.8 151.7 578.8 123.9C463.8 96.1 54.7 -2.88 0 566.5";

/** Decorative background curve behind the Contact card, tablet/desktop only (no mobile spec given). */
function ContactCurve() {
  return (
    <div
      className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
      aria-hidden
    >
      <svg
        className="h-full w-full lg:hidden"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 834 568"
      >
        <DrawPath d={CONTACT_CURVE_TABLET} stroke="url(#contact-curve-tablet)" strokeWidth="8" />
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="contact-curve-tablet"
            x1="0"
            x2="834"
            y1="284"
            y2="284"
          >
            <stop stopColor="#E9A8FF" />
            <stop offset="1" stopColor="#0FF5E5" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        className="hidden h-full w-full lg:block"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 1440 567"
      >
        <DrawPath d={CONTACT_CURVE_DESKTOP} stroke="url(#contact-curve-desktop)" strokeWidth="8" />
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="contact-curve-desktop"
            x1="0"
            x2="1440"
            y1="283.5"
            y2="283.5"
          >
            <stop stopColor="#E9A8FF" />
            <stop offset="1" stopColor="#0FF5E5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#825db1] pb-[40px] pt-[60px] md:flex md:min-h-[568px] md:flex-col md:pt-[80px] lg:min-h-[567px]"
    >
      <ContactCurve />
      {/* `md:flex-1` (not `h-full`) — the section only has `min-height`, and
          percentage heights don't resolve against a `min-height`-only parent
          (it isn't a "definite" height per spec), but flex-grow distributes
          leftover space fine regardless of whether the flex container's own
          height came from content or a min-height floor. */}
      <Container className="relative flex flex-col items-center md:flex-1 lg:items-stretch">
        <div className="flex justify-center ">
          <div className="flex items-center gap-[10px] rounded-full border-3 border-[#ff99b9] px-[20px] py-[10px] bg-[rgba(255, 255, 255, 0.20);] backdrop-blur-[15px]">
            <MapIcon className="size-[24px]" />
            <span className="text-[16px] text-[#fff3ff] md:text-[18px]">Madrid, Spain</span>
          </div>
        </div>

        <div className="relative mt-[32px] gap-[10px] flex w-full flex-1 flex-col items-center justify-center overflow-hidden rounded-[20px] bg-[rgba(229,217,230,0.24)] px-[24px] py-[40px] backdrop-blur-[32px] md:mx-auto md:mt-[60px] md:w-auto md:justify-center md:gap-[31px] md:px-[44px] md:pb-[34px] md:pt-[55px] lg:mx-[140px] lg:w-auto lg:gap-[60px] lg:px-[18px] lg:py-[60px]">
          <h2 className="text-center text-[30px] font-extrabold leading-[1.15] md:text-[40px] lg:text-[52px] lg:leading-[1.1]">
            <GradientText className="from-[#ff99b9] to-[#fff08f]">
              Let's build meaningful products together
            </GradientText>
          </h2>
          <GradientButton
            href={`mailto:${CONTACT_EMAIL}`}
            target="_blank"
            className="w-full text-[20px] sm:w-auto md:text-[24px]"
          >
            Get in touch
            <ChatMailIcon className="size-[26px] text-[#543976] md:size-[30px]" />
          </GradientButton>
        </div>
      </Container>
    </section>
  );
}
