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
    <div className="flex flex-col h-full">

      {/* Large avatar — fills sidebar width */}
      <div className="relative w-full rounded-xl overflow-hidden mb-3" style={{ backgroundColor: "#EFF6FF" }}>
        <KaaraniAvatar
          size={240}
          emotion={isSpeaking ? "talking" : "idle"}
          className="w-full h-auto"
        />
        {/* Speaking indicator badge */}
        {isSpeaking && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-end gap-0.5 px-2 py-1 rounded-full"
            style={{ backgroundColor: "rgba(37,99,235,0.85)" }}>
            {[0, 1, 2, 3, 4].map(i => (
              <span key={i} className="wave-bar" style={{
                display: "block", width: "3px", height: "14px",
                backgroundColor: "#fff", borderRadius: "2px",
                animationDelay: `${i * 0.1}s`,
              }} />
            ))}
          </div>
        )}
      </div>

      {/* Name + status */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <p className="text-sm font-semibold" style={{ color: "#111827" }}>Kaarani</p>
          <p className="text-xs" style={{ color: "#9CA3AF" }}>
            {isSpeaking ? "Speaking…" : "Your guide"}
          </p>
        </div>
        {isSupported && (
          <button type="button"
            onClick={() => { if (voiceEnabled) stop(); setVoiceEnabled(!voiceEnabled); }}
            className="py-1 px-2.5 text-xs font-medium rounded-lg border transition-colors"
            style={{ borderColor: "#E5E7EB", color: voiceEnabled ? "#6B7280" : "#2563EB", backgroundColor: "#FFFFFF" }}>
            {voiceEnabled ? "Mute" : "Unmute"}
          </button>
        )}
      </div>

      {/* Narration text — scrollable middle */}
      <p className="text-sm leading-7 flex-1 overflow-y-auto px-1" style={{ color: "#374151" }}>{text}</p>

      {/* Hint */}
      {hint && (
        <div className="rounded-lg p-3 text-sm leading-relaxed mt-3" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#9CA3AF" }}>Tip</p>
          <p style={{ color: "#374151" }}>{hint}</p>
        </div>
      )}

      {/* Replay */}
      {isSupported && (
        <div className="pt-3 mt-3 border-t" style={{ borderColor: "#F3F4F6" }}>
          {!voiceUnlocked ? (
            <button type="button" onClick={handleReplay}
              className="w-full py-2 text-xs font-semibold rounded-lg border transition-colors"
              style={{ borderColor: "#2563EB", color: "#2563EB", backgroundColor: "#EFF6FF" }}>
              Tap to hear Kaarani
            </button>
          ) : (
            <button type="button" onClick={handleReplay} disabled={isSpeaking}
              className="w-full py-2 text-xs font-medium rounded-lg border transition-colors disabled:opacity-40"
              style={{ borderColor: "#E5E7EB", color: "#6B7280", backgroundColor: "#FFFFFF" }}>
              Replay
            </button>
          )}
        </div>
      )}
    </div>
  );
}
