import { Container } from "../components/layout/Grid";
import { TIMELINE } from "../content/site";

function TimelineDot() {
  return (
    <div
      aria-hidden="true"
      className="flex size-[38px] shrink-0 items-center justify-center gap-[10px] rounded-full border-2 border-dashed border-[#fcbfd5] bg-[#fff3ff] md:size-[48px]"
    >
      <div className="size-[28px] rounded-full bg-gradient-to-r from-[#fcbfd5] to-[#8d75fa] md:size-[36px]" />
    </div>
  );
}

export function TimelineSection() {
  return (
    <section className="pb-[60px] md:pb-[80px] lg:pb-[100px]">
      <Container>
        {/* Mobile only: per-row dot + a connecting segment that flex-grows to
            exactly fill the gap to the next dot. A single absolutely-
            positioned line (matching the Figma layer 1:1) doesn't work here
            like it does for tablet/desktop: `justify-between` only lines up
            two columns' items when each column's own per-item size is
            proportionally similar, and a 38px dot vs. a 4-line text block
            aren't. Per-row segments size themselves off each row's own
            actual text height instead, so misalignment can't happen —  each
            segment uses the same gradient, so adjacent rows still read as
            one continuous line (the gradient runs left-right across a 3px
            width, too narrow to show a visible seam between segments). */}
        <div className="flex flex-col gap-[10px] md:hidden">
          {TIMELINE.map((item, i) => (
            <div key={item.role} className="flex gap-[16px]">
              <div className="relative z-0 flex flex-col items-center">
                <TimelineDot />
                {i < TIMELINE.length - 1 && <div className="timeline-line -z-10 w-[3px] flex-1" />}
              </div>
              <div className="flex flex-1 flex-col items-start gap-[20px] px-[20px]">
                <p className="self-stretch text-[18px] font-bold leading-[1.5] text-[#3e2859]">
                  {item.role}
                </p>
                <p className="self-stretch text-[14px] leading-[1.5] text-[#543976]">
                  {item.period}
                </p>
                <p className="self-stretch text-[16px] font-medium leading-[1.5] text-[#3e2859]">
                  {item.company}
                </p>
                <p className="self-stretch text-[14px] leading-[1.5] text-[#543976]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet/Desktop: three columns (dates | dotted line+dots | descriptions).
            Tablet reuses desktop's distribution (not the mobile stack), just at
            smaller type sizes and without desktop's asymmetric 170/100 padding.
            `items-stretch` (not the literal `align-items:flex-start` from the
            Figma spec) — the three columns each distribute their own 4 items
            via internal `justify-between`, which only lines dots up with their
            matching text row if all three columns share the same height. */}
        <div className="hidden md:mx-auto md:flex md:w-full md:max-w-[746px] md:items-stretch md:justify-between lg:max-w-none lg:items-stretch lg:justify-between lg:pl-[170px] lg:pr-[100px]">
          <div className="flex flex-col justify-between gap-[24px]">
            {TIMELINE.map((item) => (
              <div key={item.role} className="flex flex-col gap-[14px]">
                <p className="text-[24px] font-bold text-[#3e2859] lg:text-[32px] lg:font-extrabold">
                  {item.role}
                </p>
                <p className="text-[16px] text-[#543976] lg:text-[18px]">{item.period}</p>
              </div>
            ))}
          </div>
          <div className="relative z-0 flex flex-col items-center justify-between">
            {/* top/bottom insets (half the 48px dot) instead of the literal
                685px spec height — stretches to reach exactly the first and
                last dot's center regardless of how tall the real text content
                renders (685px alone overshot past the last dot here). `z-0`
                on this wrapper for the same reason as the mobile line above:
                without it, `-z-10` escapes past this column and hides fully
                behind the page's own background section. */}
            <div className="timeline-line absolute left-[24px] top-[24px] bottom-[24px] -z-10 w-[3px]" />
            {TIMELINE.map((item) => (
              <TimelineDot key={item.role} />
            ))}
          </div>
          <div className="flex flex-col justify-between gap-[24px]">
            {TIMELINE.map((item) => (
              <div key={item.role} className="flex flex-col gap-[14px]">
                <p className="text-[24px] font-bold text-[#3e2859] lg:text-[32px] lg:font-extrabold">
                  {item.company}
                </p>
                <p className="max-w-[444px] text-[16px] text-[#543976] lg:text-[18px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
