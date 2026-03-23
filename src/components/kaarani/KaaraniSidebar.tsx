"use client";

import React, { useEffect } from "react";
import { useSpeechContext } from "@/context/SpeechContext";
import { useKaarani } from "@/context/KaaraniContext";
import { KaaraniAvatar } from "./KaaraniAvatar";

interface KaaraniSidebarProps {
  text: string;
  hint?: string;
}

export function KaaraniSidebar({ text, hint }: KaaraniSidebarProps) {
  const { voiceEnabled, setVoiceEnabled, voiceUnlocked, unlockVoice } = useKaarani();
  const { speak, stop, isSpeaking, isSupported } = useSpeechContext();

  // Stop speech when muted
  useEffect(() => {
    if (!voiceEnabled) stop();
  }, [voiceEnabled, stop]);

  const handleReplay = () => {
    if (!voiceUnlocked) unlockVoice();
    speak(text);
  };

  return (
    <div className="flex flex-col gap-5 h-full">

      {/* Avatar + status */}
      <div className="flex items-center gap-3 pb-4 border-b" style={{ borderColor: "#F3F4F6" }}>
        <KaaraniAvatar
          size={44}
          emotion={isSpeaking ? "talking" : "idle"}
        />
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{ color: "#111827" }}>Kaarani</p>
          <p className="text-xs" style={{ color: "#9CA3AF" }}>
            {isSpeaking ? "Speaking…" : "Your guide"}
          </p>
        </div>
        {/* Voice wave bars */}
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
          {!voiceUnlocked ? (
            <button type="button" onClick={handleReplay}
              className="flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors"
              style={{ borderColor: "#2563EB", color: "#2563EB", backgroundColor: "#EFF6FF" }}>
              Tap to hear Kaarani
            </button>
          ) : (
            <button type="button" onClick={handleReplay} disabled={isSpeaking}
              className="flex-1 py-2 text-xs font-medium rounded-lg border transition-colors disabled:opacity-40"
              style={{ borderColor: "#E5E7EB", color: "#6B7280", backgroundColor: "#FFFFFF" }}>
              Replay
            </button>
          )}
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
