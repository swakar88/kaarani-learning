"use client";

import { useState } from "react";

/**
 * Click-per-block progressive reveal for learning screens.
 *
 * Block 0 is visible on load. Each call to `next()` reveals the next block
 * and triggers Kaarani to speak the corresponding narration segment —
 * the click IS the browser user gesture, so speech synthesis is allowed.
 *
 * Usage:
 *   const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(6);
 *
 *   // wrap each block:
 *   <div className={blockClass(0)}>header</div>
 *   <div className={blockClass(1)}>card 1</div>
 *
 *   // tap button:
 *   {!isComplete && (
 *     <button onClick={() => { speak(script[step + 1]); next(); }}>
 *       {tapLabel} →
 *     </button>
 *   )}
 */
export function useBlockReveal(totalBlocks: number) {
  const [step, setStep] = useState(0); // 0 = only first block visible

  const next = () => setStep(s => Math.min(s + 1, totalBlocks - 1));

  const isComplete = step >= totalBlocks - 1;

  /** "Tap to Start" on the very first tap, "Tap to Continue" after that */
  const tapLabel = step === 0 ? "Tap to Start" : "Tap to Continue";

  /** Returns className string for a block — animate-cue-in when revealed, hidden when not */
  const blockClass = (block: number) =>
    step >= block ? "animate-cue-in" : "hidden";

  return { step, next, isComplete, blockClass, tapLabel };
}
