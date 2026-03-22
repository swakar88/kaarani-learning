"use client";

import React, { useEffect, useRef } from "react";
import { useSpeech } from "@/hooks/useSpeech";
import { useKaarani } from "@/context/KaaraniContext";

interface KaaraniSidebarProps {
  text: string;
  hint?: string;
  screenKey?: string | number;
  script?: string[];                      // optional scripted segments
  onCueChange?: (cue: number) => void;    // fires when each segment starts
}

export function KaaraniSidebar({ text, hint, screenKey, script, onCueChange }: KaaraniSidebarProps) {
  const { voiceEnabled, setVoiceEnabled } = useKaarani();
  const { speak, speakScript, stop, isSpeaking, isSupported } = useSpeech();
  const hasSpokeRef = useRef<string | number | null>(null);

  useEffect(() => {
    if (!voiceEnabled) return;
    if (hasSpokeRef.current === screenKey) return;
    hasSpokeRef.current = screenKey ?? "init";

    const timer = setTimeout(() => {
      if (script && script.length > 0) {
        speakScript(script, onCueChange);
      } else {
        speak(text);
      }
    }, 600);

    return () => {
      clearTimeout(timer);
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenKey, voiceEnabled]);

  useEffect(() => {
    if (!voiceEnabled) stop();
  }, [voiceEnabled, stop]);

  const handleReplay = () => {
    if (script && script.length > 0) {
      speakScript(script, onCueChange);
    } else {
      speak(text);
    }
  };

  return (
    <div className="flex flex-col gap-5 h-full">

      {/* Avatar + voice bars */}
      <div className="flex items-center gap-3 pb-4 border-b" style={{ borderColor: "#F3F4F6" }}>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-base flex-shrink-0 ${isSpeaking ? "animate-kaarani-pulse" : ""}`}
          style={{ backgroundColor: "#2563EB" }}>
          K
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{ color: "#111827" }}>Kaarani</p>
          <p className="text-xs" style={{ color: "#9CA3AF" }}>
            {isSpeaking ? "Speaking…" : "Your guide"}
          </p>
        </div>
        {/* Voice wave bars — always visible, animated when speaking */}
        {isSupported && voiceEnabled && (
          <div className="flex items-end gap-0.5" style={{ height: "18px" }}>
            {[0, 1, 2, 3, 4].map(i => (
              <span
                key={i}
                className={isSpeaking ? "wave-bar" : ""}
                style={{
                  display: "block",
                  width: "3px",
                  height: isSpeaking ? "100%" : "35%",
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

      {/* Narration text */}
      <p className="text-sm leading-7 flex-1" style={{ color: "#374151" }}>{text}</p>

      {/* Hint */}
      {hint && (
        <div className="rounded-lg p-4 text-sm leading-relaxed" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#9CA3AF" }}>Tip</p>
          <p style={{ color: "#374151" }}>{hint}</p>
        </div>
      )}

      {/* Voice controls */}
      {isSupported && (
        <div className="flex items-center gap-2 pt-4 border-t" style={{ borderColor: "#F3F4F6" }}>
          <button type="button" onClick={handleReplay} disabled={isSpeaking}
            className="flex-1 py-2 text-xs font-medium rounded-lg border transition-colors disabled:opacity-40"
            style={{ borderColor: "#E5E7EB", color: "#6B7280", backgroundColor: "#FFFFFF" }}>
            Replay
          </button>
          <button type="button"
            onClick={() => { if (voiceEnabled) stop(); setVoiceEnabled(!voiceEnabled); }}
            className="py-2 px-3 text-xs font-medium rounded-lg border transition-colors"
            style={{ borderColor: "#E5E7EB", color: voiceEnabled ? "#6B7280" : "#2563EB", backgroundColor: "#FFFFFF" }}>
            {voiceEnabled ? "Mute" : "Unmute"}
          </button>
        </div>
      )}
    </div>
  );
}
