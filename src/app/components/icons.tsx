import svgPaths from "../assets/svg-paths";

/** Brand/social icons drawn from the Figma-exported path data in assets/svg-paths.ts. */

export function CvIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" preserveAspectRatio="none" viewBox="0 0 21 27">
      <path d={svgPaths.p3613df80} fill="currentColor" />
      <path clipRule="evenodd" d={svgPaths.p2d758d80} fill="currentColor" fillRule="evenodd" />
      <path d={svgPaths.p23f5a380} fill="currentColor" />
      <path clipRule="evenodd" d={svgPaths.pbc957c0} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

export function ChatMailIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" preserveAspectRatio="none" viewBox="0 0 24.003 25.5">
      <path d={svgPaths.p112a9400} fill="currentColor" />
    </svg>
  );
}

export function LinkedinIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
      <path d={svgPaths.p5472600} fill="#3E2859" />
    </svg>
  );
}

export function WhatsappIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
      <path d={svgPaths.pf262880} fill="#3E2859" />
    </svg>
  );
}

export function MapIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
      <path d={svgPaths.p4acd200} fill="#FFF3FF" />
      <path d={svgPaths.pfecb800} fill="#FFF3FF" />
    </svg>
  );
}
