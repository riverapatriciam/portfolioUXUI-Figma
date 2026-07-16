import type { CaseStudyId } from "../router";

/**
 * Every piece of editable site content that isn't prose inside a section:
 * contact/social URLs, nav structure, skills, stats and the career timeline.
 * Change things here — no need to touch the components that render them.
 */

export const CV_PDF_URL = "/cv/Patricia-Rivera-CV-EN.pdf";
export const CV_DOWNLOAD_NAME = "Patricia Rivera - CV.pdf";
export const CONTACT_EMAIL = "riverapatriciam20@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/riverapatriciam/";
export const WHATSAPP_URL = "https://wa.link/s0diwh";

export const VIDEO_LUH_URL = "/videos/level-up-habits-preview.mp4";
export const VIDEO_AS_URL = "/videos/after-story-preview.mp4";
export const VIDEO_COVE_URL = "/videos/cove-preview.mp4";

export const IMG_MOCKUP_LUH = "/img/Mockup-luh.svg";
export const IMG_MOCKUP_AF = "/img/Mockup-AF.svg";
export const IMG_MOCKUP_COVE = "/img/Mockup-cove.svg";

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Projects", href: "#case-studies" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const PROJECT_LINKS: { id: CaseStudyId; label: string }[] = [
  { id: "luh", label: "Level Up Habits" },
  { id: "as", label: "After Story" },
  { id: "cove", label: "Cove" },
];

export const SKILLS: string[] = [
  "UX/UI Designer",
  "Product Designer",
  "Figma",
  "HTML/CSS",
  "Typescript",
  "Research",
];
export const SEO_SKILLS = new Set(["UX/UI Designer", "Product Designer"]);

export const STATS: { value: string; label: string }[] = [
  {
    value: "+4",
    label: "years of experience in digital product development and frontend engineering",
  },
  { value: "3", label: "Case studies where challenge my UX/UI skills" },
  {
    value: "+6",
    label: "diferents digital projects as a frontend developer and Web UI developer",
  },
];

export const TIMELINE: { role: string; period: string; company: string; desc: string }[] = [
  {
    role: "Web UI Developer",
    period: "August 2023 - May 2026",
    company: "Globant | Iberia | Openbank",
    desc: "Bridged design and development by translating UI concepts into scalable and user-friendly web experiences",
  },
  {
    role: "Frontend Developer",
    period: "June 2022 - August 2023",
    company: "Venpend",
    desc: "Developed intuitive interfaces while gaining a deeper understanding of usability, accessibility, and user-centered thinking.",
  },
  {
    role: "HR Operation Lead",
    period: "May 2018 - Dec 2021",
    company: "Improving",
    desc: "Improved employee experiences through process optimization, stakeholder management, and problem-solving",
  },
  {
    role: "System analyst",
    period: "Dec 2015 - May 2018",
    company: "Esvenca",
    desc: "Connected business goals and technical requirements, building a foundation in problem-solving and systems thinking",
  },
];

/** Scattered floating layout, positioned relative to the photo frame at every breakpoint. */
export const SCATTERED_PILLS: { label: string; top: number; left: number }[] = [
  { label: "Figma", top: 708, left: 94 },
  { label: "Supernova", top: 643, left: 45 },
  { label: "Token Studio", top: 578, left: 7 },
  { label: "Design system", top: 513, left: 0 },
  { label: "Web UI design", top: 448, left: 13 },
  { label: "UX/UI Design", top: 383, left: 38 },
  { label: "Product Designer", top: 318, left: 52 },
  { label: "Research", top: 23, left: 462 },
  { label: "Wireframe", top: 82, left: 535 },
  { label: "Prototyping", top: 151, left: 577 },
  { label: "Typescript", top: 216, left: 609 },
  { label: "IA Agents", top: 281, left: 596 },
];
