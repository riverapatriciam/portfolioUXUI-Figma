import { useEffect, useState, startTransition } from "react";

/**
 * Hand-rolled router: this site has exactly four static pages, so a routing
 * library would be more surface area than the whole thing. Everything
 * URL-related (paths, history, back/forward, legacy-hash migration and the
 * "navigate home, then scroll to a section" handoff) lives in this module;
 * `App.tsx` only consumes `useRouter()`.
 */

export type Page = "home" | "case-study-luh" | "case-study-as" | "case-study-cove";

/** Ids the case-study cards/links use to refer to each study. */
export type CaseStudyId = "luh" | "as" | "cove";

/** Home sections that can be deep-scrolled to from another page. */
export type HomeAnchor = "about" | "contact";

export const CASE_STUDY_PAGE: Record<CaseStudyId, Page> = {
  luh: "case-study-luh",
  as: "case-study-as",
  cove: "case-study-cove",
};

// Real paths, not `#hash` fragments: a fragment is never sent in the HTTP request, so any
// service that processes a shared link server-side before forwarding the click — LinkedIn,
// Facebook, Slack unfurl bots, link shorteners — never sees it and drops it, landing the
// visitor on "/" instead of the case study they clicked. A path survives that unchanged.
export const PAGE_PATH: Record<Page, string> = {
  home: "/",
  "case-study-luh": "/case-study/level-up-habits",
  "case-study-as": "/case-study/after-story",
  "case-study-cove": "/case-study/cove",
};

const OLD_HASH_PAGE: Record<string, Page> = {
  "#case-study-luh": "case-study-luh",
  "#case-study-as": "case-study-as",
  "#case-study-cove": "case-study-cove",
};

export function pathToPage(pathname: string): Page {
  const entry = Object.entries(PAGE_PATH).find(([, path]) => path === pathname);
  return entry ? (entry[0] as Page) : "home";
}

export function useRouter() {
  const [page, setPage] = useState<Page>(() => pathToPage(window.location.pathname));
  const [pendingScroll, setPendingScroll] = useState<HomeAnchor | null>(null);

  // One-time migration for the old `#case-study-*` links (used before this app switched to
  // real paths) — redirects them to the equivalent path so anyone who bookmarked/shared the
  // old-style URL directly (not through a link-stripping redirector, which already dropped
  // the hash before the browser ever got here) still lands on the right page.
  useEffect(() => {
    const target = OLD_HASH_PAGE[window.location.hash];
    if (target && window.location.pathname === "/") {
      window.history.replaceState(null, "", PAGE_PATH[target]);
      // Syncing state FROM the URL (an external system) once at mount is the point of
      // this effect; the extra render only ever happens for legacy `#` links.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPage(target);
    }
  }, []);

  // Reading `location.pathname` only in the `useState` initializer above only covers the
  // very first mount — a path change that doesn't trigger a full page reload (browser
  // back/forward) never re-runs it, silently stranding the user on whatever page was
  // already showing. `navigate` below already keeps `page` in sync for its own pushState
  // calls; this listener covers the back/forward case those don't fire for.
  useEffect(() => {
    const onPopState = () => startTransition(() => setPage(pathToPage(window.location.pathname)));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (target: Page) => {
    window.history.pushState(null, "", PAGE_PATH[target]);
    startTransition(() => setPage(target));
  };

  const goTo = (target: Page) => {
    navigate(target);
    window.scrollTo(0, 0);
  };

  const openCaseStudy = (id: CaseStudyId) => goTo(CASE_STUDY_PAGE[id]);

  const goToSection = (anchor: HomeAnchor) => {
    setPendingScroll(anchor);
    navigate("home");
  };

  return {
    page,
    goTo,
    openCaseStudy,
    goToSection,
    pendingScroll,
    clearPendingScroll: () => setPendingScroll(null),
  };
}
