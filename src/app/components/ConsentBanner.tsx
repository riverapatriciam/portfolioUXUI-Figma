import { useEffect, useState } from "react";
import {
  getConsent,
  setConsent,
  OPEN_CONSENT_EVENT,
  type ConsentChoice,
} from "../analytics/consent";
import { startClarity, stopClarity } from "../analytics/clarity";

/** Microsoft's privacy statement covers Clarity; no separate policy page needed for a personal site. */
const LEARN_MORE_URL = "https://privacy.microsoft.com/en-us/privacystatement";

/**
 * Cookie-consent banner gating Microsoft Clarity.
 *
 * Shows on first visit (no stored choice) and whenever the footer "Cookie
 * settings" link fires `OPEN_CONSENT_EVENT`. "Accept" and "Decline" are both
 * one click and equally reachable — declining must be as easy as accepting.
 * Clarity is never loaded until "Accept"; switching back to "Decline"
 * withdraws consent and reloads for a clean stop.
 */
export function ConsentBanner() {
  // Client-only SPA (empty #root, no SSR), so reading storage up front is safe.
  const [choice, setChoice] = useState<ConsentChoice | null>(() => getConsent());
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const reopen = () => {
      setReopened(true);
      setChoice(null);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (choice === "accepted" || choice === "rejected") return null;

  const decide = (value: ConsentChoice) => {
    const had = getConsent();
    setConsent(value);
    setChoice(value);
    if (value === "accepted") {
      startClarity();
    } else if (had === "accepted") {
      stopClarity();
      window.location.reload();
    }
  };

  const close = () => setChoice(getConsent());

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-[#ff99b9] bg-[#543976]/95 px-[20px] py-[16px] backdrop-blur-[12px]"
    >
      <div className="mx-auto flex max-w-[1000px] flex-col gap-[14px] md:flex-row md:items-center md:justify-between md:gap-[24px]">
        <p className="text-[13px] leading-[1.55] text-[#fff3ff] md:text-[14px]">
          This site uses <strong>Microsoft Clarity</strong> to record anonymised usage (heatmaps and
          session replays) so I can improve the portfolio. It sets cookies only if you accept.{" "}
          <a
            href={LEARN_MORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[#ffd7ec]"
          >
            Learn more
          </a>
          .
        </p>

        <div className="flex shrink-0 items-center gap-[10px]">
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="rounded-full border border-[#fff3ff]/70 px-[22px] py-[8px] text-[14px] font-medium text-[#fff3ff] transition-colors hover:bg-white/10"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="rounded-full bg-gradient-to-r from-[#fad89e] to-[#f29bfd] px-[22px] py-[8px] text-[14px] font-semibold text-[#543976] transition-shadow hover:shadow-[0_0_0_2px_#ff99b9]"
          >
            Accept
          </button>
          {reopened && getConsent() && (
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="ml-[2px] px-[6px] text-[18px] leading-none text-[#fff3ff]/80 hover:text-[#fff3ff]"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
