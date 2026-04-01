"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { ScreenHeader, CodeBlock } from "@/components/ui/ScreenSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

export default function Screen5MeasuresVsColumns({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const [tab, setTab] = useState<"measure" | "column">("measure");

  // 4 blocks: header(0), tab switcher + content(1), content area(2), rule of thumb(3)
  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    `This is one of the most important distinctions in all of DAX — Measures versus Calculated Columns.`,
    `A Measure lives in the Fields pane, not in a table column. It calculates on demand, in response to filter context. Every time you click a slicer, every visual using that measure recalculates. This is what makes Power BI reports dynamic.`,
    `A Calculated Column is different. It adds a new column to your table — computed row by row when the data loads. It knows only about the current row, not the report's filter context. Use it for labelling and categorising, not for aggregations.`,
    `Here's the simple rule: if you're aggregating numbers — SUM, COUNT, AVERAGE — use a Measure. If you're categorising or labelling rows — like a Year column, a Tier bucket, a flag — use a Calculated Column. Default to Measures.`,
  ];

  return (
    <ModuleLayout moduleId={3} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="This is one of the most important distinctions in DAX. A Calculated Column adds a new column to your table — it's computed row by row and stored. A Measure is computed on the fly, in response to filter context. Measures are what make Power BI reports dynamic."
      kaaraniHint="Default to Measures. Use Calculated Columns only when you need a value for filtering, grouping, or slicing — like a 'Season Year' column derived from a date."
      onPrev={onPrev}
      primaryAction={{ label: "Basic DAX functions →", onClick: onNext, disabled: !isComplete }}
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — header */}
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={3} label="Module 3 · Screen 5" title="Measures vs Calculated Columns "
            subtitle="The single most important distinction in DAX." moduleColor={M_COLOR} />
        </div>

        {/* Block 1 — Tab switcher */}
        <div className={`${blockClass(1)} mb-4`}>
          <div className="flex gap-3 mb-5">
            {[
              { id: "measure" as const, label: " Measure", tagline: "Dynamic, context-aware" },
              { id: "column" as const, label: " Calculated Column", tagline: "Row-level, stored in table" },
            ].map(t => (
              <button key={t.id} type="button" onClick={() => setTab(t.id)}
                className="flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl border-2 cursor-pointer transition-all"
                style={{ borderColor: tab === t.id ? M_COLOR : "#E5E7EB", backgroundColor: tab === t.id ? M_COLOR + "0C" : "#FFFFFF" }}>
                <p className="font-black text-sm" style={{ color: tab === t.id ? M_COLOR : "#3D2B1F" }}>{t.label}</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>{t.tagline}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Block 2 — Content area (both tabs visible, tab toggle controls which is shown) */}
        <div className={`${blockClass(2)} mb-4`}>
          {tab === "measure" && (
            <div className="flex flex-col gap-4 animate-fade-in-up">
              <div className="rounded-2xl p-5" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: "Where it lives", value: "In the Fields pane (not a column in the table)" },
                    { label: "When calculated", value: "On demand — when used in a visual" },
                    { label: "What it knows", value: "The current filter context (slicers, page filters)" },
                    { label: "Storage", value: "Formula only — no data stored" },
                  ].map(r => (
                    <div key={r.label} className="rounded-xl p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}>
                      <p className="text-xs font-bold mb-0.5" style={{ color: M_COLOR }}>{r.label}</p>
                      <p className="text-xs" style={{ color: "#111827" }}>{r.value}</p>
                    </div>
                  ))}
                </div>
                <CodeBlock code={`// Measure — responds to all report filters\nTotal ${flavor.metric1Label} = SUM(fact_[${flavor.metric1Label}])\n\n// Same measure shows different values for:\n// - All time: 847\n// - 2023 season only: 300\n// - New York Yankees only: 412`} label={`$Measure Example`} color={M_COLOR} />
              </div>
            </div>
          )}

          {tab === "column" && (
            <div className="flex flex-col gap-4 animate-fade-in-up">
              <div className="rounded-2xl p-5" style={{ backgroundColor: "#2563EB" + "0C", border: "2px solid #E8E8E8" }}>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: "Where it lives", value: "Adds a new column to the table — visible in Data view" },
                    { label: "When calculated", value: "Once, when data loads or refreshes" },
                    { label: "What it knows", value: "Only the current row's values" },
                    { label: "Storage", value: "Computed result stored in VertiPaq engine" },
                  ].map(r => (
                    <div key={r.label} className="rounded-xl p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}>
                      <p className="text-xs font-bold mb-0.5" style={{ color: "#2563EB" }}>{r.label}</p>
                      <p className="text-xs" style={{ color: "#111827" }}>{r.value}</p>
                    </div>
                  ))}
                </div>
                <CodeBlock code={`// Calculated Column — row-by-row calculation\nSeason Year = YEAR(dim_Date[date])\n// Adds '2023' to every row in the Date table\n// Useful for: grouping, slicers, category buckets`} label={`$Calculated Column Example`} color="#2563EB" />
              </div>
            </div>
          )}
        </div>

        {/* Block 3 — Rule of thumb */}
        <div className={`${blockClass(3)} mb-4`}>
          <div className="rounded-xl p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}>
            <p className="text-xs font-bold mb-1" style={{ color: "#2563EB" }}>Quick rule of thumb:</p>
            <p className="text-xs" style={{ color: "#111827" }}>
              Aggregating numbers (SUM, COUNT, AVERAGE) → <strong>Measure</strong><br />
              Categorising or labelling rows (Year, Tier, Flag) → <strong>Calculated Column</strong>
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
