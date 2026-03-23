"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorDataset } from "@/data/module2";
import { ScreenHeader, CodeBlock } from "@/components/ui/ScreenSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

const DATA_TYPES = [
  { type: "Date/Time", icon: "", color: "#2563EB", examples: ["2023-03-15", "15/03/2023", "March 15 2023"], fix: "Change Type → Date" },
  { type: "Whole Number", icon: "", color: "#2563EB", examples: ["42", "1,299", "\"100\""], fix: "Change Type → Whole Number" },
  { type: "Decimal Number", icon: "", color: "#2563EB", examples: ["3.14", "1,299.50", "\"42.5\""], fix: "Change Type → Decimal" },
  { type: "Text", icon: "", color: "#2563EB", examples: ["Player name", "City", "Category"], fix: "Change Type → Text" },
  { type: "True/False", icon: "", color: "#2563EB", examples: ["1/0", "Yes/No", "TRUE/FALSE"], fix: "Change Type → True/False" },
];

export default function Screen4ChangeTypes({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const dataset = getFlavorDataset(selectedFlavor);
  const dateIssue = dataset.issues.find(i => i.issue.toLowerCase().includes("date")) || dataset.issues[0];
  const [selected, setSelected] = useState(0);
  const current = DATA_TYPES[selected];

  // 4 blocks: header(0), flavor issue spotlight(1), type selector + detail(2), M code + pro tip(3)
  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    "Data types are the single most important thing to get right in Power Query. If a date is stored as text, you can't do date filters. If a number is text, you can't SUM it.",
    `Here's the type issue in our ${flavor.label} dataset. This is the kind of thing Power Query flags immediately — and fixing it is just a right-click.`,
    "There are five main data types to know. Tap each one to see what values it covers and how to set it. Look for the small icon on each column header — that icon tells you what type Power Query thinks it is.",
    "Every type change generates a step in Applied Steps automatically. Use Detect Data Type to get Power Query to guess — then review and correct any it got wrong.",
  ];

  return (
    <ModuleLayout moduleId={2} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Data types are the single most important thing to get right in Power Query. If a date is stored as text, you can't do date filters. If a number is text, you can't SUM it. Power BI shows a small icon on each column header — fix anything that looks wrong."
      kaaraniHint="Look for the ABC icon — that means text. Numbers should show 123. Dates should show a calendar icon. If they don't match reality, change the type."
      onPrev={onPrev}
      primaryAction={
        isComplete
          ? { label: "Remove duplicates →", onClick: onNext }
          : { label: "Remove duplicates →", onClick: onNext, disabled: true }
      }
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — Header */}
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={2} label="Module 2 · Screen 4" title="Change data types correctly"
            subtitle="Power Query imports everything as text by default. You must set the correct types." moduleColor={M_COLOR} />
        </div>

        {/* Block 1 — Flavor issue spotlight */}
        <div className={`${blockClass(1)} mb-5`}>
          <div className="rounded-2xl p-4" style={{ backgroundColor: "#EFF6FF", border: "2px solid #BFDBFE" }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#2563EB" }}>Issue in our {flavor.label} dataset</p>
            <p className="text-sm font-semibold" style={{ color: "#111827" }}>{dateIssue.issue}</p>
            <p className="text-xs mt-1 font-bold" style={{ color: "#2563EB" }}>Fix: {dateIssue.fix}</p>
          </div>
        </div>

        {/* Block 2 — Type selector + detail */}
        <div className={`${blockClass(2)} mb-4`}>
          <div className="flex gap-2 mb-4 flex-wrap">
            {DATA_TYPES.map((t, i) => (
              <button key={t.type} type="button" onClick={() => setSelected(i)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 text-xs font-bold cursor-pointer transition-all"
                style={{ borderColor: selected === i ? t.color : "#E5E7EB", backgroundColor: selected === i ? t.color + "12" : "#FFFFFF", color: selected === i ? t.color : "#3D2B1F" }}>
                {t.type}
              </button>
            ))}
          </div>

          <div className="rounded-2xl p-4 animate-fade-in-up" style={{ backgroundColor: current.color + "0C", border: `2px solid ${current.color}30` }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: current.color }}>Examples that need → {current.type}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {current.examples.map(ex => (
                <span key={ex} className="font-mono text-xs px-2 py-1 rounded" style={{ backgroundColor: "#1E1B2E", color: "#E2E8F0" }}>{ex}</span>
              ))}
            </div>
            <p className="text-xs font-bold" style={{ color: current.color }}>→ Right-click column header → Change Type → {current.type.split(" ")[0]}</p>
          </div>
        </div>

        {/* Block 3 — M code + pro tip */}
        <div className={`${blockClass(3)} mb-4`}>
          <CodeBlock code={`// M code generated by Power Query\n= Table.TransformColumnTypes(Source, {{"date", type date}, {"runs", Int64.Type}})`}
            label="Applied Step: Changed Type" color={M_COLOR} />

          <div className="mt-4 rounded-xl p-3" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
            <p className="text-xs" style={{ color: "#6B7280" }}>
              <strong style={{ color: "#2563EB" }}>Pro tip:</strong> Use <strong>Detect Data Type</strong> (Transform ribbon) to let Power Query guess types automatically — then review and correct any it got wrong.
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
