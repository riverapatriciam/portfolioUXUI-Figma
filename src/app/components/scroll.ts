/** Smooth-scroll helpers shared by the navbar logo, hero CTAs and BackToTopButton. */

export function scrollToCaseStudies() {
  document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function scrollToHero() {
  document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
