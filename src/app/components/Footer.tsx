import { Sparkle } from "lucide-react";
import { Container } from "./layout/Grid";
import { CONTACT_EMAIL, LINKEDIN_URL, WHATSAPP_URL } from "../content/site";
import { GradientText } from "./primitives";
import { LinkedinIcon, WhatsappIcon } from "./icons";

export function Footer() {
  return (
    <footer className="bg-[#c79aff]">
      <Container className="flex flex-wrap items-center justify-center gap-x-[24px] gap-y-[12px] py-[20px] text-center md:justify-between">
        <p className="text-[16px] font-bold text-[#3e2859] md:text-[18px]">
          UX/UI Designer | Product Designer
        </p>
        <div className="flex items-center gap-[16px]">
          <Sparkle className="size-[16px] fill-[#fad89e] text-[#fad89e] md:size-[20px]" />
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedinIcon className="size-[26px] md:size-[30px]" />
          </a>
          <Sparkle className="size-[16px] fill-[#fad89e] text-[#fad89e] md:size-[20px]" />
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <WhatsappIcon className="size-[26px] md:size-[30px]" />
          </a>
          <Sparkle className="size-[16px] fill-[#fad89e] text-[#fad89e] md:size-[20px]" />
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] font-medium text-[#3e2859] md:text-[18px]"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </Container>
      <Container className="flex flex-col items-center justify-between gap-[8px] border-t border-white/20 py-[14px] text-center text-[12px] font-medium md:flex-row md:text-[14px]">
        <p className="text-[#3e2859]">© 2026 Patricia Rivera. All rights reserved.</p>
        <p className="text-[#3e2859]">
          Designed & Built with{" "}
          <GradientText className="from-[#ff99b9] to-[#fff08f]">passion</GradientText>
        </p>
      </Container>
    </footer>
  );
}
