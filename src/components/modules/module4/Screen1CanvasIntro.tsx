"use client";

import React from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorChartExample } from "@/data/module4";
import { ScreenHeader } from "@/components/ui/ScreenSection";
import { Placeholder } from "@/components/ui/Placeholder";

const M_COLOR = "#2563EB";

const CANVAS_ZONES = [
  { icon: "", label: "Report Canvas", desc: "Where your visuals live. Drag to arrange, resize freely. Multiple pages in one report." },
  { icon: "", label: "Visualisations Pane", desc: "All chart types — click one to add it to the canvas, then drag fields onto it." },
  { icon: "", label: "Fields Pane", desc: "All your tables and measures. Drag fields onto visuals to define what they show." },
  { icon: "", label: "Filters Pane", desc: "Page-level and report-level filters. Invisible to users in published reports unless you expose them." },
  { icon: "", label: "Format Pane", desc: "Every visual property — colours, fonts, borders, tooltips, titles. This is where reports become beautiful." },
];

export default function Screen1CanvasIntro({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);
  const chartEx = getFlavorChartExample(selectedFlavor);

  return (
    <ModuleLayout moduleId={4} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText={`Welcome to Module 4 — the most visual module! Everything you built in Modules 2 and 3 now shows up as charts. For your ${flavor.label} data, the most powerful starting chart is: ${chartEx.primaryChart}. We'll build it together, plus every other chart type Power BI offers.`}
      kaaraniHint="Power BI has 30+ built-in visuals plus hundreds more from AppSource. For 90% of reports, you'll use only 6: bar, column, line, card, slicer, and table."
      onPrev={onPrev}
      primaryAction={{ label: "Bar & Column charts →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={4} label="Module 4 · Visualise & Analyse" title="The Power BI canvas "
          subtitle="Five zones, one report. Let's learn each one." moduleColor={M_COLOR} />

        <div className="flex flex-col gap-3 mb-5">
          {CANVAS_ZONES.map(z => (
            <div key={z.label} className="flex items-start gap-4 p-4 rounded-2xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
                            <div>
                <p className="font-bold text-sm mb-0.5" style={{ color: "#111827" }}>{z.label}</p>
                <p className="text-xs leading-snug" style={{ color: "#6B7280" }}>{z.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl p-3 mb-4" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
          <p className="text-xs font-bold mb-1" style={{ color: M_COLOR }}>Our best starting chart for {flavor.label}</p>
          <p className="text-sm font-semibold" style={{ color: "#111827" }}>{chartEx.primaryChart}</p>
          <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{chartEx.primaryWhy}</p>
        </div>

        <Placeholder type="image" label="[Power BI Screenshot: Report canvas with Visualisations, Fields, and Format panes labelled]" height="120px" />
      </div>
    </ModuleLayout>
  );
}
