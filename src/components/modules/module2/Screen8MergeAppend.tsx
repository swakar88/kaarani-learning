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

const CONCEPTS = [
  {
    id: "merge",
    label: "Merge Queries",
    icon: "",
    analogy: "Like a JOIN in SQL — combine columns from two tables using a matching key",
    when: "When you want to add columns from another table (lookup)",
    example: "Merge Deliveries table with Players table on player_id → adds player_name, country to each delivery",
    joinTypes: ["Left Outer (keep all left rows)", "Inner (keep only matching rows)", "Full Outer (keep everything)"],
    color: "#2563EB",
  },
  {
    id: "append",
    label: "Append Queries",
    icon: "",
    analogy: "Like UNION in SQL — stack rows from multiple tables with the same structure",
    when: "When you have the same data split across files/sheets (e.g. one file per month)",
    example: "Append Jan, Feb, Mar sales files → one combined table with all months",
    joinTypes: ["Append two tables", "Append multiple tables at once", "Combine Files (from Folder connector)"],
    color: "#2563EB",
  },
];

export default function Screen8MergeAppend({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const [active, setActive] = useState("merge");
  const current = CONCEPTS.find(c => c.id === active)!;

  // 4 blocks: header(0), concept toggle(1), detail card(2), M code(3)
  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    "Real-world data rarely comes in one table. You'll have facts in one file and lookups in another — like match results plus a player reference table.",
    "There are two operations for combining queries. Merge adds columns from a second table — like a database JOIN. Append stacks rows from multiple files with the same structure — like a UNION. Memorise this distinction.",
    `Tap each button to see how ${flavor.label} data benefits from both. Merge is for lookups; Append is for combining files of the same shape. Together they make Power Query extremely powerful.`,
    "Power Query generates the M code for both operations automatically. You never need to write it — but it's there if you want to inspect or modify it.",
  ];

  return (
    <ModuleLayout moduleId={2} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Real-world data rarely comes in one table. You'll have facts in one file and lookups in another — like match results plus a player reference table. Merge combines columns from two tables; Append stacks rows from multiple files. Together they make Power Query extremely powerful."
      kaaraniHint="Merge = JOIN (adds columns). Append = UNION (adds rows). Memorise this distinction — it saves confusion every time."
      onPrev={onPrev}
      primaryAction={
        isComplete
          ? { label: "Load to data model →", onClick: onNext }
          : { label: "Load to data model →", onClick: onNext, disabled: true }
      }
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — Header */}
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={2} label="Module 2 · Screen 8" title="Merge & Append queries"
            subtitle="Combine data from multiple tables or files." moduleColor={M_COLOR} />
        </div>

        {/* Block 1 — Concept toggle buttons */}
        <div className={`${blockClass(1)} mb-5`}>
          <div className="flex gap-3">
            {CONCEPTS.map(c => (
              <button key={c.id} type="button" onClick={() => setActive(c.id)}
                className="flex-1 flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all text-left"
                style={{ borderColor: active === c.id ? c.color : "#E5E7EB", backgroundColor: active === c.id ? c.color + "0C" : "#FFFFFF" }}>
                <div>
                  <p className="font-black text-sm" style={{ color: active === c.id ? c.color : "#3D2B1F" }}>{c.label}</p>
                  <p className="text-xs" style={{ color: "#6B7280" }}>
                    {c.id === "merge" ? "Adds columns" : "Adds rows"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Block 2 — Detail card */}
        <div className={`${blockClass(2)} mb-4`}>
          <div className="rounded-3xl p-5 animate-fade-in-up" style={{ backgroundColor: current.color + "0C", border: `2px solid ${current.color}30` }}>
            <div className="flex items-start gap-3 mb-4">
              <div>
                <p className="font-black" style={{ color: current.color }}>{current.label}</p>
                <p className="text-sm mt-0.5" style={{ color: "#6B7280" }}>{current.analogy}</p>
              </div>
            </div>

            <div className="rounded-xl p-3 mb-3" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${current.color}25` }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: current.color }}>When to use</p>
              <p className="text-sm" style={{ color: "#111827" }}>{current.when}</p>
            </div>

            <div className="rounded-xl p-3 mb-3" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${current.color}25` }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: current.color }}>{flavor.label} example</p>
              <p className="text-sm" style={{ color: "#111827" }}>{current.example}</p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: current.color }}>Options</p>
              <div className="flex flex-col gap-1">
                {current.joinTypes.map(jt => (
                  <div key={jt} className="flex items-center gap-2 text-xs" style={{ color: "#111827" }}>
                    <span style={{ color: current.color }}>▸</span> {jt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Block 3 — M Code */}
        <div className={`${blockClass(3)} mb-4`}>
          <CodeBlock
            code={active === "merge"
              ? `// Merge: adds player_name column to deliveries\n= Table.NestedJoin(fact_Deliveries, {"player_id"},\n    dim_Players, {"player_id"}, "Players", JoinKind.LeftOuter)`
              : `// Append: combine Jan + Feb + Mar files\n= Table.Combine({Jan_Sales, Feb_Sales, Mar_Sales})`}
            label="M Code" color={M_COLOR} />
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
