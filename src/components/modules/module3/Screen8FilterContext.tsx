"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { ScreenHeader } from "@/components/ui/ScreenSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

export default function Screen8FilterContext({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);

  const [slicerTeam, setSlicerTeam] = useState<string | null>(null);
  const [slicerYear, setSlicerYear] = useState<string | null>(null);

  const TEAMS = [flavor.dimension2Label === "Team" ? "Mumbai Indians" : "Category A", "Category B", "Category C"];
  const YEARS = ["2021", "2022", "2023"];

  const base = 847;
  const value = base
    - (slicerTeam ? 200 : 0)
    - (slicerYear === "2021" ? 300 : slicerYear === "2022" ? 150 : 0);

  // 4 blocks: header(0), concept explanation(1), interactive demo(2), key insight(3)
  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    `Filter context is the most important concept to grasp in DAX. Everything in Power BI flows from it.`,
    `Here's what filter context means. At any moment in a Power BI report, there's a set of active filters — the slicers you've selected, the page-level filters, the visual-level filters, and any cross-filtering from other visuals. Every DAX measure is evaluated against this exact set of filters. Change the filters, change the result.`,
    `Let me show you this live. Use these simulated slicers and watch the Total ${flavor.metric1Label} measure recalculate in real time. This is exactly what happens in a real Power BI report when your users interact with visuals.`,
    `There are actually two types of context in DAX. Filter context — the rows in scope based on active filters — is what we just saw. Row context is different: it's used inside iterator functions like SUMX, where DAX processes row by row. Mastering both unlocks advanced DAX patterns.`,
  ];

  return (
    <ModuleLayout moduleId={3} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Filter context is the set of filters active at the moment a measure is evaluated. Every visual, slicer, and filter adds to the context. When you click a bar in a chart, that adds a filter context. Your DAX measures re-evaluate instantly for every new context."
      kaaraniHint="There are two types of context: Filter Context (what rows are in scope) and Row Context (the current row in an iterator function like SUMX). Mastering both is the key to advanced DAX."
      onPrev={onPrev}
      primaryAction={{ label: "Time Intelligence →", onClick: onNext, disabled: !isComplete }}
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — header */}
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={3} label="Module 3 · Screen 8" title="Filter context — live demo "
            subtitle="Watch your measure change as you apply filters below." moduleColor={M_COLOR} />
        </div>

        {/* Block 1 — Concept explanation */}
        <div className={`${blockClass(1)} mb-5`}>
          <div className="rounded-2xl p-4 mb-5" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
            <p className="text-xs font-bold mb-2" style={{ color: M_COLOR }}>What is filter context?</p>
            <p className="text-xs leading-relaxed" style={{ color: "#111827" }}>
              Filter context is the set of filters active when a DAX measure is evaluated. Every slicer, every page filter, every cross-filter from a visual click — they all combine into the filter context. Your measures recalculate instantly for every new context.
            </p>
          </div>
        </div>

        {/* Block 2 — Interactive context demo */}
        <div className={`${blockClass(2)} mb-5`}>
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
        </div>

        {/* Block 3 — Key insight */}
        <div className={`${blockClass(3)} mb-4`}>
          <div className="rounded-xl p-3" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
            <p className="text-xs" style={{ color: "#6B7280" }}>
              <strong style={{ color: "#2563EB" }}>Key insight:</strong> The DAX measure <code>Total {flavor.metric1Label} = SUM(...)</code> is written once. Power BI evaluates it in the filter context of each visual and each user interaction automatically.
            </p>
          </div>
        </div>

        {/* Tap to reveal */}
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
