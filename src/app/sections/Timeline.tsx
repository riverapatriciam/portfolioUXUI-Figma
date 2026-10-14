import { Fragment } from "react";
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

        {/* Tablet/Desktop: one grid, three tracks (dates | dot+line | text), one
            grid ROW per entry. Rows — not three independently
            `justify-between` columns — keep each dot level with its own
            date and description no matter how long any entry's text is
            (the old column layout only lined up when all three columns
            happened to be the same height, which broke as soon as an entry
            wrapped to more lines than its neighbours). `justify-between`
            on the grid spreads the fixed tracks across the container like
            the Figma spec. Row spacing is bottom padding on the cells (not
            a grid gap) so each dot cell spans its whole row and its line
            segment reaches the next dot. Tablet reuses desktop's structure
            at smaller type sizes and without desktop's asymmetric 170/100
            padding. */}
        <div className="hidden md:mx-auto md:grid md:w-full md:max-w-[746px] md:grid-cols-[200px_48px_444px] md:justify-between lg:max-w-none lg:grid-cols-[300px_48px_444px] lg:pl-[170px] lg:pr-[100px]">
          {TIMELINE.map((item, i) => {
            const last = i === TIMELINE.length - 1;
            const rowPad = last ? "" : "pb-[48px]";
            return (
              <Fragment key={item.role}>
                <div className={`flex flex-col gap-[14px] ${rowPad}`}>
                  <p className="text-[24px] font-bold text-[#3e2859] lg:text-[32px] lg:font-extrabold">
                    {item.role}
                  </p>
                  <p className="text-[16px] text-[#543976] lg:text-[18px]">{item.period}</p>
                </div>
                <div className="relative z-0 flex flex-col items-center">
                  <TimelineDot />
                  {!last && <div className="timeline-line -z-10 w-[3px] flex-1" />}
                </div>
                <div className={`flex flex-col gap-[14px] ${rowPad}`}>
                  <p className="text-[24px] font-bold text-[#3e2859] lg:text-[32px] lg:font-extrabold">
                    {item.company}
                  </p>
                  <p className="max-w-[444px] text-[16px] text-[#543976] lg:text-[18px]">
                    {item.desc}
                  </p>
                </div>
              </Fragment>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
