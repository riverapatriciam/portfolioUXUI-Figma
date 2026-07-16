import { useEffect, useRef, type SVGProps } from "react";

/** Animates a path drawing itself along its own trace, from start to end. */
export function DrawPath(props: SVGProps<SVGPathElement>) {
  const ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = ref.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    const animation = path.animate([{ strokeDashoffset: length }, { strokeDashoffset: 0 }], {
      duration: 2200,
      easing: "ease-in-out",
      fill: "forwards",
    });
    return () => animation.cancel();
  }, []);

  return <path ref={ref} {...props} />;
}
