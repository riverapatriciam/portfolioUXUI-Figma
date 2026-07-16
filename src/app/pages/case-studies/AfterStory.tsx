import Desktop, { CaseStudyAsMobile } from "@/imports/CaseStudyAs";
import { CaseStudyPage, type CaseStudyPageProps } from "../CaseStudyPage";
import { CASE_STUDIES } from "../../content/case-studies";

/** Thin lazy-loaded route: keeps the generated frame in its own chunk. */
export default function AfterStory(props: CaseStudyPageProps) {
  return (
    <CaseStudyPage config={CASE_STUDIES.as} Desktop={Desktop} Mobile={CaseStudyAsMobile} {...props} />
  );
}
