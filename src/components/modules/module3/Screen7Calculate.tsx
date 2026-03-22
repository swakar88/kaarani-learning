"use client";

import React, { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { ScreenHeader, CodeBlock } from "@/components/ui/ScreenSection";

const M_COLOR = "#2563EB";

export default function Screen7Calculate({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);
  const [step, setStep] = useState(0);

  const CALCULATE_STEPS = [
    { label: "Start with a base measure", code: `Total ${flavor.metric1Label} = SUM(fact_[${flavor.metric1Label}])`, desc: "This gives us the total for whatever is currently selected in the report." },
    { label: "Add CALCULATE to override context", code: `${flavor.metric1Label} (Home Only) = \nCALCULATE(\n    SUM(fact_[${flavor.metric1Label}]),\n    dim_Match[venue_type] = "Home"\n)`, desc: "CALCULATE changes the filter context. Now this measure ALWAYS filters to Home matches, regardless of what the report slicer says." },
    { label: "CALCULATE with ALL() to remove filters", code: `${flavor.metric1Label} All Time = \nCALCULATE(\n    SUM(fact_[${flavor.metric1Label}]),\n    ALL(dim_Date)\n)`, desc: "ALL() removes the filter from dim_Date. Useful for calculating % of total — the denominator should always be the full dataset." },
    { label: "% of Total — combining both", code: `${flavor.metric1Label} % of Total = \nDIVIDE(\n    [Total ${flavor.metric1Label}],\n    CALCULATE([Total ${flavor.metric1Label}], ALL())\n)`, desc: "The numerator respects the report filter. The denominator uses ALL() to always show the grand total. Result: percentage contribution." },
  ];

  return (
    <ModuleLayout moduleId={3} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="CALCULATE is the most powerful function in DAX. It lets you change, add, or remove the filter context inside a measure. Once you understand CALCULATE, you can answer almost any business question in Power BI."
      kaaraniHint="Think of CALCULATE as: 'Calculate this expression, BUT change the filter context to [these conditions].' The BUT is the key — it overrides the existing filter context."
      onPrev={onPrev}
      primaryAction={{ label: "Filter context →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={3} label="Module 3 · Screen 7" title="CALCULATE — the most powerful function "
          subtitle="Modify filter context to answer any question." moduleColor={M_COLOR} />

        {/* Syntax */}
        <div className="rounded-2xl p-4 mb-5" style={{ backgroundColor: "#1E1B2E", border: "1.5px solid #E8E8E8" }}>
          <p className="text-xs font-bold mb-2" style={{ color: M_COLOR }}>CALCULATE syntax</p>
          <pre className="font-mono text-sm" style={{ color: "#E2E8F0" }}>
            {`CALCULATE(\n    <expression>,        // What to calculate\n    <filter1>,           // Override: add or change a filter\n    <filter2>, ...       // Multiple filters = AND logic\n)`}
          </pre>
        </div>

        {/* Step-through builder */}
        <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#6B7280" }}>
          Building up from simple to powerful — tap to reveal each step
        </p>
        <div className="flex flex-col gap-3 mb-4">
          {CALCULATE_STEPS.map((s, i) => {
            const revealed = i <= step;
            return (
              <button key={i} type="button" onClick={() => setStep(Math.max(step, i + 1))}
                disabled={!revealed}
                className="flex flex-col gap-2 p-4 rounded-2xl border-2 text-left cursor-pointer transition-all disabled:cursor-default"
                style={{ borderColor: revealed ? M_COLOR : "#E5E7EB", backgroundColor: revealed ? M_COLOR + "0C" : "#F9F9F7", opacity: revealed ? 1 : 0.5 }}>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ backgroundColor: revealed ? M_COLOR : "#E5E7EB" }}>{i + 1}</span>
                  <p className="font-bold text-sm" style={{ color: revealed ? M_COLOR : "#8B6650" }}>{s.label}</p>
                </div>
                {revealed && (
                  <>
                    <CodeBlock code={s.code} color={M_COLOR} />
                    <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>{s.desc}</p>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </ModuleLayout>
  );
}
