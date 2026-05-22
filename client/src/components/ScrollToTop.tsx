/**
 * ScrollToTop
 *
 * Renders nothing — purely a side-effect component.
 * Listens for Wouter location changes and scrolls the window to (0, 0)
 * instantly on every route transition so every page always starts at the top.
 *
 * Mount this once inside the Router in App.tsx.
 */

import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}
