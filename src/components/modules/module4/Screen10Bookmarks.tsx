"use client";

import React, { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { ScreenHeader, PowerBICallout } from "@/components/ui/ScreenSection";

const M_COLOR = "#2563EB";

export default function Screen10Bookmarks({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);
  const [view, setView] = useState<"overview" | "detail">("overview");

  return (
    <ModuleLayout moduleId={4} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Bookmarks let you save the state of a report — which visuals are visible, what filters are applied — and switch between states with a button click. This is how you build navigation, toggle between views, and create animated storytelling in Power BI."
      kaaraniHint="Bookmarks combined with Buttons create the closest thing to an app inside Power BI. You can build a full navigation menu that switches between report pages."
      onPrev={onPrev}
      primaryAction={{ label: "Forecasting →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={4} label="Module 4 · Screen 10" title="Bookmarks & Buttons "
          subtitle="Save report states. Build navigation. Create interactive storytelling." moduleColor={M_COLOR} />

        {/* Interactive demo */}
        <div className="rounded-3xl p-5 mb-5" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: M_COLOR }}>
            Live demo — toggle view with bookmarks
          </p>
          <div className="flex gap-2 mb-4">
            {[
              { id: "overview" as const, label: " Overview" },
              { id: "detail" as const, label: " Detail" },
            ].map(b => (
              <button key={b.id} type="button" onClick={() => setView(b.id)}
                className="flex-1 py-2.5 rounded-xl font-bold text-sm cursor-pointer transition-all"
                style={{ backgroundColor: view === b.id ? M_COLOR : "#E5E7EB", color: view === b.id ? "white" : "#3D2B1F" }}>
                {b.label}
              </button>
            ))}
          </div>

          <div className="rounded-2xl p-4 animate-fade-in-up" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8", minHeight: "100px" }}>
            {view === "overview" ? (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: M_COLOR }}>Overview mode — KPI cards visible</p>
                <div className="grid grid-cols-3 gap-2">
                  {[flavor.metric1Label, flavor.metric2Label, "Total Items"].map(k => (
                    <div key={k} className="rounded-lg p-2 text-center" style={{ backgroundColor: "#FFFFFF"}}>
                      <p className="text-sm font-black" style={{ color: M_COLOR }}>—</p>
                      <p className="text-[10px]" style={{ color: "#6B7280" }}>{k}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs mt-2" style={{ color: "#6B7280" }}>Detail chart is hidden in this bookmark</p>
              </div>
            ) : (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#2563EB" }}>Detail mode — table visible, KPI cards hidden</p>
                <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #E8E8E8" }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-3 px-3 py-1.5 text-xs border-b" style={{ borderColor: "#F9FAFB", color: "#111827" }}>
                      <span>Row {i}</span><span className="flex-1 text-right" style={{ color: "#2563EB" }}>Value {i * 100}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs mt-2" style={{ color: "#6B7280" }}>KPI cards are hidden in this bookmark</p>
              </div>
            )}
          </div>
        </div>

        {/* Use cases */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { icon: "", label: "Page navigation", desc: "Buttons that act like tabs between report pages" },
            { icon: "", label: "Show/hide visuals", desc: "Toggle a chart on/off without adding a new page" },
            { icon: "", label: "Storytelling", desc: "Step through a narrative — each bookmark = one chapter" },
            { icon: "", label: "Reset filters", desc: "A 'Reset' button that returns to the default bookmark state" },
          ].map(u => (
            <div key={u.label} className="rounded-xl p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
                            <p className="font-bold text-xs mt-1.5 mb-0.5" style={{ color: "#111827" }}>{u.label}</p>
              <p className="text-[10px]" style={{ color: "#6B7280" }}>{u.desc}</p>
            </div>
          ))}
        </div>

        <PowerBICallout title="How to create bookmarks"
          items={["View ribbon → Bookmarks pane", "Set the visual/filter state you want", "Bookmarks pane → Add", "Insert a Button → Action → Bookmark → select it", "Test in Reading View"]} />
      </div>
    </ModuleLayout>
  );
}
