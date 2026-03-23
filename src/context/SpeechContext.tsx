"use client";

import React, { createContext, useContext } from "react";
import { useSpeech, UseSpeechReturn } from "@/hooks/useSpeech";

const SpeechContext = createContext<UseSpeechReturn | null>(null);

export function SpeechProvider({ children }: { children: React.ReactNode }) {
  const speech = useSpeech();
  return <SpeechContext.Provider value={speech}>{children}</SpeechContext.Provider>;
}

export function useSpeechContext(): UseSpeechReturn {
  const ctx = useContext(SpeechContext);
  if (!ctx) throw new Error("useSpeechContext must be used inside SpeechProvider");
  return ctx;
}
