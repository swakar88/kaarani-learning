"use client";

import React, { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorDataset } from "@/data/module2";
import { ScreenHeader, PowerBICallout } from "@/components/ui/ScreenSection";

const M_COLOR = "#2563EB";

export default function Screen5DuplicatesNulls({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);
  const dataset = getFlavorDataset(selectedFlavor);
  const [tab, setTab] = useState<"dupes" | "nulls">("dupes");
  const dupeIssue = dataset.issues.find(i => i.issue.toLowerCase().includes("duplic")) || dataset.issues[1];
  const nullIssue = dataset.issues.find(i => i.issue.toLowerCase().includes("null") || i.issue.toLowerCase().includes("blank")) || dataset.issues[0];

  return (
    <ModuleLayout moduleId={2} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Duplicates and null values are the two most common data quality issues. Duplicates inflate your totals — imagine counting a match twice. Nulls can silently skew your averages if you treat them as zeros when they should be 'unknown'."
      kaaraniHint="Always ask: is this null 'zero' or 'unknown'? A missing rating is NOT the same as a zero rating. Never replace with 0 unless you're sure."
      onPrev={onPrev}
      primaryAction={{ label: "Transform columns →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={2} label="Module 2 · Screen 5" title="Remove duplicates & handle nulls "
          subtitle="Two of the most common — and most damaging — data quality issues." moduleColor={M_COLOR} />

        <div className="flex gap-2 mb-5">
          {[{ id: "dupes" as const, label: "Duplicate rows", icon: "" }, { id: "nulls" as const, label: "Null / blank values", icon: "⬜" }].map(t => (
            <button key={t.id} type="button" onClick={() => setTab(t.id)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 font-bold text-sm cursor-pointer transition-all"
              style={{ borderColor: tab === t.id ? M_COLOR : "#E5E7EB", backgroundColor: tab === t.id ? M_COLOR + "12" : "#FFFFFF", color: tab === t.id ? M_COLOR : "#3D2B1F" }}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === "dupes" && (
          <div className="animate-fade-in-up flex flex-col gap-4">
            <div className="rounded-2xl p-4" style={{ backgroundColor: "#EFF6FF", border: "2px solid #BFDBFE" }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#2563EB" }}>Issue in our dataset</p>
              <p className="text-sm font-semibold" style={{ color: "#111827" }}>{dupeIssue.issue}</p>
              <p className="text-xs mt-1.5" style={{ color: "#2563EB" }}> Fix: {dupeIssue.fix}</p>
            </div>
            <div className="rounded-2xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
              <p className="text-sm font-bold mb-2" style={{ color: "#111827" }}>How to remove in Power Query:</p>
              <ol className="flex flex-col gap-1.5">
                {["Select the column(s) that define uniqueness (e.g. match_id)", "Home ribbon → Remove Rows → Remove Duplicates", "Or: right-click column header → Remove Duplicates"].map((step, i) => (
                  <li key={i} className="flex gap-2 text-sm" style={{ color: "#6B7280" }}>
                    <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black text-white" style={{ backgroundColor: "#2563EB" }}>{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {tab === "nulls" && (
          <div className="animate-fade-in-up flex flex-col gap-4">
            <div className="rounded-2xl p-4" style={{ backgroundColor: "#FFFFFF", border: "2px solid #E8E8E8" }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#2563EB" }}>Issue in our dataset</p>
              <p className="text-sm font-semibold" style={{ color: "#111827" }}>{nullIssue.issue}</p>
              <p className="text-xs mt-1.5" style={{ color: "#2563EB" }}> Fix: {nullIssue.fix}</p>
            </div>
            <div className="rounded-2xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
              <p className="text-sm font-bold mb-2" style={{ color: "#111827" }}>Handling nulls in Power Query:</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { action: "Replace null → 0", when: "Numeric field where null = 0 (e.g. no goals scored)", color: "#2563EB" },
                  { action: "Replace null → 'Unknown'", when: "Text field where null means missing info", color: "#2563EB" },
                  { action: "Keep as null", when: "Rating not given — don't assume 0", color: "#2563EB" },
                  { action: "Remove rows with null", when: "Key identifier column is null — row is useless", color: "#2563EB" },
                ].map(opt => (
                  <div key={opt.action} className="rounded-xl p-3" style={{ backgroundColor: opt.color + "0C", border: `1px solid ${opt.color}30` }}>
                    <p className="text-xs font-bold mb-1" style={{ color: opt.color }}>{opt.action}</p>
                    <p className="text-xs leading-snug" style={{ color: "#6B7280" }}>{opt.when}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-4">
          <PowerBICallout items={["Right-click column → Replace Values", "Right-click → Remove Errors", "Home → Remove Rows → Remove Blank Rows", "Transform → Fill Down (for merged cells)"]} />
        </div>
      </div>
    </ModuleLayout>
  );
}
