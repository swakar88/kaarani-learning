"use client";

import React, { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { ScreenHeader } from "@/components/ui/ScreenSection";

const M_COLOR = "#2563EB";

const OTHER_CHARTS = [
  { id: "pie", icon: "", label: "Pie / Donut", desc: "Show parts of a whole. Use only with 2–4 slices. Donut variant is cleaner.", warning: "Avoid with more than 5 slices — humans can't compare small angles accurately." },
  { id: "scatter", icon: "", label: "Scatter Chart", desc: "Two metrics on X and Y axes. Reveals correlations. Add bubble size for a third dimension.", warning: "Needs a clear analytic question: 'Is X correlated with Y?'" },
  { id: "waterfall", icon: "", label: "Waterfall", desc: "Shows how values increase and decrease from a starting total to an ending total.", warning: "Great for financial variance analysis (budget vs actuals)." },
  { id: "funnel", icon: "", label: "Funnel", desc: "Visualises a sequential process where values decrease at each step.", warning: "Perfect for sales pipeline, conversion rates, or user flows." },
  { id: "gauge", icon: "", label: "Gauge / Bullet", desc: "Shows actual vs target. Like a speedometer. Good for progress towards a goal.", warning: "Use sparingly — gauges take a lot of space for little information." },
  { id: "treemap", icon: "", label: "Treemap", desc: "Hierarchical data as nested rectangles. Size = metric. Good for proportional comparison.", warning: "Hard to compare non-adjacent rectangles. Use for first-level overview only." },
];

export default function Screen14OtherCharts({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);
  const [active, setActive] = useState("scatter");
  const current = OTHER_CHARTS.find(c => c.id === active)!;

  return (
    <ModuleLayout moduleId={4} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Beyond the core charts, Power BI has scatter plots for correlation, waterfall charts for variance analysis, funnels for process flows, and treemaps for hierarchical proportions. Each serves a specific analytic question — don't use them for decoration."
      kaaraniHint="The best chart is the one that answers the question most directly. When in doubt, use a bar chart — it's the most universally understood visual."
      onPrev={onPrev}
      primaryAction={{ label: "Design principles →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={4} label="Module 4 · Screen 14" title="The other chart types "
          subtitle="Six more charts for specific analytic questions." moduleColor={M_COLOR} />

        <div className="grid grid-cols-3 gap-2 mb-4">
          {OTHER_CHARTS.map(c => (
            <button key={c.id} type="button" onClick={() => setActive(c.id)}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 cursor-pointer transition-all"
              style={{ borderColor: active === c.id ? M_COLOR : "#E5E7EB", backgroundColor: active === c.id ? M_COLOR + "12" : "#FFFFFF" }}>
                            <p className="text-xs font-bold text-center" style={{ color: active === c.id ? M_COLOR : "#3D2B1F" }}>{c.label}</p>
            </button>
          ))}
        </div>

        <div className="rounded-2xl p-5 mb-4 animate-fade-in-up" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
          <div className="flex items-center gap-3 mb-3">
                        <p className="font-black text-lg" style={{ color: M_COLOR }}>{current.label}</p>
          </div>
          <p className="text-sm mb-3" style={{ color: "#111827" }}>{current.desc}</p>
          <div className="rounded-xl p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}>
            <p className="text-xs" style={{ color: "#1E3A8A" }}> {current.warning}</p>
          </div>
        </div>

        <div className="rounded-xl p-3" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
          <p className="text-xs font-bold mb-2" style={{ color: "#2563EB" }}>Chart selection guide</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {[
              ["Compare items", "Bar / Column"],
              ["Show trend over time", "Line / Area"],
              ["Show proportion", "Donut (≤4 slices)"],
              ["Find correlation", "Scatter"],
              ["Show variance", "Waterfall"],
              ["Show progress vs target", "Gauge / KPI"],
            ].map(([q, a]) => (
              <p key={q} className="text-xs" style={{ color: "#111827" }}>
                <span style={{ color: "#6B7280" }}>{q} →</span> <strong>{a}</strong>
              </p>
            ))}
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}
