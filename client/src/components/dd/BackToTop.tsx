/**
 * BackToTop
 *
 * A fixed-position button that fades in once the user has scrolled more than
 * 400 px down the page, and smoothly scrolls back to the top when clicked.
 *
 * Design tokens: charcoal #3F4049 background, gold #FEDA86 icon/hover ring,
 * matching the Discount Drain brand palette.
 */

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackToTopProps {
  /** Scroll depth (px) at which the button becomes visible. Default: 400. */
  threshold?: number;
  /** Extra Tailwind classes for positioning overrides if needed. */
  className?: string;
}

export default function BackToTop({ threshold = 400, className }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Check immediately in case the page is already scrolled on mount
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        // Position: fixed bottom-right, above any footer z-index
        "fixed bottom-8 right-6 z-50",
        // Size & shape
        "w-11 h-11 rounded-full",
        // Colours — charcoal bg, gold icon
        "flex items-center justify-center",
        // Transition: opacity + scale for a polished fade-in
        "transition-all duration-300 ease-in-out",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none",
        // Focus ring for accessibility
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        className
      )}
      style={{
        backgroundColor: "#3F4049",
        color: "#FEDA86",
        boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#2A2A31";
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 0 0 3px rgba(254,218,134,0.35), 0 4px 14px rgba(0,0,0,0.25)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#3F4049";
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 4px 14px rgba(0,0,0,0.25)";
      }}
    >
      <ArrowUp size={18} strokeWidth={2.5} />
    </button>
  );
}
