import type { ReactNode } from "react";

/** Small brand primitives shared across sections: gradient text, tag pills, CTA buttons. */

export function GradientText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`bg-gradient-to-r bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}

export function TagPill({
  children,
  textSize = "text-[13px] md:text-[14px]",
}: {
  children: ReactNode;
  textSize?: string;
}) {
  return (
    <div className="inline-flex shrink-0 rounded-[40px] bg-gradient-to-r from-[#fad89e] to-[#f29bfd] p-[2px]">
      <span
        className={`flex items-center justify-center whitespace-nowrap rounded-[38px] bg-[#825db1] p-[10px] font-medium leading-[1.5] text-[#fff3ff] ${textSize}`}
      >
        {children}
      </span>
    </div>
  );
}

export function GradientButton({
  children,
  className = "",
  onClick,
  href,
  download,
  target,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  download?: string;
  target?: string;
}) {
  const classes = `inline-flex cursor-pointer items-center justify-center gap-[10px] rounded-[40px] bg-gradient-to-r from-[#fad89e] to-[#f29bfd] px-[20px] py-[10px] text-[#543976] shadow-[0_0_4px_0_rgba(0,0,0,0.04),0_4px_8px_0_rgba(0,0,0,0.06)] transition-shadow duration-200 hover:shadow-[0_0_0_2px_#ff99b9,0_0_4px_0_rgba(0,0,0,0.04),0_8px_16px_0_rgba(0,0,0,0.08)] ${className}`;

  if (href) {
    return (
      <a
        href={href}
        download={download}
        onClick={onClick}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
