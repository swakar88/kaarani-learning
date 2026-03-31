"use client";

import React, { useState } from "react";
import { ScreenProps } from "@/types";
import { useSpeechContext } from "@/context/SpeechContext";
import { useKaarani } from "@/context/KaaraniContext";
import { KaaraniAvatar, KaaraniEmotion } from "@/components/kaarani/KaaraniAvatar";

const NARRATION = [
  "Hey! I'm Kaarani — your Power BI guide. Before we dive into the good stuff, three quick steps to get you set up.",
  "Step one — download Power BI Desktop. Completely free from Microsoft. Takes about two minutes.",
  "Step two — open it and sign in with any Microsoft account. Personal, school, or work — they all work.",
  "Step three — when you see the Power BI start screen, you are ready. That is all it takes. Let us go!",
];

interface CheckItem {
  id: string;
  step: number;
  label: string;
  description: string;
  note?: string;
}

const CHECKS: CheckItem[] = [
  {
    id: "download",
    step: 1,
    label: "Download Power BI Desktop",
    description: "Free from Microsoft Store or powerbi.microsoft.com — takes about 2 minutes.",
    note: "→ powerbi.microsoft.com/desktop",
  },
  {
    id: "signin",
    step: 2,
    label: "Sign in with a Microsoft account",
    description: "Open Power BI Desktop and sign in. Personal, school, or work account all work.",
    note: "No account? Create one free at microsoft.com",
  },
  {
    id: "ready",
    step: 3,
    label: "You see the Power BI start screen",
    description: "Power BI is open and showing the welcome screen or blank canvas. You're good!",
  },
];

export default function Screen1InstallCheck({ onNext }: ScreenProps) {
  const [started, setStarted] = useState(false);
  const [cue, setCue] = useState(-1);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const { speakScript, stop, isSpeaking, isSupported } = useSpeechContext();
  const { voiceEnabled, setVoiceEnabled } = useKaarani();

  const allChecked = CHECKS.every(c => checked[c.id]);

  const kaaraniEmotion: KaaraniEmotion = !started
    ? "idle"
    : isSpeaking
    ? "talking"
    : allChecked
    ? "happy"
    : "idle";

  const handleStart = () => {
    setStarted(true);
    if (isSupported && voiceEnabled) {
      speakScript(NARRATION, (i) => setCue(i));
    } else {
      // Fallback: stagger reveals without voice
      [0, 600, 1200, 1800].forEach((delay, i) =>
        setTimeout(() => setCue(i), delay)
      );
    }
  };

  const toggle = (id: string) =>
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F8FAFC" }}>

      {/* Minimal top bar */}
      <header className="flex items-center justify-between px-8 py-3 border-b" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md flex items-center justify-center font-black text-white text-xs" style={{ backgroundColor: "#2563EB" }}>K</div>
          <span className="text-sm font-semibold" style={{ color: "#111827" }}>Kaarani</span>
        </div>
        {isSupported && (
          <button
            type="button"
            onClick={() => { if (voiceEnabled) stop(); setVoiceEnabled(!voiceEnabled); }}
            className="text-xs px-3 py-1.5 rounded-lg border transition-colors"
            style={{ borderColor: "#E5E7EB", color: "#6B7280", backgroundColor: "#FFFFFF" }}
          >
            {voiceEnabled ? "🔊 Mute" : "🔇 Unmute"}
          </button>
        )}
      </header>

      {/* Main content */}
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-12 md:gap-16 items-center md:items-start">

          {/* ── Left: Kaarani avatar ── */}
          <div className="flex flex-col items-center gap-4 md:pt-4 flex-shrink-0">
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                backgroundColor: "#EFF6FF",
                border: "2px solid #BFDBFE",
                width: "240px",
              }}
            >
              <KaaraniAvatar size={240} emotion={kaaraniEmotion} className="w-full h-auto" />
            </div>
            <div className="text-center">
              <p className="font-bold text-sm" style={{ color: "#111827" }}>Kaarani</p>
              <p className="text-xs" style={{ color: "#9CA3AF" }}>
                {isSpeaking ? "Speaking…" : "Your Power BI guide"}
              </p>
            </div>
            {/* Voice wave bars */}
            {isSupported && voiceEnabled && started && (
              <div className="flex items-end gap-1" style={{ height: "20px" }}>
                {[0, 1, 2, 3, 4].map(i => (
                  <span
                    key={i}
                    className={isSpeaking ? "wave-bar" : ""}
                    style={{
                      display: "block",
                      width: "4px",
                      height: isSpeaking ? "100%" : "30%",
                      backgroundColor: isSpeaking ? "#2563EB" : "#D1D5DB",
                      borderRadius: "2px",
                      transition: "background-color 0.3s, height 0.3s",
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── Right: content ── */}
          <div className="flex-1 min-w-0">

            {/* Phase 1: before started */}
            {!started && (
              <div className="animate-fade-in-up">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#2563EB" }}>
                  Module 0 · Getting Started
                </span>
                <h1 className="text-3xl font-black mt-2 mb-3" style={{ color: "#111827" }}>
                  Hi, I&apos;m Kaarani.
                </h1>
                <p className="text-base mb-8" style={{ color: "#6B7280", lineHeight: "1.7" }}>
                  Your personal Power BI guide. Before we dive into the good stuff, let&apos;s get you set up — three quick steps, about 5 minutes.
                </p>
                <button
                  type="button"
                  onClick={handleStart}
                  className="flex items-center gap-3 px-7 py-4 rounded-2xl text-base font-bold text-white transition-all"
                  style={{
                    backgroundColor: "#2563EB",
                    boxShadow: "0 4px 24px rgba(37,99,235,0.35)",
                  }}
                  onMouseOver={e => (e.currentTarget.style.backgroundColor = "#1D4ED8")}
                  onMouseOut={e => (e.currentTarget.style.backgroundColor = "#2563EB")}
                >
                  <span>▶</span>
                  Let&apos;s Get Started
                </button>
                <p className="mt-5 text-xs" style={{ color: "#9CA3AF" }}>
                  Already have Power BI?{" "}
                  <button type="button" onClick={onNext} className="underline cursor-pointer font-semibold" style={{ color: "#2563EB" }}>
                    Skip ahead →
                  </button>
                </p>
              </div>
            )}

            {/* Phase 2: after started — steps reveal per cue */}
            {started && (
              <div>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#2563EB" }}>
                  Module 0 · Getting Started
                </span>
                <h1 className="text-2xl font-black mt-2 mb-6" style={{ color: "#111827" }}>
                  Three quick steps.
                </h1>

                <div className="flex flex-col gap-4">
                  {CHECKS.map((item, i) => {
                    if (cue < i + 1) return null;
                    const isDone = !!checked[item.id];

                    return (
                      <div key={item.id} className="animate-cue-in">
                        <button
                          type="button"
                          onClick={() => toggle(item.id)}
                          className="flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer w-full"
                          style={{
                            borderColor: isDone ? "#2563EB" : "#E5E7EB",
                            backgroundColor: "#FFFFFF",
                            boxShadow: isDone
                              ? "0 0 0 3px rgba(37,99,235,0.10)"
                              : "0 1px 4px rgba(0,0,0,0.05)",
                          }}
                        >
                          {/* Checkbox */}
                          <div
                            className="mt-0.5 w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200"
                            style={{
                              borderColor: isDone ? "#2563EB" : "#D1D5DB",
                              backgroundColor: isDone ? "#2563EB" : "transparent",
                            }}
                          >
                            {isDone && (
                              <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                                <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>

                          {/* Text */}
                          <div className="flex-1">
                            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: isDone ? "#2563EB" : "#9CA3AF" }}>
                              Step {item.step}
                            </span>
                            <h3
                              className="font-bold text-sm mt-0.5 mb-1"
                              style={{
                                color: isDone ? "#2563EB" : "#111827",
                                textDecoration: isDone ? "line-through" : "none",
                              }}
                            >
                              {item.label}
                            </h3>
                            <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>
                              {item.description}
                            </p>
                            {item.note && (
                              <p className="text-xs mt-1.5 font-medium" style={{ color: "#2563EB" }}>
                                {item.note}
                              </p>
                            )}
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Continue — appears after all 3 steps revealed */}
                {cue >= 3 && (
                  <div className="mt-8 animate-cue-in">
                    <button
                      type="button"
                      onClick={onNext}
                      className="w-full py-4 rounded-2xl text-base font-bold text-white transition-all"
                      style={{
                        backgroundColor: "#2563EB",
                        boxShadow: "0 4px 24px rgba(37,99,235,0.25)",
                      }}
                      onMouseOver={e => (e.currentTarget.style.backgroundColor = "#1D4ED8")}
                      onMouseOut={e => (e.currentTarget.style.backgroundColor = "#2563EB")}
                    >
                      {allChecked ? "Power BI is ready! Continue →" : "All set? Continue →"}
                    </button>
                    <p className="mt-3 text-xs text-center" style={{ color: "#9CA3AF" }}>
                      Already have Power BI?{" "}
                      <button type="button" onClick={onNext} className="underline font-semibold cursor-pointer" style={{ color: "#2563EB" }}>
                        Skip ahead →
                      </button>
                    </p>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
