"use client";

import React from "react";

interface RevealProps {
  /** Stagger step: 0 = immediate, 1 = 600ms, 2 = 1200ms, 3 = 1800ms, 4 = 2400ms */
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps a content block and animates it in after a staggered delay.
 * Uses the existing `cue-in` keyframe (opacity 0 → 1, translateY 10px → 0).
 * Always runs on screen mount — no dependency on voice or state.
 *
 * Usage:
 *   <Reveal delay={0}>  ← header   (immediate)
 *   <Reveal delay={1}>  ← card     (600ms)
 *   <Reveal delay={2}>  ← list     (1200ms)
 *   <Reveal delay={3}>  ← callout  (1800ms)
 */
export function Reveal({ delay = 0, children, className }: RevealProps) {
  return (
    <div
      className={className}
      style={{
        animation: `cue-in 0.45s ease-out ${delay * 600}ms both`,
      }}
    >
      {children}
    </div>
  );
}
