"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorStarSchema } from "@/data/module3";
import { ScreenHeader, CodeBlock } from "@/components/ui/ScreenSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

export default function Screen6BasicDAX({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const schema = getFlavorStarSchema(selectedFlavor);
  const [active, setActive] = useState(0);
  const measures = schema.measures.slice(0, 4);

  // 4 blocks: header(0), core functions(1), flavor measures(2), how-to steps(3)
  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    `Five functions cover about 80% of everyday DAX. Let's get comfortable with each of them.`,
    `Here they are: SUM totals a column, COUNT counts rows, AVERAGE finds the mean, DIVIDE safely divides two numbers, and DISTINCTCOUNT counts unique values. They all follow the same pattern — FunctionName, then the table and column inside brackets.`,
    `Here are real measures built from our ${flavor.label} model. Tap each one to see the DAX and the plain-English explanation. Notice the pattern: every measure names itself clearly, then describes the calculation.`,
    `To create a measure in Power BI: right-click your fact table in the Fields pane, choose New Measure, type the formula, and press Enter. The measure appears with a calculator icon. Drag it onto any visual to use it.`,
  ];

  return (
    <ModuleLayout moduleId={3} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Five functions cover 80% of everyday DAX: SUM, COUNT, AVERAGE, DIVIDE, and DISTINCTCOUNT. They all follow the same pattern: FunctionName(Table[Column]). Let's look at real measures for our dataset."
      kaaraniHint="DIVIDE is safer than the / operator — it handles division by zero gracefully and returns a blank or a specified alternative value."
      onPrev={onPrev}
      primaryAction={{ label: "The CALCULATE function →", onClick: onNext, disabled: !isComplete }}
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — header */}
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={3} label="Module 3 · Screen 6" title="Basic DAX functions "
            subtitle="SUM · COUNT · AVERAGE · DIVIDE · DISTINCTCOUNT" moduleColor={M_COLOR} />
        </div>

        {/* Block 1 — Core functions */}
        <div className={`${blockClass(1)} mb-5`}>
          <div className="grid grid-cols-5 gap-2 mb-5">
            {["SUM", "COUNT", "AVERAGE", "DIVIDE", "DISTINCTCOUNT"].map((fn, i) => (
              <div key={fn} className="rounded-xl p-3 text-center" style={{ backgroundColor: "#F9FAFB", border: "1.5px solid #E5E7EB" }}>
                <p className="text-sm font-black font-mono" style={{ color: M_COLOR }}>{fn}</p>
                <p className="text-[10px] mt-1" style={{ color: "#6B7280" }}>
                  {["Total", "How many", "Mean", "Safe ÷", "Unique"][i]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Block 2 — Flavor measures */}
        <div className={`${blockClass(2)} mb-4`}>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#6B7280" }}>
            Real measures for our {flavor.label} model — tap to explore
          </p>
          <div className="flex flex-col gap-2 mb-4">
            {measures.map((m, i) => (
              <button key={m.name} type="button" onClick={() => setActive(i)}
                className="flex items-start gap-3 p-4 rounded-2xl border-2 text-left cursor-pointer transition-all"
                style={{ borderColor: active === i ? M_COLOR : "#E5E7EB", backgroundColor: "#FFFFFF" }}>
                <span className="text-lg w-6 text-center">{active === i ? "▼" : "▶"}</span>
                <div className="flex-1">
                  <p className="font-black text-sm" style={{ color: active === i ? M_COLOR : "#3D2B1F" }}>{m.name}</p>
                  {active === i && (
                    <div className="mt-2">
                      <p className="text-xs mb-2 p-2 rounded" style={{ backgroundColor: "#FFFFFF", color: "#111827" }}>
                        Plain English: <strong>{m.plain}</strong>
                      </p>
                      <CodeBlock code={m.dax} label="DAX" color={M_COLOR} />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Block 3 — How to create a measure */}
        <div className={`${blockClass(3)} mb-4`}>
          <div className="rounded-2xl p-4" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#2563EB" }}> How to create a measure in Power BI</p>
            <ol className="flex flex-col gap-1">
              {["Right-click your fact table in the Fields pane → New Measure", "Type the formula: Total Runs = SUM(fact_Deliveries[runs_batsman])", "Press Enter — the measure appears with a calculator icon (∑)", "Drag it onto a visual to use it"].map((s, i) => (
                <li key={i} className="flex gap-2 text-xs" style={{ color: "#111827" }}>
                  <span className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-black text-white" style={{ backgroundColor: "#2563EB" }}>{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
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
