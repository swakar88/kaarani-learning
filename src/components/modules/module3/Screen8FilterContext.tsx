"use client";

import React, { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { ScreenHeader } from "@/components/ui/ScreenSection";

const M_COLOR = "#2563EB";

export default function Screen8FilterContext({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);

  const [slicerTeam, setSlicerTeam] = useState<string | null>(null);
  const [slicerYear, setSlicerYear] = useState<string | null>(null);

  const TEAMS = [flavor.dimension2Label === "Team" ? "Mumbai Indians" : "Category A", "Category B", "Category C"];
  const YEARS = ["2021", "2022", "2023"];

  const base = 847;
  const value = base
    - (slicerTeam ? 200 : 0)
    - (slicerYear === "2021" ? 300 : slicerYear === "2022" ? 150 : 0);

  return (
    <ModuleLayout moduleId={3} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Filter context is the set of filters active at the moment a measure is evaluated. Every visual, slicer, and filter adds to the context. When you click a bar in a chart, that adds a filter context. Your DAX measures re-evaluate instantly for every new context."
      kaaraniHint="There are two types of context: Filter Context (what rows are in scope) and Row Context (the current row in an iterator function like SUMX). Mastering both is the key to advanced DAX."
      onPrev={onPrev}
      primaryAction={{ label: "Time Intelligence →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={3} label="Module 3 · Screen 8" title="Filter context — live demo "
          subtitle="Watch your measure change as you apply filters below." moduleColor={M_COLOR} />

        {/* Interactive context demo */}
        <div className="rounded-3xl p-6 mb-5" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: M_COLOR }}>
            Simulated report filters
          </p>

          {/* Slicer 1 */}
          <div className="mb-4">
            <p className="text-xs font-semibold mb-2" style={{ color: "#111827" }}>
              {flavor.dimension2Label} slicer:
            </p>
            <div className="flex gap-2">
              <button onClick={() => setSlicerTeam(null)} className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all"
                style={{ backgroundColor: !slicerTeam ? M_COLOR : "#E5E7EB", color: !slicerTeam ? "white" : "#3D2B1F" }}>All</button>
              {TEAMS.map(t => (
                <button key={t} onClick={() => setSlicerTeam(t === slicerTeam ? null : t)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all"
                  style={{ backgroundColor: slicerTeam === t ? M_COLOR : "#E5E7EB", color: slicerTeam === t ? "white" : "#3D2B1F" }}>{t}</button>
              ))}
            </div>
          </div>

          {/* Slicer 2 */}
          <div className="mb-5">
            <p className="text-xs font-semibold mb-2" style={{ color: "#111827" }}>Year slicer:</p>
            <div className="flex gap-2">
              <button onClick={() => setSlicerYear(null)} className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all"
                style={{ backgroundColor: !slicerYear ? M_COLOR : "#E5E7EB", color: !slicerYear ? "white" : "#3D2B1F" }}>All</button>
              {YEARS.map(y => (
                <button key={y} onClick={() => setSlicerYear(y === slicerYear ? null : y)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all"
                  style={{ backgroundColor: slicerYear === y ? M_COLOR : "#E5E7EB", color: slicerYear === y ? "white" : "#3D2B1F" }}>{y}</button>
              ))}
            </div>
          </div>

          {/* KPI card that updates */}
          <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#6B7280" }}>Total {flavor.metric1Label}</p>
            <p className="text-4xl font-black transition-all" style={{ color: M_COLOR }}>{value.toLocaleString()}</p>
            <p className="text-xs mt-2" style={{ color: "#6B7280" }}>
              Filter context: {[!slicerTeam && "All teams", !slicerYear && "All years", slicerTeam, slicerYear].filter(Boolean).join(" + ")}
            </p>
          </div>
        </div>

        <div className="rounded-xl p-3" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
          <p className="text-xs" style={{ color: "#6B7280" }}>
            <strong style={{ color: "#2563EB" }}>Key insight:</strong> The DAX measure <code>Total {flavor.metric1Label} = SUM(...)</code> is written once. Power BI evaluates it in the filter context of each visual and each user interaction automatically.
          </p>
        </div>
      </div>
    </ModuleLayout>
  );
}
