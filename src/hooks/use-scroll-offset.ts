"use client";
import { useEffect, useState } from "react";


function useScrollOffset(selector: string) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.querySelector(selector);
      if (el) {
        setOffset(el.scrollTop);
      }
    };

    // Listen on the element if exists, else window
    const target = document.querySelector(selector) || window;
    target.addEventListener("scroll", onScroll, { passive: true });

    return () => target.removeEventListener("scroll", onScroll);
  }, [selector]);

  return offset;
}
export default useScrollOffset;