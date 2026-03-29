"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { KaaraniState } from "@/types";
import { DEFAULT_FLAVOR_ID } from "@/data/flavors";

const KaaraniContext = createContext<KaaraniState | null>(null);

const STORAGE_KEY = "kaarani_state";

interface StoredState {
  selectedFlavor: string;
  voiceEnabled: boolean;
  completedModules: number[];
  currentModule: number;
}

export function KaaraniProvider({ children }: { children: React.ReactNode }) {
  const [selectedFlavor, setSelectedFlavorState] =
    useState<string>(DEFAULT_FLAVOR_ID);
  const [voiceEnabled, setVoiceEnabledState] = useState<boolean>(true);
  const [voiceUnlocked, setVoiceUnlocked] = useState<boolean>(false);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [currentModule, setCurrentModuleState] = useState<number>(0);
  const [currentScreen, setCurrentScreenState] = useState<number>(0);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted state on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: StoredState = JSON.parse(raw);
        if (saved.selectedFlavor) setSelectedFlavorState(saved.selectedFlavor);
        if (typeof saved.voiceEnabled === "boolean")
          setVoiceEnabledState(saved.voiceEnabled);
        if (Array.isArray(saved.completedModules))
          setCompletedModules(saved.completedModules);
        if (typeof saved.currentModule === "number")
          setCurrentModuleState(saved.currentModule);
      }
    } catch {
      // ignore storage errors
    }
    setHydrated(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydrated) return;
    try {
      const toSave: StoredState = {
        selectedFlavor,
        voiceEnabled,
        completedModules,
        currentModule,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      // ignore
    }
  }, [selectedFlavor, voiceEnabled, completedModules, currentModule, hydrated]);

  const setSelectedFlavor = useCallback((id: string) => {
    setSelectedFlavorState(id);
  }, []);

  const setVoiceEnabled = useCallback((v: boolean) => {
    setVoiceEnabledState(v);
  }, []);

  const unlockVoice = useCallback(() => {
    setVoiceUnlocked(true);
  }, []);

  const markModuleComplete = useCallback((id: number) => {
    setCompletedModules((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  }, []);

  const setCurrentModule = useCallback((id: number) => {
    setCurrentModuleState(id);
  }, []);

  const setCurrentScreen = useCallback((s: number) => {
    setCurrentScreenState(s);
  }, []);

  const value: KaaraniState = {
    selectedFlavor,
    setSelectedFlavor,
    voiceEnabled,
    setVoiceEnabled,
    voiceUnlocked,
    unlockVoice,
    completedModules,
    markModuleComplete,
    currentModule,
    setCurrentModule,
    currentScreen,
    setCurrentScreen,
  };

  return (
    <KaaraniContext.Provider value={value}>
      {children}
    </KaaraniContext.Provider>
  );
}

export function useKaarani(): KaaraniState {
  const ctx = useContext(KaaraniContext);
  if (!ctx) {
    throw new Error("useKaarani must be used within KaaraniProvider");
  }
  return ctx;
}
