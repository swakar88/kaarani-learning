"use client";

import React, { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorStarSchema } from "@/data/module3";
import { ScreenHeader, CodeBlock } from "@/components/ui/ScreenSection";

const M_COLOR = "#2563EB";

const TIME_FUNCTIONS = [
  { fn: "TOTALYTD()", plain: "Total year-to-date", desc: "Running total from Jan 1 to the selected date", color: "#2563EB" },
  { fn: "TOTALQTD()", plain: "Total quarter-to-date", desc: "Running total from the start of the current quarter", color: "#2563EB" },
  { fn: "TOTALMTD()", plain: "Total month-to-date", desc: "Running total from the start of the current month", color: "#2563EB" },
  { fn: "SAMEPERIODLASTYEAR()", plain: "Same period last year", desc: "Returns the equivalent period from 12 months ago — for YoY comparison", color: "#2563EB" },
  { fn: "DATEADD()", plain: "Shift dates by N periods", desc: "Compare vs N days/months/quarters/years ago", color: "#EF4444" },
  { fn: "DATESINPERIOD()", plain: "Last N days/weeks", desc: "Rolling window — e.g. last 30 days, last 12 weeks", color: "#2563EB" },
];

export default function Screen9TimeIntelligence({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);
  const schema = getFlavorStarSchema(selectedFlavor);
  const [active, setActive] = useState(0);
  const current = TIME_FUNCTIONS[active];

  return (
    <ModuleLayout moduleId={3} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Time intelligence is where DAX truly shines. Most business questions are about time — year-to-date, same period last year, rolling 12 weeks. These would be complex queries in SQL but DAX makes them a single line. The key requirement: you must have a Date dimension table with continuous dates."
      kaaraniHint="Your Date table must be marked as a Date Table (right-click it in Model view). It must have one row per day with no gaps. Power BI can auto-create one via Modeling → New Date Table."
      onPrev={onPrev}
      primaryAction={{ label: "DAX variables →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={3} label="Module 3 · Screen 9" title="Time Intelligence — DAX for dates "
          subtitle="Year-to-date, same period last year, rolling windows — all in one line." moduleColor={M_COLOR} />

        {/* The Date table requirement */}
        <div className="rounded-xl p-3 mb-5" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
          <p className="text-xs font-bold" style={{ color: "#2563EB" }}> Prerequisite: a proper Date table</p>
          <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
            Time intelligence only works when your model has a Date table with every date marked as a Date Table. Ours: <strong>{schema.dimensions.find(d => d.name.includes("Date"))?.name ?? "dim_Date"}</strong>
          </p>
        </div>

        {/* Function picker */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {TIME_FUNCTIONS.map((f, i) => (
            <button key={f.fn} type="button" onClick={() => setActive(i)}
              className="p-3 rounded-xl border-2 text-left cursor-pointer transition-all"
              style={{ borderColor: active === i ? f.color : "#E5E7EB", backgroundColor: active === i ? f.color + "0C" : "#FFFFFF" }}>
              <p className="text-xs font-black font-mono" style={{ color: active === i ? f.color : "#3D2B1F" }}>{f.fn}</p>
              <p className="text-[10px] mt-0.5" style={{ color: "#6B7280" }}>{f.plain}</p>
            </button>
          ))}
        </div>

        <div className="rounded-2xl p-5 mb-4 animate-fade-in-up" style={{ backgroundColor: current.color + "0C", border: `2px solid ${current.color}30` }}>
          <p className="font-black mb-1" style={{ color: current.color }}>{current.fn}</p>
          <p className="text-sm mb-3" style={{ color: "#6B7280" }}>{current.desc}</p>
          <CodeBlock code={schema.timeIntelligence.dax} label={`$${schema.timeIntelligence.measure}`} color={current.color} />
          <div className="mt-3 rounded-lg px-3 py-2" style={{ backgroundColor: "#F9FAFB" }}>
            <p className="text-xs" style={{ color: "#111827" }}> Plain English: <strong>{schema.timeIntelligence.plain}</strong></p>
          </div>
        </div>

        <div className="rounded-xl p-3" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
          <p className="text-xs" style={{ color: "#6B7280" }}>
            <strong style={{ color: "#2563EB" }}>Build a YoY comparison chart:</strong> Add [Total {flavor.metric1Label}] and [{schema.timeIntelligence.measure}] to a line chart on the same axis. Instantly see this year vs last year.
          </p>
        </div>
      </div>
    </ModuleLayout>
  );
}
