"use client";

import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorDataset } from "@/data/module2";
import { ScreenHeader } from "@/components/ui/ScreenSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

const MESSY_EXAMPLES = [
  { label: "Dates as text",                 bad: '"15/03/2019"',                      good: "Date field: 15 Mar 2019" },
  { label: "Numbers with currency symbols", bad: '"₹ 1,299"',                         good: "Decimal: 1299" },
  { label: "Missing values (nulls)",        bad: "—",                                 good: "Replace with 0 or 'Unknown'" },
  { label: "Duplicate rows",                bad: "Same record twice",                 good: "Remove duplicates" },
  { label: "Inconsistent spelling",         bad: '"MI", "Mumbai Indians", "Mumbai"',  good: "One canonical name" },
];

export default function Screen1MessyData({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const dataset = getFlavorDataset(selectedFlavor);

  // 4 blocks: header(0), dataset card(1), problems list(2), Power Query callout(3)
  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    `Welcome to Module 2! Here's the truth no one tells you: real-world ${flavor.label} data is almost never clean.`,
    `Here's the dataset we'll work with this module. It's a real ${flavor.label} dataset. Notice the file type, the row count, and the source.`,
    "Real data arrives with five common problems: dates stored as text, numbers mixed with currency symbols, missing values, duplicate rows, and inconsistent spellings. We'll fix every single one.",
    "Power Query is Power BI's data preparation engine. It fixes all of this with clicks, not code. And every step is recorded as a recipe — so when new data arrives, it runs automatically.",
  ];

  return (
    <ModuleLayout
      moduleId={2}
      screenIndex={screenIndex}
      totalScreens={totalScreens}
      kaaraniText={`Welcome to Module 2! Here's the truth no one tells you: real-world ${flavor.label} data is almost never clean. It arrives with missing values, dates stored as text, duplicate rows, and inconsistent spellings. Power Query is Power BI's data preparation engine — and it's brilliant at fixing all of this.`}
      kaaraniHint="80% of a data analyst's time is data preparation. Getting good at Power Query is one of the highest-ROI skills you can develop."
      onPrev={onPrev}
      primaryAction={
        isComplete
          ? { label: "Show me the dataset →", onClick: onNext }
          : { label: "Show me the dataset →", onClick: onNext, disabled: true }
      }
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — Header */}
        <div className={blockClass(0)}>
          <ScreenHeader
            moduleId={2}
            label="Module 2 · Prepare & Clean Data"
            title="Real data is always messy"
            subtitle={`We'll use a real ${flavor.label} dataset and fix every issue Power Query can handle.`}
            moduleColor={M_COLOR}
          />
        </div>

        {/* Block 1 — Dataset card */}
        <div className={`${blockClass(1)} mb-6`}>
          <div className="rounded-3xl p-6" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm text-white flex-shrink-0" style={{ backgroundColor: M_COLOR }}>
                {dataset.fileType.slice(0, 3).toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: M_COLOR }}>Our dataset for this module</p>
                <p className="font-black text-lg" style={{ color: "#111827" }}>{dataset.name}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "File type", value: dataset.fileType },
                { label: "Rows",      value: dataset.rows },
                { label: "Source",    value: dataset.source },
              ].map(item => (
                <div key={item.label} className="rounded-xl p-3 text-center" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}>
                  <p className="text-sm font-black" style={{ color: M_COLOR }}>{item.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Block 2 — Problems list */}
        <div className={`${blockClass(2)} mb-6`}>
          <p className="text-sm font-bold mb-3" style={{ color: "#111827" }}>Common problems we&apos;ll fix in Power Query:</p>
          <div className="flex flex-col gap-2">
            {MESSY_EXAMPLES.map((ex, i) => (
              <div
                key={ex.label}
                className="flex items-center gap-4 p-3 rounded-xl"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  animation: `cue-in 0.4s ease-out ${i * 100}ms both`,
                }}
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0" style={{ backgroundColor: M_COLOR }}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold" style={{ color: "#111827" }}>{ex.label}</p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ backgroundColor: "#F3F4F6", color: "#6B7280" }}>{ex.bad}</span>
                    <span style={{ color: "#9CA3AF" }}>→</span>
                    <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ backgroundColor: "#F9FAFB", color: "#111827" }}>{ex.good}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Block 3 — Power Query callout */}
        <div className={`${blockClass(3)} mb-4`}>
          <div className="rounded-2xl p-4" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
            <p className="text-sm leading-relaxed" style={{ color: "#111827" }}>
              <span className="font-bold" style={{ color: "#2563EB" }}>Power Query</span> lets you fix all of these
              with clicks, not code. Every step is recorded as a recipe — so when new data arrives, it
              runs automatically.
            </p>
          </div>
        </div>

        {/* Tap to reveal */}
        {!isComplete && (
          <button
            type="button"
            onClick={() => {
              unlockVoice();
              if (narrationScript[step + 1]) speak(narrationScript[step + 1]);
              next();
            }}
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
