import { ReactNode } from "react";

/**
 * Page-width wrapper matching the design's margin spec per breakpoint:
 * mobile 20px / tablet 44px / desktop 60px, capped at the 1440px canvas.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-[20px] md:px-[44px] lg:px-[60px] ${className}`}>
      {children}
    </div>
  );
}

/**
 * Column grid matching the design's grid spec per breakpoint:
 * mobile 4 col / 16px gutter, tablet 8 col / 22px gutter, desktop 12 col / 24px gutter.
 * Place children with col-span-*, md:col-span-*, lg:col-span-*.
 */
export function Grid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-4 gap-[16px] md:grid-cols-8 md:gap-[22px] lg:grid-cols-12 lg:gap-[24px] ${className}`}>
      {children}
    </div>
  );
}
