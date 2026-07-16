import { Container } from "../components/layout/Grid";
import { GradientText, TagPill } from "../components/primitives";
import { SCATTERED_PILLS, STATS } from "../content/site";
import imgProfilePhoto from "../assets/6c3788d3a7dd46350fe3b7ad9766a2b91e9d3616.webp";

/**
 * Ambient blurred gradient swoosh behind the About-me description card —
 * same Ellipse 14/15 pair as `BlurMotionBackdrop`, re-scaled and re-rotated
 * (206.495 x 618.079, -90deg) to match this card's Figma frame. Same at
 * every breakpoint (mobile/tablet/desktop) per Patricia's spec.
 *
 * Nested inside the card (not a sibling) so the card's own `overflow-hidden`
 * clips it to the card's rounded silhouette — the individual ellipses'
 * shape keyframes grow past the wrapper's nominal 618x206 footprint at some
 * points in the loop, and without clipping that growth visibly bled out
 * past the card edge into the page/stats below, reading as "in front of"
 * the card rather than a subtle glow behind it.
 */
function AboutBlurMotion() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -z-10 block w-[206.495px] h-[618.079px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90"
    >
      <div className="blur-motion-about-b absolute left-0 top-0 rounded-full bg-gradient-to-r from-[#fad89e] to-[#f29bfd] opacity-70" />
      <div className="blur-motion-about-a absolute bottom-0 left-0 rounded-full bg-gradient-to-r from-[#fad89e] to-[#f29bfd] opacity-70" />
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-[60px] md:py-[80px] lg:py-[100px]">
      <Container className="flex flex-col items-center gap-[32px] md:items-start lg:block">
        <h2 className="text-center text-[32px] font-extrabold md:w-full md:text-[42px] lg:mb-[24px] lg:text-[52px]">
          <GradientText className="from-[#fe85ea] to-[#5102a0]">About me</GradientText>
        </h2>

        {/* Desktop-only row wrapper: shifts the two columns below to x=172
            (172 = the page's own 60px margin + this row's own 112px inset)
            without pushing the heading above, which stays on the standard
            page margin. `contents` at base/tablet keeps its children (card
            column, photo column) flowing as if this wrapper wasn't there. */}
        <div className="contents lg:flex lg:items-start lg:gap-0 lg:pl-[112px]">
          {/* Card + stats column — mobile/tablet: plain flow (stats live in the
              separate StatsRow section below). Desktop: becomes its own column
              (via `contents` -> `lg:flex-col`) so the two stack together,
              beside the (overlapping) photo column. */}
          <div className="contents lg:order-1 lg:flex lg:flex-col lg:items-start lg:gap-[50px]">
            <div className="relative w-full max-w-[400px] overflow-hidden rounded-[20px] border-4 border-[#fad89e] bg-[rgba(229,217,230,0.24)] p-[20px] text-[16px] text-[#543976] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-[31px] md:ml-[4px] md:w-auto md:p-8 md:max-w-none md:text-[18px] lg:z-10 lg:ml-0 lg:w-[647px] lg:max-w-none">
              <AboutBlurMotion />
              <p>
                Hi, I'm{" "}
                <GradientText className="from-[#fe85ea] to-[#5102a0]">Patricia ✨</GradientText>
              </p>
              <p className="mt-[16px]">
                After working as a Frontend Developer, I discovered that what I truly enjoy is
                <GradientText className="from-[#fe85ea] to-[#5102a0] font-bold">
                  {" "}
                  designing experiences
                </GradientText>
                , not just building them.
              </p>
              <p className="mt-[16px]">
                Today, I focus on
                <GradientText className="from-[#fe85ea] to-[#5102a0] font-bold">
                  {" "}
                  UX/UI Design
                </GradientText>
                , combining creativity, empathy, and problem-solving to create products people love
                using.
              </p>
            </div>

            {/* Same stats as StatsRow, desktop-only vertical layout — StatsRow
                itself hides at lg so these aren't rendered twice. */}
            <div className="hidden lg:flex lg:w-[312px] lg:flex-col lg:items-center lg:gap-[50px]">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-[3px] text-center">
                  <GradientText className="from-[#fe85ea] to-[#5102a0] text-[44px] font-extrabold leading-[1.1]">
                    {s.value}
                  </GradientText>
                  <p className="text-[18px] font-normal leading-[1.5] text-[#6b4a94]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto h-[390px] w-full max-w-[400px] md:h-[778px] md:w-[699px] md:max-w-none lg:order-2 lg:mx-0 lg:-ml-[250px]">
            <AboutBlurMotion />
            <img
              alt="Patricia Rivera"
              className="absolute left-[111px] top-[32px] h-[357px] w-[228px] aspect-[76/119] rounded-[20px] object-cover md:left-[178px] md:top-[64px] md:h-[714px] md:w-[456px]"
              src={imgProfilePhoto}
            />

            {/* Scattered floating pills, positioned relative to the (699x778
                tablet/desktop, 400x390 mobile) photo frame. The pill
                coordinates are calibrated for the 699x778 frame — mobile
                scales the whole group down (~0.5, matching the frame's own
                height ratio 390/778) rather than re-deriving new coordinates,
                same technique as `BlurMotionBackdrop`'s responsive scale. */}
            <div className="pointer-events-none absolute left-0 top-0 h-[778px] w-[699px] origin-top-left scale-[0.5] md:scale-100">
              {SCATTERED_PILLS.map((p) => (
                <div
                  key={p.label}
                  className="pointer-events-auto absolute"
                  style={{ top: p.top - 8, left: p.left }}
                >
                  <TagPill>{p.label}</TagPill>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function StatsRow() {
  return (
    <section className="pb-[60px] md:pb-[80px] lg:hidden">
      <Container>
        {/* max-w caps the row at each breakpoint's design-canvas content
            width (400 mobile, 746 = 834 - 2*44 tablet) so it doesn't stretch
            past spec on real viewports wider than that canvas — see the
            `w-full max-w-[Npx]` convention in LEARNINGS.md. */}
        <div className="flex w-full max-w-[400px] mx-auto flex-col items-center gap-[20px] md:max-w-[746px] md:flex-row md:flex-nowrap md:justify-between md:gap-0">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex shrink-0 flex-col items-center gap-[3px] self-stretch text-center md:w-[211px] md:self-auto"
            >
              <GradientText className="from-[#fe85ea] to-[#5102a0] text-[36px] font-extrabold leading-[1.1] md:text-[44px]">
                {s.value}
              </GradientText>
              <p className="text-[13px] font-medium text-[#6b4a94] md:text-[14px]">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
