"use client";

import React from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorChartExample } from "@/data/module4";
import { ScreenHeader } from "@/components/ui/ScreenSection";

const M_COLOR = "#2563EB";

const CF_TYPES = [
  { type: "Background colour", icon: "", desc: "Red/amber/green cells. Instant status indicator. Based on rules or gradient scale.", example: "Avg Rating: green ≥ 4.5, amber 3.5–4.4, red < 3.5" },
  { type: "Font colour", icon: "", desc: "Change text colour based on value. Subtle but effective.", example: "Positive values = green text, negative = red" },
  { type: "Data bars", icon: "", desc: "Mini bar chart inside the cell. Shows relative magnitude alongside the number.", example: "Revenue column with data bars behind the number" },
  { type: "Icon sets", icon: "", desc: "Arrows, circles, stars, traffic lights. Each icon represents a tier.", example: "⬆  ⬇ for trend vs last period" },
  { type: "Colour scale", icon: "", desc: "Gradient from low to high. Best for continuous metrics like temperature or score.", example: "Heatmap: white (low) → dark orange (high)" },
];

export default function Screen9ConditionalFormatting({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);
  const chartEx = getFlavorChartExample(selectedFlavor);

  const DEMO_DATA = [
    { label: "Alpha", value: 94, status: "high" },
    { label: "Beta", value: 72, status: "mid" },
    { label: "Gamma", value: 58, status: "mid" },
    { label: "Delta", value: 31, status: "low" },
    { label: "Epsilon", value: 12, status: "low" },
  ];

  return (
    <ModuleLayout moduleId={4} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Conditional formatting turns numbers into visual signals. Instead of reading 47 values looking for problems, a red cell jumps out immediately. It's one of the highest-impact features in Power BI for making reports actionable rather than just informational."
      kaaraniHint="Use conditional formatting sparingly. If every cell is coloured, the signal disappears. Reserve red for things that genuinely need attention — not just 'below average'."
      onPrev={onPrev}
      primaryAction={{ label: "Bookmarks & buttons →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={4} label="Module 4 · Screen 9" title="Conditional formatting "
          subtitle="Turn numbers into visual signals. Red jumps out. Green means safe." moduleColor={M_COLOR} />

        {/* Live CF demo */}
        <div className="rounded-2xl overflow-hidden mb-5" style={{ border: "1.5px solid #E8E8E8" }}>
          <div className="px-4 py-2" style={{ backgroundColor: "#FFFFFF"}}>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: M_COLOR }}>
              {flavor.label} — all CF types applied
            </p>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ backgroundColor: "#F9FAFB" }}>
                {[flavor.dimension1Label, `${flavor.metric1Label} (data bar)`, "Status (icon)", "Score (colour scale)"].map(h => (
                  <th key={h} className="px-3 py-2 text-left font-bold" style={{ color: "#6B7280", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DEMO_DATA.map(r => {
                const bgColor = r.status === "high" ? "#F9FAFB" : r.status === "mid" ? "#F9FAFB" : "#FEF2F2";
                const textColor = r.status === "high" ? "#111827" : r.status === "mid" ? "#1E3A8A" : "#B91C1C";
                const icon = r.status === "high" ? "⬆" : r.status === "mid" ? "" : "⬇";
                const scale = `hsl(${r.value * 0.8}, 70%, ${95 - r.value * 0.3}%)`;
                return (
                  <tr key={r.label} style={{ borderBottom: "1px solid #F3F4F6" }}>
                    <td className="px-3 py-2 font-semibold" style={{ color: "#111827" }}>{r.label}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold" style={{ color: "#111827" }}>{r.value}</span>
                        <div className="h-3 flex-1 rounded-sm" style={{ backgroundColor: "#E5E7EB" }}>
                          <div className="h-full rounded-sm" style={{ width: `${r.value}%`, backgroundColor: M_COLOR }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-center">{icon}</td>
                    <td className="px-3 py-2">
                      <span className="px-3 py-1 rounded font-bold text-xs" style={{ backgroundColor: bgColor, color: textColor }}>
                        {r.value}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* CF types */}
        <div className="flex flex-col gap-2 mb-4">
          {CF_TYPES.map(cf => (
            <div key={cf.type} className="flex items-start gap-3 p-3 rounded-xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
                            <div>
                <p className="font-bold text-xs" style={{ color: "#111827" }}>{cf.type}</p>
                <p className="text-[10px] mb-1" style={{ color: "#6B7280" }}>{cf.desc}</p>
                <p className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ backgroundColor: "#FFFFFF", color: M_COLOR }}>{cf.example}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl p-3" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
          <p className="text-xs font-bold mb-1" style={{ color: "#2563EB" }}>{flavor.label} CF idea</p>
          <p className="text-xs" style={{ color: "#111827" }}>{chartEx.conditionalFormattingIdea}</p>
        </div>
      </div>
    </ModuleLayout>
  );
}
