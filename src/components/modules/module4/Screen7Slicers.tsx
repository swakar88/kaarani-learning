"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorChartExample } from "@/data/module4";
import { ScreenHeader } from "@/components/ui/ScreenSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

export default function Screen7Slicers({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const chartEx = getFlavorChartExample(selectedFlavor);
  const [activeSlicer, setActiveSlicer] = useState<string[]>([]);
  const slicerOptions = chartEx.bestSlicers.slice(0, 4);

  const toggle = (s: string) => setActiveSlicer(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const SLICER_STYLES = [
    { style: "List", icon: "", desc: "Vertical list of values. Good for few options." },
    { style: "Dropdown", icon: "▼", desc: "Compact. Best when values are many or space is limited." },
    { style: "Tile", icon: "⬜", desc: "Buttons the user clicks. Visually prominent." },
    { style: "Between (date)", icon: "", desc: "Date range slider. Perfect for date fields." },
    { style: "Slider", icon: "↔", desc: "Numeric range. Filter by min/max value." },
  ];

  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    "Slicers are the interactive controls that let report users filter the data themselves. Every visual on the page responds to every slicer.",
    `Try tapping the recommended slicers for ${flavor.label} reports — notice how the filter context description updates. That's exactly how it works in Power BI.`,
    "Five slicer styles to choose from: List, Dropdown, Tile buttons, Date range, and Slider. Each is better for a different type of data and use case.",
    "Key difference: Slicers are for report users — visible on canvas. Filters pane is for report designers — can be hidden. Use sync slicers across pages for shared Year or Region filters.",
  ];

  return (
    <ModuleLayout moduleId={4} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Slicers are the interactive controls that let report users filter the data themselves. Every visual on the page responds to every slicer. It's the same as cross-filtering, but explicitly designed for user control. Design your slicers thoughtfully — they define the user experience."
      kaaraniHint="Use sync slicers to have a slicer affect multiple report pages. Format pane → Sync Slicers. Very useful for a shared Year or Region filter across a report."
      onPrev={onPrev}
      primaryAction={isComplete
        ? { label: "Cross-filtering →", onClick: onNext }
        : { label: "Cross-filtering →", onClick: onNext, disabled: true }}
    >
      <div className="max-w-2xl mx-auto">
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={4} label="Module 4 · Screen 7" title="Slicers & Filters "
            subtitle="Put the user in control. Every visual responds to every slicer." moduleColor={M_COLOR} />
        </div>

        {/* Interactive slicer demo */}
        <div className={`${blockClass(1)} rounded-3xl p-5 mb-5`} style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: M_COLOR }}>
            Recommended slicers for {flavor.label} reports
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {slicerOptions.map(s => (
              <button key={s} type="button" onClick={() => toggle(s)}
                className="px-3 py-2 rounded-xl border-2 text-xs font-semibold cursor-pointer transition-all"
                style={{ borderColor: activeSlicer.includes(s) ? M_COLOR : "#E5E7EB", backgroundColor: activeSlicer.includes(s) ? M_COLOR : "#FFFFFF", color: activeSlicer.includes(s) ? "white" : "#3D2B1F" }}>
                {s}
              </button>
            ))}
          </div>
          <div className="rounded-xl p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}>
            <p className="text-xs font-semibold" style={{ color: "#111827" }}>
              {activeSlicer.length === 0
                ? "No filters selected — all data showing"
                : `Filtering by: ${activeSlicer.join(" + ")} — ${flavor.metric1Label} recalculates for this context`}
            </p>
          </div>
        </div>

        {/* Slicer styles */}
        <div className={`${blockClass(2)} grid grid-cols-5 gap-2 mb-4`}>
          {SLICER_STYLES.map(s => (
            <div key={s.style} className="rounded-xl p-2 text-center" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
              <p className="text-[10px] font-bold mt-1" style={{ color: "#111827" }}>{s.style}</p>
              <p className="text-[9px] mt-0.5 leading-tight" style={{ color: "#6B7280" }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Filters vs Slicers */}
        <div className={`${blockClass(3)} grid grid-cols-2 gap-3`}>
          {[
            { type: "Slicer visual", icon: "", forWho: "Report users", visible: "Yes — on canvas", sticky: "Until changed by user" },
            { type: "Filters pane", icon: "", forWho: "Report designers", visible: "Optional — can hide", sticky: "Applies always (unless cleared)" },
          ].map(f => (
            <div key={f.type} className="rounded-xl p-3" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-xs font-bold" style={{ color: "#2563EB" }}>{f.type}</p>
              </div>
              {[["For", f.forWho], ["Visible", f.visible], ["Stickiness", f.sticky]].map(([k, v]) => (
                <p key={k} className="text-[10px]" style={{ color: "#6B7280" }}><strong style={{ color: "#111827" }}>{k}:</strong> {v}</p>
              ))}
            </div>
          ))}
        </div>

        {!isComplete && (
          <button type="button"
            onClick={() => { unlockVoice(); if (narrationScript[step + 1]) speak(narrationScript[step + 1]); next(); }}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-colors mt-4"
            style={{ backgroundColor: "#EFF6FF", color: "#2563EB", border: "1.5px dashed #93C5FD" }}
          >
            {tapLabel} →
          </button>
        )}
      </div>
    </ModuleLayout>
  );
}
