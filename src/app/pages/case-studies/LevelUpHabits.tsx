import Desktop, { CaseStudyLuhMobile } from "@/imports/CaseStudyLuh";
import { CaseStudyPage, type CaseStudyPageProps } from "../CaseStudyPage";
import { CASE_STUDIES } from "../../content/case-studies";

/** Thin lazy-loaded route: keeps the generated frame in its own chunk. */
export default function LevelUpHabits(props: CaseStudyPageProps) {
  return (
    <CaseStudyPage
      config={CASE_STUDIES.luh}
      Desktop={Desktop}
      Mobile={CaseStudyLuhMobile}
      {...props}
    />
  );
}
