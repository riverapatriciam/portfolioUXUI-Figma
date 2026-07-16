import { SEO_SKILLS, SKILLS } from "../content/site";
import { GradientText } from "../components/primitives";

function SkillsTrack({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <p
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-[8px] whitespace-nowrap px-[8px] text-[18px] leading-[150%]"
    >
      {SKILLS.map((skill, i) => (
        <span key={i} className="flex items-center gap-[8px]">
          <GradientText className="from-[#ff99b9] to-[#fff08f]">
            {i % 2 === 0 ? "✦" : "✧"}
          </GradientText>
          <span className={`text-[#452746] ${SEO_SKILLS.has(skill) ? "font-bold" : "font-normal"}`}>
            {skill}
          </span>
        </span>
      ))}
    </p>
  );
}

// Repeats per half: the marquee spans the full viewport width (no max-width
// cap), so a single SkillsTrack (~800px) isn't wide enough to cover wide
// desktop screens without the loop exposing empty background near the seam.
// Each half must stay wider than any realistic viewport.
const MARQUEE_REPEATS = 5;

export function SkillsMarquee() {
  return (
    <div className="relative flex h-[70px] w-full shrink-0 items-center gap-[10px] overflow-hidden bg-[#d7b8ff] p-[10px]">
      <div className="flex w-max shrink-0 animate-loop-left items-center hover:[animation-play-state:paused]">
        {Array.from({ length: MARQUEE_REPEATS }, (_, i) => (
          <SkillsTrack key={`a${i}`} />
        ))}
        {Array.from({ length: MARQUEE_REPEATS }, (_, i) => (
          <SkillsTrack key={`b${i}`} ariaHidden />
        ))}
      </div>
    </div>
  );
}
