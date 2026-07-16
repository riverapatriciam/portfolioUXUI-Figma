import { useEffect, useRef, useState } from "react";

/**
 * Builds a single, gracefully meandering vertical S-curve confined to a
 * narrow lane (a fixed center + amplitude, not proportional to the full
 * container width) — same "one big flowing gesture" feel as
 * `HERO_CURVE_DESKTOP`, just generated at runtime since this line's height
 * depends on live content length rather than a fixed Figma canvas. Kept in
 * the empty left-margin gutter (rather than sweeping across the full
 * content width) so it stays visible against opaque card backgrounds
 * further down the page instead of disappearing behind them.
 */
function buildMeanderPath(
  height: number,
  laneCenter: number,
  amplitude: number,
  bends = 6,
  startX = laneCenter,
): string {
  if (height <= 0) return "";
  const left = laneCenter - amplitude;
  const right = laneCenter + amplitude;
  const segH = height / bends;
  let x = startX;
  let d = `M${x} 0`;
  for (let i = 0; i < bends; i++) {
    const y0 = i * segH;
    const y1 = i === bends - 1 ? height : y0 + segH;
    const nextX = i === bends - 1 ? laneCenter : i % 2 === 0 ? right : left;
    const cpY = y0 + (y1 - y0) / 2;
    d += ` C${x} ${cpY}, ${nextX} ${cpY}, ${nextX} ${y1}`;
    x = nextX;
  }
  return d;
}

/**
 * Decorative background line spanning Case Studies → Timeline (starts after
 * the Hero, which already has its own `HeroCurve` — running both through
 * Hero read as two competing lines) that draws itself in step with scroll
 * position (not a fixed-duration one-shot like `DrawPath`) — the stroke's
 * dash-offset is recomputed on every scroll/resize from how far the wrapping
 * box has traveled through the viewport, so scrolling back up retracts it
 * too. Desktop only; height is measured at runtime via `ResizeObserver`
 * since the content above it reflows.
 */
const LINE_LANE_WIDTH = 160;
const LINE_LANE_CENTER = 70;
const LINE_LANE_AMPLITUDE = 55;
/** `HERO_CURVE_DESKTOP` ends at x=0 (its path's final coordinate, "...0 1024") — start this line there too so it reads as a continuation of that curve instead of jumping sideways into its own lane. */
const LINE_START_X = 20;

export function ScrollDrawLine() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setHeight(entry.contentRect.height));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    const el = wrapperRef.current;
    if (!path || !el || height === 0) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const scrolled = window.innerHeight - rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / total));
      path.style.strokeDashoffset = `${length * (1 - progress)}`;
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
  }, [height]);

  const d = buildMeanderPath(height, LINE_LANE_CENTER, LINE_LANE_AMPLITUDE, 6, LINE_START_X);

  return (
    <div ref={wrapperRef} className="pointer-events-none absolute inset-0 -z-10 block" aria-hidden>
      <div className="relative mx-auto h-full max-w-[1440px]">
        {d && (
          <svg
            className="absolute left-0 top-0 h-full overflow-visible"
            width={LINE_LANE_WIDTH}
            viewBox={`0 0 ${LINE_LANE_WIDTH} ${height}`}
            fill="none"
          >
            <path
              ref={pathRef}
              d={d}
              stroke="url(#scroll-draw-line)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="scroll-draw-line"
                x1="0"
                y1="0"
                x2="0"
                y2={height}
              >
                <stop stopColor="#E9A8FF" />
                <stop offset="1" stopColor="#0FF5E5" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </div>
    </div>
  );
}
