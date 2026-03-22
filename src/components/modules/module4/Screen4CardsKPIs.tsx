"use client";

import React from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorChartExample } from "@/data/module4";
import { ScreenHeader, PowerBICallout } from "@/components/ui/ScreenSection";

const M_COLOR = "#2563EB";

export default function Screen4CardsKPIs({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);
  const chartEx = getFlavorChartExample(selectedFlavor);

  return (
    <ModuleLayout moduleId={4} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Cards and KPI visuals are the first things executives read. They give an at-a-glance number — no axes, no comparison, just the metric. KPI visuals add a target and a trend indicator. Every dashboard should open with 3–5 cards summarising the key metrics."
      kaaraniHint="Use the New Card visual (not the old Card) — it supports multiple measures per card, conditional formatting, and reference labels. Much more flexible."
      onPrev={onPrev}
      primaryAction={{ label: "Tables & matrices →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={4} label="Module 4 · Screen 4" title="Cards & KPI visuals "
          subtitle="The first thing every executive reads. Headline numbers at a glance." moduleColor={M_COLOR} />

        {/* Live KPI demo */}
        <div className="rounded-2xl p-5 mb-5" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: M_COLOR }}>
            {flavor.label} KPI cards — example dashboard header
          </p>
          <div className="grid grid-cols-3 gap-3">
            {chartEx.kpiCards.map(kpi => (
              <div key={kpi.label} className="rounded-2xl p-4 text-center" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
                <p className="text-2xl font-black" style={{ color: M_COLOR }}>—</p>
                <p className="text-xs font-bold mt-1" style={{ color: "#111827" }}>{kpi.label}</p>
                <p className="text-[10px] mt-0.5 font-mono" style={{ color: "#6B7280" }}>{kpi.measure}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Card types */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Card", icon: "", desc: "Single number. Big, bold, impossible to miss.", badge: "Most used" },
            { label: "KPI", icon: "", desc: "Actual vs Target with trend arrow (↑↓). Needs a target measure.", badge: "Exec favourite" },
            { label: "Multi-row Card", icon: "", desc: "Shows multiple measures in one compact card. Good for detail summaries.", badge: "Useful" },
          ].map(c => (
            <div key={c.label} className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
                            <div className="flex items-center gap-2 mt-2 mb-1">
                <p className="font-bold text-sm" style={{ color: "#111827" }}>{c.label}</p>
                <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: "#FFFFFF", color: M_COLOR }}>{c.badge}</span>
              </div>
              <p className="text-xs leading-snug" style={{ color: "#6B7280" }}>{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-4 mb-4" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
          <p className="text-xs font-bold mb-2" style={{ color: "#2563EB" }}> Card design best practices</p>
          <div className="flex flex-col gap-1">
            {["Keep it to one number per card", "Add a subtitle or label (what this number means)", "Use conditional formatting to colour the background based on status", "Place cards at the very top of your dashboard page"].map(tip => (
              <p key={tip} className="text-xs" style={{ color: "#111827" }}>• {tip}</p>
            ))}
          </div>
        </div>

        <PowerBICallout items={["New Card visual (latest)", "KPI visual (needs Target measure)", "Multi-row Card for multiple values", "Conditional formatting on background color"]} />
      </div>
    </ModuleLayout>
  );
}
