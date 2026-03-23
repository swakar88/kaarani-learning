"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorStarSchema } from "@/data/module3";
import { ScreenHeader } from "@/components/ui/ScreenSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

const REL_TYPES = [
  { type: "One-to-Many (1:*)", icon: "1⃣→", color: "#2563EB", desc: "One row in the dimension matches many rows in the fact. E.g. one Player → many deliveries.", best: "The standard. Always aim for this.", example: "dim_Player → fact_Deliveries via player_id" },
  { type: "Many-to-One (*:1)", icon: "→1⃣", color: "#2563EB", desc: "Same as 1:* but described from the fact side. Power BI treats them the same.", best: "Same as 1:* — just the direction described differently.", example: "fact_Deliveries → dim_Player via player_id" },
  { type: "Many-to-Many (*:*)", icon: "→", color: "#2563EB", desc: "Both tables have duplicate values in the key. Requires a bridge table or can cause issues.", best: "Avoid if possible. Use a bridge table instead.", example: "Students ↔ Courses (a student takes many courses; a course has many students)" },
];

export default function Screen3Relationships({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const schema = getFlavorStarSchema(selectedFlavor);
  const [active, setActive] = useState(0);
  const current = REL_TYPES[active];

  // 4 blocks: header(0), our relationships(1), relationship type cards(2), how-to tip(3)
  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    `Relationships are the lines you draw between tables in the Model view. They are the core of what makes a data model work.`,
    `Here are the relationships in our ${flavor.label} model. Each dimension table connects to the fact table through a key column. When you filter by a dimension value — say a specific player — Power BI uses the relationship to automatically filter the fact table too.`,
    `Not all relationships are equal. The one-to-many relationship is the standard — one row in a dimension matches many rows in the fact table. Tap each type to understand when to use it, and when to avoid it.`,
    `To create a relationship in Power BI: go to Model view, then drag the key column from a dimension table onto the matching column in the fact table. A line appears. That's your relationship. Power BI can also auto-detect them — but always verify those.`,
  ];

  return (
    <ModuleLayout moduleId={3} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Relationships are the lines you draw between tables in the Model view. When you filter by a dimension value — say, a specific player — that filter flows through the relationship into the fact table automatically. This is called filter context propagation."
      kaaraniHint="Power BI auto-detects relationships when column names match. Always verify auto-detected relationships — they're not always correct."
      onPrev={onPrev}
      primaryAction={{ label: "What is DAX? →", onClick: onNext, disabled: !isComplete }}
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — header */}
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={3} label="Module 3 · Screen 3" title="Relationships — connecting your tables "
            subtitle="How filters flow from dimension tables into fact tables." moduleColor={M_COLOR} />
        </div>

        {/* Block 1 — Our relationships */}
        <div className={`${blockClass(1)} mb-5`}>
          <div className="rounded-2xl p-4 mb-5" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: M_COLOR }}>{flavor.label} relationships</p>
            {schema.dimensions.map(dim => (
              <div key={dim.name} className="flex items-center gap-3 py-2 border-b last:border-0" style={{ borderColor: "#E5E7EB" }}>
                <div className="flex-1 text-xs">
                  <span className="font-mono" style={{ color: "#111827" }}>{dim.name}</span>
                  <span className="mx-2" style={{ color: "#6B7280" }}>—1:*→</span>
                  <span className="font-mono" style={{ color: M_COLOR }}>{schema.factTable}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: "#F9FAFB", color: "#111827" }}>via key</span>
              </div>
            ))}
          </div>
        </div>

        {/* Block 2 — Relationship type cards */}
        <div className={`${blockClass(2)} mb-4`}>
          <div className="flex gap-2 mb-4">
            {REL_TYPES.map((r, i) => (
              <button key={r.type} type="button" onClick={() => setActive(i)}
                className="flex-1 flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-center cursor-pointer transition-all"
                style={{ borderColor: active === i ? r.color : "#E5E7EB", backgroundColor: active === i ? r.color + "0C" : "#FFFFFF" }}>
                <span className="text-[10px] font-bold leading-tight" style={{ color: active === i ? r.color : "#3D2B1F" }}>{r.type.split(" ")[0]}</span>
              </button>
            ))}
          </div>

          <div className="rounded-2xl p-4 mb-4 animate-fade-in-up" style={{ backgroundColor: current.color + "0C", border: `2px solid ${current.color}30` }}>
            <p className="font-black mb-2" style={{ color: current.color }}>{current.type}</p>
            <p className="text-sm mb-2" style={{ color: "#111827" }}>{current.desc}</p>
            <p className="text-xs font-mono mb-2" style={{ color: "#6B7280" }}>e.g. {current.example}</p>
            <div className="rounded-lg px-3 py-2" style={{ backgroundColor: "#F9FAFB", border: `1px solid ${current.color}30` }}>
              <p className="text-xs font-semibold" style={{ color: current.color }}>{current.best}</p>
            </div>
          </div>
        </div>

        {/* Block 3 — How to create tip */}
        <div className={`${blockClass(3)} mb-4`}>
          <div className="rounded-xl p-3" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
            <p className="text-xs" style={{ color: "#6B7280" }}>
              <strong style={{ color: "#2563EB" }}>To create in Power BI:</strong> Model view → drag the key column from a dimension table onto the matching column in the fact table. A line appears — that&apos;s your relationship.
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
