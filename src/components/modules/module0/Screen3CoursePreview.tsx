"use client";

import React from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { MODULES } from "@/data/modules";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";

const KAARANI_HINT = "Each module has 8–15 screens. You can pause and come back any time — your progress is saved.";

export default function Screen3CoursePreview({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, completedModules } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);

  return (
    <ModuleLayout
      moduleId={0}
      screenIndex={screenIndex}
      totalScreens={totalScreens}
      kaaraniText={`Here's your full learning path. Six modules, taking you from zero to Power BI analyst. I'll use ${flavor.label} data all the way through — real examples, real insights. We start with the basics and build up to publishing live dashboards.`}
      kaaraniHint={KAARANI_HINT}
      onPrev={onPrev}
      primaryAction={{ label: "Begin Module 1", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#111827" }}>Your learning path</h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Six modules — all using <span className="font-semibold" style={{ color: "#2563EB" }}>{flavor.label}</span> data
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {MODULES.map((mod) => {
            const isComplete = completedModules.includes(mod.id);
            const isCurrent = mod.id === 0;

            return (
              <div key={mod.id} className="flex items-start gap-4 p-4 rounded-xl border transition-all"
                style={{
                  borderColor: isCurrent ? "#2563EB" : "#E5E7EB",
                  backgroundColor: "#FFFFFF",
                  opacity: mod.id > 1 ? 0.6 : 1,
                  boxShadow: isCurrent ? "0 0 0 3px rgba(37,99,235,0.08)" : "0 1px 3px rgba(0,0,0,0.04)",
                }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: isComplete || isCurrent ? "#2563EB" : "#F3F4F6", color: isComplete || isCurrent ? "#FFFFFF" : "#9CA3AF" }}>
                  {isComplete ? "✓" : mod.id}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#9CA3AF" }}>Module {mod.id}</p>
                    {isCurrent && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded text-white" style={{ backgroundColor: "#2563EB" }}>Start here</span>
                    )}
                  </div>
                  <p className="font-semibold text-sm mb-1" style={{ color: "#111827" }}>{mod.title}</p>
                  <p className="text-xs" style={{ color: "#6B7280" }}>{mod.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {mod.topics.slice(0, 4).map((topic) => (
                      <span key={topic} className="text-[10px] px-2 py-0.5 rounded" style={{ backgroundColor: "#F3F4F6", color: "#6B7280" }}>{topic}</span>
                    ))}
                    {mod.topics.length > 4 && (
                      <span className="text-[10px] px-2 py-0.5 rounded" style={{ backgroundColor: "#F3F4F6", color: "#9CA3AF" }}>+{mod.topics.length - 4} more</span>
                    )}
                  </div>
                </div>
                <p className="text-xs flex-shrink-0" style={{ color: "#9CA3AF" }}>{mod.screenCount} screens</p>
              </div>
            );
          })}
        </div>
      </div>
    </ModuleLayout>
  );
}
