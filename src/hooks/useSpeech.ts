"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface UseSpeechReturn {
  speak: (text: string) => void;
  speakScript: (segments: string[], onSegmentStart?: (index: number) => void) => void;
  stop: () => void;
  isSpeaking: boolean;
  isSupported: boolean;
}

// Module-level voice cache — shared across hook instances, survives re-renders
let _voicesCache: SpeechSynthesisVoice[] = [];
let _voicesLoaded = false;

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (_voicesLoaded && _voicesCache.length > 0) return Promise.resolve(_voicesCache);
  return new Promise(resolve => {
    const immediate = window.speechSynthesis.getVoices();
    if (immediate.length > 0) {
      _voicesCache = immediate;
      _voicesLoaded = true;
      resolve(immediate);
      return;
    }
    const handler = () => {
      _voicesCache = window.speechSynthesis.getVoices();
      _voicesLoaded = true;
      window.speechSynthesis.removeEventListener("voiceschanged", handler);
      resolve(_voicesCache);
    };
    window.speechSynthesis.addEventListener("voiceschanged", handler);
    // Fallback — some browsers never fire voiceschanged
    setTimeout(() => {
      if (!_voicesLoaded) {
        _voicesCache = window.speechSynthesis.getVoices();
        _voicesLoaded = true;
        resolve(_voicesCache);
      }
    }, 2500);
  });
}

// Priority list — most human-like first.
// Microsoft Edge neural voices (marked "Natural") are the best available in browsers.
// Falls back progressively to decent system voices.
const VOICE_PRIORITY = [
  // Edge / Windows neural voices (most human-like)
  "Microsoft Aria Online (Natural)",
  "Microsoft Jenny Online (Natural)",
  "Microsoft Michelle Online (Natural)",
  "Microsoft Ana Online (Natural)",
  "Microsoft Sara Online (Natural)",
  "Microsoft Aria",
  "Microsoft Jenny",
  // Chrome on Windows
  "Google US English",
  "Google UK English Female",
  // macOS / iOS
  "Samantha",
  "Karen",
  "Moira",
  "Tessa",
  // Older Windows fallback
  "Microsoft Zira Desktop",
  "Zira",
];

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  // Try each preferred name in order
  for (const name of VOICE_PRIORITY) {
    const match = voices.find(v => v.name.includes(name) && v.lang.startsWith("en"));
    if (match) return match;
  }
  // Last resort: any English female voice
  return voices.find(v => v.lang.startsWith("en") && v.name.toLowerCase().includes("female")) ?? null;
}

export function useSpeech(): UseSpeechReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const cancelledRef = useRef(false);

  useEffect(() => {
    const supported = typeof window !== "undefined" && "speechSynthesis" in window;
    setIsSupported(supported);
    if (supported) loadVoices(); // warm up while user reads
  }, []);

  const stop = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    cancelledRef.current = true;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  // Speaks one string, returns Promise that resolves when utterance ends
  const speakOne = useCallback((text: string): Promise<void> => {
    return new Promise(async resolve => {
      if (
        typeof window === "undefined" ||
        !window.speechSynthesis ||
        cancelledRef.current
      ) {
        resolve();
        return;
      }
      const voices = await loadVoices();
      if (cancelledRef.current) { resolve(); return; }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;   // natural pace — neural voices already have good rhythm
      utterance.pitch = 1.0;  // flat pitch — neural voices handle expressiveness themselves
      utterance.volume = 1.0;
      const preferred = pickVoice(voices);
      if (preferred) utterance.voice = preferred;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => { setIsSpeaking(false); resolve(); };
      utterance.onerror = () => { setIsSpeaking(false); resolve(); };

      window.speechSynthesis.speak(utterance);
    });
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      cancelledRef.current = false;
      window.speechSynthesis.cancel();
      // 50ms delay after cancel — Chrome bug: speak() immediately after cancel() silently fails
      setTimeout(() => {
        if (!cancelledRef.current) speakOne(text);
      }, 50);
    },
    [speakOne]
  );

  const speakScript = useCallback(
    (segments: string[], onSegmentStart?: (index: number) => void) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      cancelledRef.current = false;
      window.speechSynthesis.cancel();

      const run = async () => {
        await new Promise(r => setTimeout(r, 50)); // Chrome cancel bug workaround
        for (let i = 0; i < segments.length; i++) {
          if (cancelledRef.current) break;
          onSegmentStart?.(i);
          await speakOne(segments[i]);
          if (i < segments.length - 1 && !cancelledRef.current) {
            await new Promise(r => setTimeout(r, 320)); // natural pause between segments
          }
        }
      };
      run();
    },
    [speakOne]
  );

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return { speak, speakScript, stop, isSpeaking, isSupported };
}
