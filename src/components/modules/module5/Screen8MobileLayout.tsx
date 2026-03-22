"use client";

import React, { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorSharingScenario } from "@/data/module5";
import { ScreenHeader } from "@/components/ui/ScreenSection";

const M_COLOR = "#2563EB";

export default function Screen8MobileLayout({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);
  const scenario = getFlavorSharingScenario(selectedFlavor);
  const [view, setView] = useState<"desktop" | "mobile">("desktop");
  const [addedKPI, setAddedKPI] = useState<number[]>([]);

  const kpis = scenario.mobileKPIs;

  const toggleKPI = (i: number) => {
    setAddedKPI(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  return (
    <ModuleLayout moduleId={5} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Power BI has a dedicated mobile layout editor in Desktop. Your desktop canvas has 16 visuals — your mobile layout might have just 4 KPI cards. Executives checking their phone at the airport want the one number that matters, not a scrollable wall of charts. Design for the context, not the screen size."
      kaaraniHint="Enable the Power BI mobile app notification feature — you can set data-driven alerts that push a notification when a KPI crosses a threshold. 'Revenue dropped below target' delivered to someone's phone is more useful than a scheduled email."
      onPrev={onPrev}
      primaryAction={{ label: "Microsoft Fabric →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={5} label="Module 5 · Screen 8" title="Mobile Layout "
          subtitle="Design a separate layout for phone users. Less is more." moduleColor={M_COLOR} />

        {/* View toggle */}
        <div className="flex gap-2 mb-4 p-1 rounded-xl" style={{ backgroundColor: "#F3F4F6" }}>
          {(["desktop", "mobile"] as const).map(v => (
            <button key={v} type="button" onClick={() => setView(v)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold capitalize transition-all"
              style={{ backgroundColor: view === v ? "#FFFFFF" : "transparent", color: view === v ? M_COLOR : "#8B6650", boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none" }}>
              <span>{v === "desktop" ? "" : ""}</span> {v}
            </button>
          ))}
        </div>

        {view === "desktop" && (
          <div className="rounded-2xl p-4 mb-4 animate-fade-in-up" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
            <p className="text-xs font-bold mb-3" style={{ color: "#6B7280" }}>Desktop canvas — full {flavor.label} dashboard</p>
            <div className="grid grid-cols-3 gap-2">
              {[...kpis, "Bar chart", "Line chart", "Table"].map((item, i) => (
                <div key={i} className="rounded-lg p-2 text-center text-xs" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", color: "#111827" }}>
                  {item}
                </div>
              ))}
            </div>
            <p className="text-xs mt-3 text-center" style={{ color: "#6B7280" }}>All {kpis.length + 3} visuals visible on desktop</p>
          </div>
        )}

        {view === "mobile" && (
          <div className="animate-fade-in-up mb-4">
            <p className="text-xs font-bold mb-2" style={{ color: "#6B7280" }}>Tap to add KPIs to mobile layout:</p>
            <div className="flex flex-col gap-2 mb-3">
              {kpis.map((kpi, i) => (
                <button key={i} type="button" onClick={() => toggleKPI(i)}
                  className="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all text-left"
                  style={{ borderColor: addedKPI.includes(i) ? M_COLOR : "#E5E7EB", backgroundColor: addedKPI.includes(i) ? M_COLOR + "0C" : "#FFFFFF" }}>
                  <span className="text-lg">{addedKPI.includes(i) ? "" : ""}</span>
                  <p className="text-sm font-bold" style={{ color: addedKPI.includes(i) ? M_COLOR : "#3D2B1F" }}>{kpi}</p>
                  {addedKPI.includes(i) && <span className="ml-auto text-xs px-2 py-0.5 rounded-lg font-bold" style={{ backgroundColor: "#FFFFFF"}}>Added</span>}
                </button>
              ))}
            </div>
            {addedKPI.length > 0 && (
              <div className="rounded-2xl p-3 text-center animate-fade-in-up" style={{ backgroundColor: "#F9FAFB", border: "2px solid #E5E7EB" }}>
                <p className="text-sm font-bold" style={{ color: "#111827" }}> Mobile layout: {addedKPI.length} KPI{addedKPI.length > 1 ? "s" : ""} — clean and focused!</p>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl p-3" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
            <p className="text-xs font-bold mb-1" style={{ color: "#111827" }}> Mobile best practices</p>
            <ul className="text-xs space-y-1" style={{ color: "#111827" }}>
              <li>• Stack visuals vertically</li>
              <li>• Show 3–5 KPIs max</li>
              <li>• Large tap targets</li>
            </ul>
          </div>
          <div className="rounded-xl p-3" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
            <p className="text-xs font-bold mb-1" style={{ color: M_COLOR }}> Avoid</p>
            <ul className="text-xs space-y-1" style={{ color: "#111827" }}>
              <li>• Complex matrices</li>
              <li>• Small text labels</li>
              <li>• Scatter charts</li>
            </ul>
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}
