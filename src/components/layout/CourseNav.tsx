"use client";

import { useState } from "react";
import { MODULES } from "@/data/modules";
import { MODULE_SCREENS, TOTAL_SCREENS } from "@/data/screens";

interface CourseNavProps {
  currentModuleId: number;
  currentScreen: number;
  completedModules: number[];
  completedScreensCount: number;
  onNavigate: (moduleId: number, screenIndex: number) => void;
}

export function CourseNav({
  currentModuleId,
  currentScreen,
  completedModules,
  completedScreensCount,
  onNavigate,
}: CourseNavProps) {
  const [expandedModule, setExpandedModule] = useState<number>(currentModuleId);

  const toggleModule = (id: number) => {
    setExpandedModule(prev => prev === id ? -1 : id);
  };

  // Calculate how many screens in modules before the given module are "done"
  // A screen is considered complete if its module is complete, OR if it's in
  // the current module and its index < currentScreen
  const isScreenComplete = (moduleId: number, screenIdx: number): boolean => {
    if (completedModules.includes(moduleId)) return true;
    if (moduleId === currentModuleId && screenIdx < currentScreen) return true;
    return false;
  };

  const isScreenActive = (moduleId: number, screenIdx: number): boolean =>
    moduleId === currentModuleId && screenIdx === currentScreen;

  return (
    <aside
      className="flex-shrink-0 flex flex-col border-r overflow-y-auto"
      style={{ width: 200, backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b sticky top-0 z-10" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "#9CA3AF" }}>Course</p>
        <p className="text-xs font-semibold" style={{ color: "#374151" }}>
          {completedScreensCount} <span style={{ color: "#9CA3AF" }}>/ {TOTAL_SCREENS} screens</span>
        </p>
      </div>

      {/* Module list */}
      <div className="flex flex-col py-2">
        {MODULES.map(mod => {
          const screens = MODULE_SCREENS[mod.id] ?? [];
          const isExpanded = expandedModule === mod.id;
          const isModuleComplete = completedModules.includes(mod.id);
          const isCurrentModule = mod.id === currentModuleId;

          return (
            <div key={mod.id}>
              {/* Module header row */}
              <button
                type="button"
                onClick={() => toggleModule(mod.id)}
                className="w-full flex items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-gray-50"
                style={{ backgroundColor: isCurrentModule && !isExpanded ? "#F8FAFC" : undefined }}
              >
                {/* Color dot */}
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: mod.color }}
                />
                <span
                  className="flex-1 text-[11px] font-semibold leading-tight truncate"
                  style={{ color: isCurrentModule ? "#111827" : "#6B7280" }}
                >
                  {mod.title}
                </span>
                {/* Completion / chevron */}
                {isModuleComplete ? (
                  <span className="text-[10px] flex-shrink-0" style={{ color: "#16A34A" }}>✓</span>
                ) : (
                  <span className="text-[10px] flex-shrink-0" style={{ color: "#9CA3AF" }}>
                    {isExpanded ? "▲" : "▼"}
                  </span>
                )}
              </button>

              {/* Screen rows */}
              {isExpanded && screens.map((name, idx) => {
                const active = isScreenActive(mod.id, idx);
                const done = isScreenComplete(mod.id, idx);

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onNavigate(mod.id, idx)}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-left transition-colors"
                    style={{
                      paddingLeft: 20,
                      backgroundColor: active ? "#EFF6FF" : undefined,
                      borderLeft: active ? "2px solid #2563EB" : "2px solid transparent",
                    }}
                    onMouseEnter={e => {
                      if (!active) e.currentTarget.style.backgroundColor = "#F9FAFB";
                    }}
                    onMouseLeave={e => {
                      if (!active) e.currentTarget.style.backgroundColor = "";
                    }}
                  >
                    {/* Status indicator */}
                    <span className="w-3 flex-shrink-0 text-center">
                      {active ? (
                        <span style={{ color: "#2563EB", fontSize: 8 }}>●</span>
                      ) : done ? (
                        <span style={{ color: "#16A34A", fontSize: 9 }}>✓</span>
                      ) : (
                        <span style={{ color: "#D1D5DB", fontSize: 8 }}>○</span>
                      )}
                    </span>
                    <span
                      className="text-[11px] leading-snug"
                      style={{
                        color: active ? "#2563EB" : done ? "#6B7280" : "#9CA3AF",
                        fontWeight: active ? 600 : 400,
                      }}
                    >
                      {name}
                    </span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
