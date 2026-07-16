import Desktop, { CaseStudyCoveMobile } from "@/imports/CaseStudyCove";
import { CaseStudyPage, type CaseStudyPageProps } from "../CaseStudyPage";
import { CASE_STUDIES } from "../../content/case-studies";

/** Thin lazy-loaded route: keeps the generated frame in its own chunk. */
export default function Cove(props: CaseStudyPageProps) {
  return (
    <CaseStudyPage
      config={CASE_STUDIES.cove}
      Desktop={Desktop}
      Mobile={CaseStudyCoveMobile}
      {...props}
    />
  );
}
