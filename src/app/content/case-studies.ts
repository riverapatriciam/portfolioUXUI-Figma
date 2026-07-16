import type { CaseStudyId } from "../router";

/**
 * Per-case-study presentation config consumed by `pages/CaseStudyPage.tsx`.
 *
 * `frameH`: the Figma desktop frame is 1024 px wide; none of the frames
 * include their own footer anymore (the embedded copyright/social bars were
 * removed in favor of the shared `Footer`, rendered after `FrameWrapper`), so
 * the height only needs to cover the deepest real content — each study's
 * "Key learnings" block — plus a little breathing room.
 */
export type CaseStudyConfig = {
  /** Scaled height of the 1024px-wide Figma desktop frame. */
  frameH: number;
  /** Figma prototype the navbar "Play demo" CTA opens. */
  playDemoUrl: string;
};

export const CASE_STUDIES: Record<CaseStudyId, CaseStudyConfig> = {
  // After Story — "Key learnings" (`Frame49`) starts at y=5737px, ends ~y=5917px.
  as: {
    frameH: 5980,
    playDemoUrl:
      "https://www.figma.com/proto/WnSSL3saTOJKzkc4sRbTdp/Patricia.Rivera---PFB-UI?node-id=248-450&viewport=597%2C-25%2C0.08&t=yWVjf7uNk9DpxMyX-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=221%3A3906&show-proto-sidebar=1&page-id=215%3A3903",
  },
  // Cove — "Key learnings" sits at ~top-[5474px].
  cove: {
    frameH: 5880,
    playDemoUrl:
      "https://www.figma.com/proto/gIEUzqHhcGxGaGPPEPvgo6/Grupo-2---UI?node-id=211-1621&p=f&viewport=279%2C-49%2C0.08&t=0QFF01ppu3W6mVz0-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=271%3A906&page-id=0%3A1",
  },
  // Level Up Habits — "Key learnings" sits at ~top-[5271px].
  luh: {
    frameH: 5680,
    playDemoUrl:
      "https://www.figma.com/proto/Kd9acktVBSJzkMbJd537EC/Patricia.Rivera---Reto-2?node-id=291-3348&viewport=201%2C410%2C0.16&t=O6FNuWxTnlVpP2bf-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=310%3A4874&show-proto-sidebar=1&page-id=0%3A1",
  },
};
