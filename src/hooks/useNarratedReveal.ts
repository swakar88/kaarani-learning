"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Narration-driven progressive reveal for learning screens.
 *
 * Each narrationScript segment = one content block. When Kaarani speaks
 * segment N, block N fades in. If voice is blocked or muted, timer fallback
 * reveals blocks sequentially every `fallbackMs` milliseconds.
 *
 * Usage:
 *   const { fadeIn, onCueChange } = useNarratedReveal(6);
 *   // pass onCueChange to ModuleLayout as onCueChange prop
 *   // wrap each block: <div style={fadeIn(0)}>header</div>
 *                       <div style={fadeIn(1)}>card 1</div>  ← appears on segment 1
 *                       <div style={fadeIn(2)}>card 2</div>  ← appears on segment 2
 */
export function useNarratedReveal(steps: number, fallbackMs = 1800) {
  const [cue, setCue] = useState(-1);
  const voiceStartedRef = useRef(false);

  // Fallback timers — only advance cue if voice never starts
  useEffect(() => {
    const timers = Array.from({ length: steps }, (_, i) =>
      setTimeout(() => {
        if (!voiceStartedRef.current) setCue(i);
      }, i * fallbackMs)
    );
    return () => timers.forEach(clearTimeout);
    // intentionally no deps — runs once on mount, cleans up on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Called by KaaraniSidebar via onCueChange when each narration segment starts
  const onCueChange = (i: number) => {
    voiceStartedRef.current = true; // disable fallback timers
    setCue(i);
  };

  const show = (step: number) => cue >= step;

  /** Apply this as the `style` prop on each content block wrapper div */
  const fadeIn = (step: number): React.CSSProperties => ({
    opacity:       show(step) ? 1 : 0,
    transform:     show(step) ? "none" : "translateY(10px)",
    transition:    "opacity 0.4s ease-out, transform 0.4s ease-out",
    pointerEvents: show(step) ? "auto" : "none",
  });

  return { show, fadeIn, onCueChange };
}
