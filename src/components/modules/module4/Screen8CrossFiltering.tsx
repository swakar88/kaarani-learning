"use client";

import React, { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { ScreenHeader } from "@/components/ui/ScreenSection";

const M_COLOR = "#2563EB";

const ALL_DATA = [
  { dim1: "Alpha", dim2: "Group A", m1: 300 },
  { dim1: "Beta", dim2: "Group A", m1: 200 },
  { dim1: "Gamma", dim2: "Group B", m1: 250 },
  { dim1: "Delta", dim2: "Group B", m1: 197 },
  { dim1: "Epsilon", dim2: "Group A", m1: 180 },
];

export default function Screen8CrossFiltering({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = selected ? ALL_DATA.filter(d => d.dim2 === selected) : ALL_DATA;
  const maxVal = Math.max(...ALL_DATA.map(d => d.m1));

  return (
    <ModuleLayout moduleId={4} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Cross-filtering is Power BI's signature magic. When you click any element in any visual — a bar, a pie slice, a map bubble — all other visuals on the page filter to show only data related to your click. It's the same as applying a slicer, but triggered by clicking a visual."
      kaaraniHint="You can change filter direction: Edit Interactions (Format ribbon). For each pair of visuals, choose Cross-filter, Cross-highlight, or None. Cross-highlight shows the proportion of the total — useful for 'how much of this bar relates to that click'."
      onPrev={onPrev}
      primaryAction={{ label: "Conditional formatting →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={4} label="Module 4 · Screen 8" title="Cross-filtering — click anything, filter everything "
          subtitle="Click a bar below. Watch the second visual respond." moduleColor={M_COLOR} />

        <div className="grid grid-cols-2 gap-4 mb-5">
          {/* Left: pie-style selector (Group) */}
          <div className="rounded-2xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: M_COLOR }}>
              Click a {flavor.dimension2Label}
            </p>
            <div className="flex flex-col gap-2">
              {["Group A", "Group B"].map(g => (
                <button key={g} type="button" onClick={() => setSelected(selected === g ? null : g)}
                  className="p-3 rounded-xl border-2 text-sm font-bold cursor-pointer transition-all"
                  style={{ borderColor: selected === g ? M_COLOR : "#E5E7EB", backgroundColor: selected === g ? M_COLOR : "#FFFFFF", color: selected === g ? "white" : "#3D2B1F" }}>
                  {g}
                </button>
              ))}
              {selected && (
                <button type="button" onClick={() => setSelected(null)}
                  className="text-xs p-2 rounded-lg cursor-pointer" style={{ color: "#6B7280", backgroundColor: "#F3F4F6" }}>
                  Clear ×
                </button>
              )}
            </div>
          </div>

          {/* Right: bar chart that responds */}
          <div className="rounded-2xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#6B7280" }}>
              → {flavor.dimension1Label} chart (filtered)
            </p>
            <div className="flex flex-col gap-2">
              {ALL_DATA.map(d => {
                const isVisible = !selected || d.dim2 === selected;
                return (
                  <div key={d.dim1} className="flex items-center gap-2 transition-all duration-300" style={{ opacity: isVisible ? 1 : 0.2 }}>
                    <span className="text-xs w-16 text-right flex-shrink-0" style={{ color: "#111827" }}>{d.dim1}</span>
                    <div className="flex-1 h-5 rounded-full overflow-hidden" style={{ backgroundColor: "#F3F4F6" }}>
                      <div className="h-full rounded-full transition-all duration-300" style={{ width: `${(d.m1 / maxVal) * 100}%`, backgroundColor: isVisible ? M_COLOR : "#E5E7EB" }} />
                    </div>
                    <span className="text-xs font-bold w-8" style={{ color: isVisible ? M_COLOR : "#8B6650" }}>{d.m1}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-xl p-3 mb-3" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
          <p className="text-xs font-bold mb-1" style={{ color: "#2563EB" }}>Edit Interactions (Format ribbon)</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: "", label: "Cross-filter", desc: "Other visual shows only related rows" },
              { icon: "", label: "Cross-highlight", desc: "Other visual dims non-related bars" },
              { icon: "", label: "None", desc: "This click has no effect on that visual" },
            ].map(opt => (
              <div key={opt.label} className="text-center">
                                <p className="text-[10px] font-bold" style={{ color: "#2563EB" }}>{opt.label}</p>
                <p className="text-[9px]" style={{ color: "#6B7280" }}>{opt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}
