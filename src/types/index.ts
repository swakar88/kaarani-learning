// ─── Flavor ────────────────────────────────────────────────────────────────

export interface Flavor {
  id: string;
  label: string;
  emoji: string;
  description: string;
  sampleMetric: string; // e.g. "runs scored", "box office revenue"
  dimension1Label: string; // e.g. "Player", "Actor"
  dimension2Label: string; // e.g. "Team", "Genre"
  metric1Label: string; // e.g. "Runs", "Revenue"
  metric2Label: string; // e.g. "Wickets", "Rating"
}

// ─── Universal Schema ──────────────────────────────────────────────────────

export interface UniversalRow {
  category: string;
  date: string; // ISO date
  dimension1: string;
  dimension2: string;
  metric1: number;
  metric2: number;
}

// ─── Module ────────────────────────────────────────────────────────────────

export interface ModuleInfo {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  screenCount: number;
  color: string; // tailwind class for accent
  icon: string; // emoji
  topics: string[];
}

// ─── Screen ────────────────────────────────────────────────────────────────

export interface ScreenProps {
  onNext: () => void;
  onPrev?: () => void;
  screenIndex: number;
  totalScreens: number;
}

// ─── Placeholder ───────────────────────────────────────────────────────────

export type PlaceholderType =
  | "report"
  | "chart"
  | "animation"
  | "image"
  | "video"
  | "dataset"
  | "diagram"
  | "interaction";

// ─── Kaarani Context ───────────────────────────────────────────────────────

export interface KaaraniState {
  selectedFlavor: string; // flavor id
  setSelectedFlavor: (id: string) => void;
  voiceEnabled: boolean;
  setVoiceEnabled: (v: boolean) => void;
  voiceUnlocked: boolean; // true once user has clicked anything (browser gesture)
  unlockVoice: () => void;
  completedModules: number[];
  markModuleComplete: (id: number) => void;
  currentModule: number;
  setCurrentModule: (id: number) => void;
}
