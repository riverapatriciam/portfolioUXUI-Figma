import { useState, useEffect, ReactNode } from "react";

/** Native width every Figma frame was designed at. */
export const FRAME_W = 1024;

/**
 * Responsive shell for a fixed-width Figma frame.
 *
 * Desktop  (viewport ≥ 1024 px)
 *   The 1024 px frame is centered with `max-width / margin: auto`.
 *   No transform is applied — the layout is pixel-perfect as designed.
 *   Decorative background colour fills the full browser width.
 *
 * Tablet / Mobile  (viewport < 1024 px)
 *   The frame is scaled down proportionally with `transform: scale()`.
 *   `transform-origin: top left` keeps it flush to the left edge.
 *   The outer container's `minHeight` is adjusted so the browser scroll
 *   bar reflects the *scaled* height, not the native 1024-px height.
 */
export function FrameWrapper({
  children,
  frameH,
  bg = "#fff3ff",
}: {
  children: ReactNode;
  /** Native pixel height of the Figma frame. */
  frameH: number;
  bg?: string;
}) {
  const [vw, setVw] = useState(
    () =>
      typeof window !== "undefined"
        ? document.documentElement.clientWidth
        : FRAME_W,
  );

  useEffect(() => {
    const measure = () => setVw(document.documentElement.clientWidth);
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* ── Desktop ─────────────────────────────────────────────────────────── */
  if (vw >= FRAME_W) {
    return (
      <div style={{ background: bg, minHeight: frameH }}>
        <div
          style={{
            width: FRAME_W,
            height: frameH,
            marginLeft: "auto",
            marginRight: "auto",
            position: "relative",
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  /* ── Tablet / Mobile ─────────────────────────────────────────────────── */
  const scale = vw / FRAME_W;
  const scaledH = Math.round(frameH * scale);

  return (
    <div
      style={{ background: bg, overflow: "hidden", minHeight: scaledH }}
    >
      <div
        style={{
          width: FRAME_W,
          height: frameH,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          /* Pull the element up so the outer div only occupies scaledH px. */
          marginBottom: -(frameH - scaledH),
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** Returns the CSS scale factor (≤ 1) for the current viewport. */
export function useFrameScale(): number {
  const [scale, setScale] = useState(
    () =>
      typeof window !== "undefined"
        ? Math.min(1, document.documentElement.clientWidth / FRAME_W)
        : 1,
  );

  useEffect(() => {
    const measure = () =>
      setScale(Math.min(1, document.documentElement.clientWidth / FRAME_W));
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  return scale;
}
