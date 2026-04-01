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

const TRANSFORMS = [
  { id: "rename", icon: "", label: "Rename", desc: "Give columns meaningful names", example: "\"pass_yds\" → \"Pass Yards\"", m: '= Table.RenameColumns(Source, {{"pass_yds", "Pass Yards"}})' },
  { id: "split", icon: "", label: "Split Column", desc: "Separate one column into two", example: "\"LAX-ORD\" → \"Origin\" + \"Dest\"", m: '= Table.SplitColumn(Source, "Route", Splitter.SplitTextByDelimiter("-"))' },
  { id: "custom", icon: "", label: "Custom Column", desc: "Create calculated columns using M", example: "Profit = Revenue - Cost", m: '= Table.AddColumn(Source, "Profit", each [Revenue] - [Cost])' },
  { id: "extract", icon: "", label: "Extract", desc: "Pull part of a text or number", example: "Extract year from date string", m: '= Table.AddColumn(Source, "Year", each Date.Year([OrderDate]))' },
  { id: "replace", icon: "", label: "Replace Values", desc: "Find and replace specific values", example: "\"NYY\" → \"New York Yankees\"", m: '= Table.ReplaceValue(Source, "NYY", "New York Yankees", Replacer.ReplaceText, {"team"})' },
];

export default function Screen6TransformColumns({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const dataset = getFlavorDataset(selectedFlavor);
  const [active, setActive] = useState("rename");
  const current = TRANSFORMS.find(t => t.id === active)!;
  const relevantIssue = dataset.issues.find(i => i.issue.toLowerCase().includes("inconsist") || i.issue.toLowerCase().includes("name")) || dataset.issues[2];

  // 4 blocks: header(0), flavor issue(1), transform selector + detail(2), applied steps reminder(3)
  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    "Column transformations are where Power Query really shines. Renaming messy headers, splitting combined columns, adding calculated columns — every action is recorded automatically.",
    `Here's a column issue from our ${flavor.label} dataset. This is a classic example of real data arriving inconsistently — and Power Query fixes it in one click.`,
    "There are five transforms you'll use constantly. Tap each one to see an example and the M code it generates. You don't need to write M — Power Query writes it for you.",
    "Every transform adds a step to Applied Steps. You can delete any step to undo it, or rename steps to document what each one does. Think of it as a self-documenting recipe.",
  ];

  return (
    <ModuleLayout moduleId={2} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Column transformations are where Power Query shines. Renaming messy column headers, splitting a combined column, adding calculated columns — every action creates a step in your recipe. Explore the most useful ones."
      kaaraniHint="Always rename columns to be human-readable before building your report. Your future self will thank you."
      onPrev={onPrev}
      primaryAction={
        isComplete
          ? { label: "Filter rows →", onClick: onNext }
          : { label: "Filter rows →", onClick: onNext, disabled: true }
      }
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — Header */}
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={2} label="Module 2 · Screen 6" title="Transform columns"
            subtitle="The five most useful column transforms. Tap each to see an example." moduleColor={M_COLOR} />
        </div>

        {/* Block 1 — Flavor-specific issue */}
        <div className={`${blockClass(1)} mb-4`}>
          <div className="rounded-xl p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
            <p className="text-xs font-bold" style={{ color: "#2563EB" }}>In our {flavor.label} dataset:</p>
            <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{relevantIssue.issue} → {relevantIssue.fix}</p>
          </div>
        </div>

        {/* Block 2 — Transform selector + detail */}
        <div className={`${blockClass(2)} mb-4`}>
          <div className="flex gap-2 flex-wrap mb-4">
            {TRANSFORMS.map(t => (
              <button key={t.id} type="button" onClick={() => setActive(t.id)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 text-xs font-bold cursor-pointer transition-all"
                style={{ borderColor: active === t.id ? M_COLOR : "#E5E7EB", backgroundColor: active === t.id ? M_COLOR + "12" : "#FFFFFF", color: active === t.id ? M_COLOR : "#3D2B1F" }}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="rounded-2xl p-5 animate-fade-in-up" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
            <div className="flex items-center gap-3 mb-3">
              <div>
                <p className="font-black" style={{ color: M_COLOR }}>{current.label}</p>
                <p className="text-sm" style={{ color: "#6B7280" }}>{current.desc}</p>
              </div>
            </div>
            <div className="rounded-lg px-3 py-2 mb-3" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
              <p className="text-xs font-mono" style={{ color: "#2563EB" }}>Example: {current.example}</p>
            </div>
            <CodeBlock code={current.m} label="M Code Generated" color={M_COLOR} />
          </div>
        </div>

        {/* Block 3 — Applied Steps reminder */}
        <div className={`${blockClass(3)} mb-4`}>
          <div className="rounded-xl p-3" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
            <p className="text-xs" style={{ color: "#111827" }}>
              <strong>Remember:</strong> Every transform adds a step to <strong>Applied Steps</strong>. You can delete any step to undo it, or rename steps to document what each one does.
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
