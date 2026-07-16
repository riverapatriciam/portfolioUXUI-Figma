import { Container } from "../components/layout/Grid";
import { GradientButton, GradientText, TagPill } from "../components/primitives";
import type { CaseStudyId } from "../router";
import {
  IMG_MOCKUP_AF,
  IMG_MOCKUP_COVE,
  IMG_MOCKUP_LUH,
  VIDEO_AS_URL,
  VIDEO_COVE_URL,
  VIDEO_LUH_URL,
} from "../content/site";
import imgMobileMockupLuh from "../assets/b3c2d0d39ef8d164ef4f6b454cd7ea3eadde1799.webp";
import imgMobileMockupLuh1 from "../assets/43e7918bdb5051d2c77508d8ffa0fcd5b8185746.webp";
import imgScreenInsertDesignsHere from "../assets/4c3bf707eed0712579fbc19d8f48018d5c4ee230.webp";
import imgScreenInsertDesignsHere1 from "../assets/3a0ca32f84ec842dd6b0cb4828d2a91c5a0a71b4.webp";
import imgScreenInsertDesignsHere2 from "../assets/97b01c1ad5125d8dca70471f580fc161e2f8fab0.webp";

/**
 * Two overlapping phone mockups, matching the design: a small straight-on
 * "vertical" phone (with its own screen/video) sits front-left over a larger
 * tilted background device mockup. Both devices are literal Figma pixel
 * sizes at every breakpoint (mobile/tablet/desktop each have their own),
 * laid out as a flex row with the tilted one pulled left via negative
 * margin to overlap the vertical one by the exact amount Figma specifies.
 */
function DualPhoneMockup({
  title,
  bigImg,
  smallFrameImgs,
  smallScreenImg,
  smallScreenVideo,
}: {
  title: string;
  bigImg: string;
  smallFrameImgs: string[];
  smallScreenImg: string;
  smallScreenVideo?: string;
}) {
  return (
    <div className="relative flex items-end">
      <img
        alt={title}
        className="order-2 -ml-[8px] h-[150px] w-[128px] shrink-0 object-cover md:-ml-[56px] md:h-[282px] md:w-[224px] lg:-ml-[38px] lg:h-[384px] lg:w-[308px]"
        src={bigImg}
      />
      <div className="relative z-10 order-1 ml-[20px] h-[162px] w-[78px] shrink-0 md:ml-[32px] md:h-[298px] md:w-[144px] lg:ml-[70px] lg:h-[398px] lg:w-[194px]">
        {smallFrameImgs[0] && (
          <img alt="" className="absolute inset-0 size-full object-cover" src={smallFrameImgs[0]} />
        )}
        <div className="absolute inset-[1.9%_4.5%] overflow-hidden">
          {smallScreenVideo ? (
            <video
              className="block size-full object-cover"
              src={smallScreenVideo}
              poster={smallScreenImg}
              preload="metadata"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img alt="" className="block size-full object-cover" src={smallScreenImg} />
          )}
        </div>
        {/* Front bezel layer — sits over the screen/video so its rounded frame masks the video's straight rectangular edges. */}
        {smallFrameImgs[1] && (
          <img
            alt=""
            className="pointer-events-none absolute inset-0 size-full object-cover"
            src={smallFrameImgs[1]}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Ambient blurred gradient blobs behind the mockup — same behavior at every
 * breakpoint. The blobs' own keyframes (`.blur-motion-a/b` in tailwind.css)
 * animate between fixed pixel sizes tuned for the desktop mockup box, so this
 * wrapper is scaled down at smaller breakpoints to match the mockup's own
 * (much smaller) footprint rather than resizing the keyframes themselves.
 */
function BlurMotionBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 origin-center scale-[0.41] md:scale-[0.75] lg:scale-100"
    >
      <div className="blur-motion-a absolute left-[6%] top-[2%] rounded-full bg-gradient-to-r from-[#fad89e] to-[#f29bfd] opacity-70" />
      <div className="blur-motion-b absolute bottom-[4%] right-[8%] rounded-full bg-gradient-to-r from-[#fad89e] to-[#f29bfd] opacity-70" />
    </div>
  );
}

type CaseStudyMeta = { label: string; value: string };

function CaseStudyCard({
  title,
  description,
  meta,
  tags,
  duration,
  mockupImg,
  mobileFrameImgs,
  mobileScreenImg,
  mobileScreenVideo,
  onViewWork,
}: {
  title: string;
  description: string;
  meta: CaseStudyMeta[];
  tags: string[];
  duration: string;
  mockupImg: string;
  mobileFrameImgs: string[];
  mobileScreenImg: string;
  mobileScreenVideo?: string;
  onViewWork: () => void;
}) {
  return (
    <div className="relative mx-auto h-[416px] w-full max-w-[400px] overflow-hidden rounded-[20px] border border-[#fad89e] bg-[rgba(229,217,230,0.24)] p-[16px] backdrop-blur-[7.5px] md:h-[408px] md:max-w-[746px] md:rounded-[30px] md:border-[1.5px] md:p-[32px] md:backdrop-blur-[11.25px] lg:h-[588px] lg:max-w-[1096px] lg:rounded-[40px] lg:border-2 lg:p-[40px] lg:backdrop-blur-[15px]">
      <span className="absolute right-0 top-0 rounded-bl-[20px] bg-[#f7aef8] px-[16px] py-[10px] text-[0.875rem] text-[#543976] md:text-[0.75rem] lg:text-[16px]">
        {duration}
      </span>

      <div className="flex h-full flex-col justify-center gap-[12px] md:flex-row md:items-center md:justify-normal md:gap-[20px] lg:gap-[40px]">
        {/* Base only: mockup + title/description sit side by side as a compact
            row, with Role/tags/button below — the mobile card's fixed height
            doesn't fit the fully stacked layout. md/lg: this wrapper becomes
            `contents` (removes itself from layout) so its two children fall
            back into the tablet/desktop side-by-side column flow, where the
            title/description shown below take over instead — both tablet and
            desktop mockups are tall enough to want a full-height column next
            to a full-height text column, not a compact stacked block. */}
        <div className="flex flex-row items-center gap-[8px] md:contents">
          <div className="relative shrink-0">
            <BlurMotionBackdrop />
            <DualPhoneMockup
              title={title}
              bigImg={mockupImg}
              smallFrameImgs={mobileFrameImgs}
              smallScreenImg={mobileScreenImg}
              smallScreenVideo={mobileScreenVideo}
            />
          </div>

          <div className="flex flex-1 flex-col gap-[4px] text-left md:hidden">
            {/* 1.25rem + font-extrabold clears the WCAG "large text" bold threshold
                (14pt/~18.66px), so the #9b72ce purple only needs 3:1 contrast here
                instead of 4.5:1 — at a smaller size/weight it wouldn't pass AA. */}
            <h3 className="line-clamp-2 text-[1.25rem] font-extrabold leading-[1.2] text-[#9b72ce]">
              {title}
            </h3>
            <p className="line-clamp-2 text-[0.75rem] italic leading-[1.3] text-[#543976]">
              {description}
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-[8px] text-center md:w-auto md:flex-1 md:items-start md:gap-[12px] md:text-left">
          <h3 className="hidden text-[26px] font-extrabold text-[#9b72ce] md:block md:text-[1.5rem] lg:text-[32px]">
            {title}
          </h3>
          <p className="hidden text-[16px] italic text-[#543976] md:block md:text-[0.875rem] lg:text-[18px]">
            {description}
          </p>
          {meta.map((m) => (
            <p key={m.label} className="text-[0.75rem] md:text-[18px]">
              {/* #9b72ce only clears AA contrast at large/bold sizes (see title above) —
                  this label is small and regular-weight at every breakpoint, so it uses
                  the darker #543976 instead, which passes 4.5:1 at any size. */}
              <span className="text-[#543976]">{m.label}: </span>
              <span className="text-[#543976]">{m.value}</span>
            </p>
          ))}
          <div className="flex flex-wrap justify-center gap-[8px] md:justify-start md:gap-[10px]">
            {tags.map((t) => (
              <TagPill key={t} textSize="text-[0.8125rem] md:text-[0.75rem] lg:text-[14px]">
                {t}
              </TagPill>
            ))}
          </div>
          <GradientButton
            className="mt-[4px] text-[0.8125rem] md:absolute md:bottom-[20px] md:right-[22px] md:mt-0 md:text-[0.75rem] lg:bottom-[36px] lg:right-[28px] lg:text-[16px]"
            onClick={onViewWork}
          >
            View work ➤
          </GradientButton>
        </div>
      </div>
    </div>
  );
}

export function CaseStudiesSection({
  onOpenCaseStudy,
}: {
  onOpenCaseStudy: (id: CaseStudyId) => void;
}) {
  return (
    <section
      id="case-studies"
      className="scroll-mt-[98px] py-[60px] md:scroll-mt-[82px] md:py-[80px] lg:py-[100px]"
    >
      <Container>
        <h2 className="mb-[32px] text-center text-[32px] font-extrabold md:mb-[40px] md:text-[42px] lg:mb-[48px] lg:text-[52px]">
          <GradientText className="from-[#fe85ea] to-[#5102a0]">Case studies</GradientText>
        </h2>
        <div className="flex flex-col gap-[32px] md:gap-[40px]">
          <CaseStudyCard
            title="Level Up Habits"
            description="Helping people with ADHD build habits through AI-powered gamification."
            meta={[{ label: "Role", value: "Solo UX/UI Designer" }]}
            tags={["UX Research", "UI Design", "Design Thinking"]}
            duration="2 weeks"
            mockupImg={IMG_MOCKUP_LUH}
            mobileFrameImgs={[imgMobileMockupLuh, imgMobileMockupLuh1]}
            mobileScreenImg={imgScreenInsertDesignsHere}
            mobileScreenVideo={VIDEO_LUH_URL}
            onViewWork={() => onOpenCaseStudy("luh")}
          />
          <CaseStudyCard
            title="AfterStory"
            description="Helping anime and manga fans discover stories tailored to their tastes"
            meta={[{ label: "Role", value: "Solo UX/UI Designer" }]}
            tags={["UX Research", "UI Design", "Design Thinking"]}
            duration="3 weeks"
            mockupImg={IMG_MOCKUP_AF}
            mobileFrameImgs={[imgMobileMockupLuh, imgMobileMockupLuh1]}
            mobileScreenImg={imgScreenInsertDesignsHere1}
            mobileScreenVideo={VIDEO_AS_URL}
            onViewWork={() => onOpenCaseStudy("as")}
          />
          <CaseStudyCard
            title="Cove"
            description="Designing a mental health support platform focused on reducing anxiety and stress through professional guidance and crisis assistance."
            meta={[
              { label: "Team", value: "4 Designer" },
              { label: "Role", value: "UI Designer & Prototype Lead" },
            ]}
            tags={["Prototyping", "UI Design", "Design Sprint"]}
            duration="1 week"
            mockupImg={IMG_MOCKUP_COVE}
            mobileFrameImgs={[imgMobileMockupLuh, imgMobileMockupLuh1]}
            mobileScreenImg={imgScreenInsertDesignsHere2}
            mobileScreenVideo={VIDEO_COVE_URL}
            onViewWork={() => onOpenCaseStudy("cove")}
          />
        </div>
      </Container>
    </section>
  );
}
