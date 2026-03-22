"use client";

import React, { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorStarSchema } from "@/data/module3";
import { ScreenHeader } from "@/components/ui/ScreenSection";
import { Placeholder } from "@/components/ui/Placeholder";

const M_COLOR = "#2563EB";

export default function Screen2StarSchema({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);
  const schema = getFlavorStarSchema(selectedFlavor);
  const [activeDim, setActiveDim] = useState<string | null>(null);
  const current = schema.dimensions.find(d => d.name === activeDim);

  return (
    <ModuleLayout moduleId={3} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="The star schema is the gold standard for Power BI models. One fat table in the middle — your Fact table — stores all the numbers. Smaller Dimension tables around it store the descriptive context. The fact table links to each dimension via a key column — like player_id or date_key."
      kaaraniHint="Always aim for a star schema. Avoid snowflaking (dimension tables linking to other dimensions). Power BI performs best with a flat star."
      onPrev={onPrev}
      primaryAction={{ label: "Create relationships →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={3} label="Module 3 · Screen 2" title="The Star Schema ⭐"
          subtitle="One fact table in the centre. Dimension tables on the points. Tap each to explore." moduleColor={M_COLOR} />

        {/* Fact table */}
        <div className="rounded-2xl p-5 mb-4" style={{ backgroundColor: "#F9FAFB", border: "2px solid #2563EB" }}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl"></span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: M_COLOR }}>Fact Table (centre of the star)</p>
              <p className="font-black text-lg" style={{ color: "#111827" }}>{schema.factTable}</p>
              <p className="text-xs" style={{ color: "#6B7280" }}>{schema.factDescription}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {schema.factColumns.map(col => (
              <span key={col} className="text-xs font-mono px-2 py-0.5 rounded"
                style={{ backgroundColor: "#FFFFFF", color: "#111827", border: "1px solid #E5E7EB" }}>{col}</span>
            ))}
          </div>
        </div>

        {/* Dimension tables */}
        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#6B7280" }}>Dimension Tables (star points) — tap to explore</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {schema.dimensions.map(dim => (
            <button key={dim.name} type="button" onClick={() => setActiveDim(activeDim === dim.name ? null : dim.name)}
              className="flex items-start gap-3 p-3 rounded-xl border-2 text-left cursor-pointer transition-all"
              style={{ borderColor: activeDim === dim.name ? M_COLOR : "#E5E7EB", backgroundColor: activeDim === dim.name ? "#FFFFFF" : "#FFFFFF" }}>
                            <div>
                <p className="text-xs font-black" style={{ color: activeDim === dim.name ? M_COLOR : "#3D2B1F" }}>{dim.name}</p>
                <p className="text-[10px]" style={{ color: "#6B7280" }}>{dim.role}</p>
              </div>
            </button>
          ))}
        </div>

        {current && (
          <div className="rounded-2xl p-4 mb-4 animate-fade-in-up" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
            <div className="flex items-center gap-2 mb-2">
                            <p className="font-black" style={{ color: M_COLOR }}>{current.name}</p>
            </div>
            <p className="text-xs mb-2" style={{ color: "#6B7280" }}>{current.role}</p>
            <div className="flex flex-wrap gap-1.5">
              {current.columns.map(col => (
                <span key={col} className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{ backgroundColor: "#FFFFFF", color: "#111827", border: "1px solid #E5E7EB" }}>{col}</span>
              ))}
            </div>
          </div>
        )}

        <Placeholder type="diagram" label={`[Diagram: ${flavor.label} star schema — ${schema.factTable} at centre, ${schema.dimensions.length} dimension tables as star points]`} height="120px" />
      </div>
    </ModuleLayout>
  );
}
