"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ProgressDots } from "./ProgressDots";
import { CourseNav } from "./CourseNav";
import { KaaraniSidebar } from "@/components/kaarani/KaaraniSidebar";
import { KaaraniEmotion } from "@/components/kaarani/KaaraniAvatar";
import { MODULES } from "@/data/modules";
import { MODULE_SCREENS } from "@/data/screens";
import { useKaarani } from "@/context/KaaraniContext";

interface PrimaryAction {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

interface ModuleLayoutProps {
  moduleId: number;
  screenIndex: number;
  totalScreens: number;
  kaaraniText: string;
  kaaraniHint?: string;
  kaaraniEmotion?: KaaraniEmotion;
  primaryAction: PrimaryAction;
  onPrev?: () => void;
  children: React.ReactNode;
}

export function ModuleLayout({
  moduleId,
  screenIndex,
  totalScreens,
  kaaraniText,
  kaaraniHint,
  kaaraniEmotion,
  primaryAction,
  onPrev,
  children,
}: ModuleLayoutProps) {
  const router = useRouter();
  const module = MODULES[moduleId] ?? MODULES[0];
  const { unlockVoice, completedModules, currentScreen, setCurrentScreen, setCurrentModule } = useKaarani();

  // Count completed screens for nav header
  const completedScreensCount = completedModules.reduce((sum, mid) => {
    return sum + (MODULE_SCREENS[mid]?.length ?? 0);
  }, 0) + currentScreen;

  const handleNavigate = (targetModuleId: number, targetScreen: number) => {
    setCurrentScreen(targetScreen);
    if (targetModuleId !== moduleId) {
      setCurrentModule(targetModuleId);
      router.push(`/module/${targetModuleId}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#F8FAFC" }}>

      {/* Top bar */}
      <header className="flex items-center justify-between px-8 py-3 border-b" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm" style={{ backgroundColor: "#2563EB" }}>
            K
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest" style={{ color: "#9CA3AF" }}>
              Module {moduleId} of {MODULES.length - 1}
            </p>
            <p className="text-sm font-semibold" style={{ color: "#111827" }}>
              {module.title}
            </p>
          </div>
        </div>
        <ProgressDots total={totalScreens} current={screenIndex} />
      </header>

      {/* Main */}
      <main className="flex flex-1 overflow-hidden">
        <CourseNav
          currentModuleId={moduleId}
          currentScreen={screenIndex}
          completedModules={completedModules}
          completedScreensCount={completedScreensCount}
          onNavigate={handleNavigate}
        />
        <section className="flex-1 overflow-y-auto px-8 py-10 animate-fade-in-up">
          {children}
        </section>
        <aside className="w-72 xl:w-80 flex-shrink-0 overflow-y-auto p-6 border-l" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}>
          <KaaraniSidebar
            text={kaaraniText}
            hint={kaaraniHint}
            emotion={kaaraniEmotion}
          />
        </aside>
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-between px-8 py-4 border-t" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}>
        <div>
          {onPrev ? (
            <button type="button" onClick={onPrev}
              className="px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors"
              style={{ color: "#6B7280", backgroundColor: "transparent" }}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = "#F3F4F6")}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = "transparent")}>
              ← Back
            </button>
          ) : <span />}
        </div>
        <button
          type="button"
          onClick={() => { unlockVoice(); primaryAction.onClick(); }}
          disabled={primaryAction.disabled || primaryAction.loading}
          className="px-6 py-2.5 text-sm font-semibold rounded-lg text-white transition-all disabled:opacity-50"
          style={{ backgroundColor: "#2563EB" }}
          onMouseOver={e => { if (!primaryAction.disabled) e.currentTarget.style.backgroundColor = "#1D4ED8"; }}
          onMouseOut={e => { e.currentTarget.style.backgroundColor = "#2563EB"; }}>
          {primaryAction.loading ? "Loading…" : primaryAction.label}
        </button>
      </footer>
    </div>
  );
}
