"use client";

import React from "react";

export type KaaraniEmotion = "idle" | "talking" | "happy" | "thinking";

interface KaaraniAvatarProps {
  emotion?: KaaraniEmotion;
  size?: number;
  className?: string;
}

/**
 * Kaarani — animated SVG cartoon face.
 * Scales from 40px (sidebar) to 200px (onboarding).
 * Emotion drives mouth shape + pulse class.
 */
export function KaaraniAvatar({
  emotion = "idle",
  size = 40,
  className = "",
}: KaaraniAvatarProps) {
  const isTalking = emotion === "talking";
  const isHappy = emotion === "happy";
  const isThinking = emotion === "thinking";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${isTalking ? "animate-kaarani-pulse" : ""} ${className}`}
      style={{ flexShrink: 0 }}
      aria-label="Kaarani"
      role="img"
    >
      {/* ── Hair (dark, short) ── */}
      <ellipse cx="50" cy="28" rx="26" ry="14" fill="#1F2937" />
      <ellipse cx="50" cy="32" rx="28" ry="16" fill="#1F2937" />
      {/* Side hair tufts */}
      <ellipse cx="23" cy="44" rx="6" ry="10" fill="#1F2937" />
      <ellipse cx="77" cy="44" rx="6" ry="10" fill="#1F2937" />

      {/* ── Face ── */}
      <ellipse cx="50" cy="54" rx="26" ry="28" fill="#F5CBA7" />

      {/* ── Eyebrows ── */}
      <path d="M32 40 Q38 37 44 40" stroke="#6B3A2A" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M56 40 Q62 37 68 40" stroke="#6B3A2A" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* ── Eyes ── */}
      <g className="kaarani-eye">
        <ellipse cx="38" cy="47" rx="5.5" ry="5.5" fill="white" />
        <circle cx="38" cy="47" r="3.5" fill="#2563EB" />
        <circle cx="38" cy="47" r="1.8" fill="#1E40AF" />
        <circle cx="39.5" cy="45.5" r="1.2" fill="white" />
      </g>
      <g className="kaarani-eye right">
        <ellipse cx="62" cy="47" rx="5.5" ry="5.5" fill="white" />
        <circle cx="62" cy="47" r="3.5" fill="#2563EB" />
        <circle cx="62" cy="47" r="1.8" fill="#1E40AF" />
        <circle cx="63.5" cy="45.5" r="1.2" fill="white" />
      </g>

      {/* ── Cheeks ── */}
      <ellipse cx="32" cy="58" rx="5" ry="3" fill="#F9A8A8" opacity="0.5" />
      <ellipse cx="68" cy="58" rx="5" ry="3" fill="#F9A8A8" opacity="0.5" />

      {/* ── Nose ── */}
      <ellipse cx="50" cy="57" rx="2" ry="1.5" fill="#E8A87C" />

      {/* ── Mouths (only one shown per emotion) ── */}

      {/* idle: gentle closed smile */}
      {!isTalking && !isHappy && !isThinking && (
        <path
          d="M41 65 Q50 71 59 65"
          stroke="#C0673A"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      )}

      {/* talking: animated open ellipse */}
      {isTalking && (
        <g className="kaarani-mouth-talk" style={{ transformOrigin: "50px 67px" }}>
          <ellipse cx="50" cy="67" rx="8" ry="5" fill="#C0673A" />
          <ellipse cx="50" cy="65" rx="8" ry="3" fill="#F5CBA7" />
        </g>
      )}

      {/* happy: wide arc smile */}
      {isHappy && (
        <>
          <path
            d="M38 63 Q50 76 62 63"
            stroke="#C0673A"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M38 63 Q50 76 62 63"
            stroke="none"
            fill="#F9A8A8"
            opacity="0.3"
          />
        </>
      )}

      {/* thinking: asymmetric raised-corner mouth */}
      {isThinking && (
        <path
          d="M41 67 Q46 65 52 67 Q56 66 59 63"
          stroke="#C0673A"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      )}

      {/* ── Earrings (small blue dots) ── */}
      <circle cx="24" cy="52" r="2.5" fill="#2563EB" opacity="0.7" />
      <circle cx="76" cy="52" r="2.5" fill="#2563EB" opacity="0.7" />
    </svg>
  );
}
