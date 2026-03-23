"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorChartExample } from "@/data/module4";
import { ScreenHeader, PowerBICallout } from "@/components/ui/ScreenSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

// Simple bar chart component
function BarChart({ data, horizontal, color }: { data: { label: string; value: number }[], horizontal: boolean, color: string }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className={`flex ${horizontal ? "flex-col" : "items-end justify-around"} gap-2`}>
      {data.map(d => (
        <div key={d.label} className={`flex ${horizontal ? "items-center gap-2" : "flex-col items-center gap-1"}`}>
          {horizontal && <span className="text-xs w-20 text-right flex-shrink-0" style={{ color: "#111827" }}>{d.label}</span>}
          <div className={horizontal ? "flex-1" : "flex flex-col items-center"} style={horizontal ? {} : { width: "100%" }}>
            <div
              className="rounded transition-all duration-500"
              style={horizontal
                ? { height: "22px", width: `${(d.value / max) * 100}%`, backgroundColor: color }
                : { width: "100%", height: `${(d.value / max) * 80}px`, backgroundColor: color }
              }
            />
          </div>
          {horizontal && <span className="text-xs font-bold" style={{ color }}>{d.value}</span>}
          {!horizontal && <span className="text-[10px]" style={{ color: "#6B7280" }}>{d.label}</span>}
        </div>
      ))}
    </div>
  );
}

const CHART_VARIANTS = [
  { id: "clustered-bar", label: "Clustered Bar", icon: "", desc: "Best for comparing many items. Horizontal bars are easier to read when labels are long.", horizontal: true },
  { id: "clustered-column", label: "Clustered Column", icon: "", desc: "Best for comparing fewer items or showing trends with categorical x-axis.", horizontal: false },
  { id: "stacked-bar", label: "Stacked Bar", icon: "", desc: "Shows both total AND composition. Use when parts-of-whole matter.", horizontal: true },
  { id: "100pct", label: "100% Stacked", icon: "", desc: "Shows composition as proportion (%). Total is always 100 — only relative sizes matter.", horizontal: true },
];

export default function Screen2BarColumnCharts({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const chartEx = getFlavorChartExample(selectedFlavor);
  const [active, setActive] = useState("clustered-bar");
  const current = CHART_VARIANTS.find(v => v.id === active)!;

  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const sampleData = [
    { label: flavor.dimension1Label === "Player" ? "Player A" : "Item A", value: 847 },
    { label: flavor.dimension1Label === "Player" ? "Player B" : "Item B", value: 632 },
    { label: flavor.dimension1Label === "Player" ? "Player C" : "Item C", value: 591 },
    { label: flavor.dimension1Label === "Player" ? "Player D" : "Item D", value: 445 },
    { label: flavor.dimension1Label === "Player" ? "Player E" : "Item E", value: 380 },
  ];

  const narrationScript = [
    "Bar and column charts are the workhorses of data visualisation. They answer 'which is biggest?' better than any other chart.",
    "Use a horizontal bar when you have many categories or long labels. Use a column when you're plotting over time or have fewer than 8 categories.",
    `Here's how to build it in Power BI for your ${flavor.label} data — drag ${flavor.dimension1Label} to the axis and Total ${flavor.metric1Label} to the value field.`,
    "Remember: limit bar and column charts to 8 to 10 items max. More than that and the eye struggles — use a Table visual for long lists instead.",
  ];

  return (
    <ModuleLayout moduleId={4} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Bar and column charts are the workhorses of data visualisation. They answer 'which is biggest?' better than any other chart. Use a horizontal bar when you have many categories or long labels. Use a column when you're plotting over time or have fewer than 8 categories."
      kaaraniHint="Limit bar/column charts to 8–10 items max. More than that and the eye struggles. Use a Table visual for long lists."
      onPrev={onPrev}
      primaryAction={isComplete
        ? { label: "Line & area charts →", onClick: onNext }
        : { label: "Line & area charts →", onClick: onNext, disabled: true }}
    >
      <div className="max-w-2xl mx-auto">
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={4} label="Module 4 · Screen 2" title="Bar & Column charts "
            subtitle="The most used chart in Power BI. Four variants — know when to use each." moduleColor={M_COLOR} />
        </div>

        <div className={`${blockClass(1)} mb-4`}>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {CHART_VARIANTS.map(v => (
              <button key={v.id} type="button" onClick={() => setActive(v.id)}
                className="p-2 rounded-xl border-2 text-center cursor-pointer transition-all"
                style={{ borderColor: active === v.id ? M_COLOR : "#E5E7EB", backgroundColor: active === v.id ? M_COLOR + "12" : "#FFFFFF" }}>
                <p className="text-[10px] font-bold leading-tight" style={{ color: active === v.id ? M_COLOR : "#3D2B1F" }}>{v.label}</p>
              </button>
            ))}
          </div>
          <div className="rounded-2xl p-5 animate-fade-in-up" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: M_COLOR }}>{flavor.label} example: Total {flavor.metric1Label} by {flavor.dimension1Label}</p>
            <p className="text-xs mb-4" style={{ color: "#6B7280" }}>{current.desc}</p>
            <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}>
              <BarChart data={sampleData} horizontal={current.horizontal} color={M_COLOR} />
            </div>
          </div>
        </div>

        <div className={`${blockClass(2)} rounded-xl p-3 mb-3`} style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}>
          <p className="text-xs font-bold mb-1" style={{ color: M_COLOR }}>Build it in Power BI:</p>
          <ol className="flex flex-col gap-1">
            {["Click the Bar/Column chart icon in Visualisations pane", `Drag '${flavor.dimension1Label}' to the Axis/Y-axis field`, `Drag 'Total ${flavor.metric1Label}' to the Value field`, "Sort by value: click '...' → Sort descending"].map((s, i) => (
              <li key={i} className="flex gap-2 text-xs" style={{ color: "#111827" }}>
                <span style={{ color: M_COLOR }}>▸</span> {s}
              </li>
            ))}
          </ol>
        </div>

        <div className={`${blockClass(3)} mb-4`}>
          <PowerBICallout title="When to use each variant"
            items={["Clustered bar: many items, long labels", "Clustered column: time or few items", "Stacked: show total + parts", "100% stacked: show % composition only"]} />
        </div>

        {!isComplete && (
          <button type="button"
            onClick={() => { unlockVoice(); if (narrationScript[step + 1]) speak(narrationScript[step + 1]); next(); }}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-colors"
            style={{ backgroundColor: "#EFF6FF", color: "#2563EB", border: "1.5px dashed #93C5FD" }}
          >
            {tapLabel} →
          </button>
        )}
      </div>
    </ModuleLayout>
  );
}
