"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorDataset } from "@/data/module2";
import { ScreenHeader, PowerBICallout } from "@/components/ui/ScreenSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

export default function Screen7FilterRows({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const dataset = getFlavorDataset(selectedFlavor);
  const filterIssue = dataset.issues.find(i => i.fix.toLowerCase().includes("filter") || i.issue.toLowerCase().includes("zero")) || dataset.issues[dataset.issues.length - 1];
  const [rows, setRows] = useState([
    { id: 1, keep: true, reason: "Valid data row" },
    { id: 2, keep: false, reason: "Volume = 0 (holiday)" },
    { id: 3, keep: true, reason: "Valid data row" },
    { id: 4, keep: false, reason: "Blank key field" },
    { id: 5, keep: true, reason: "Valid data row" },
  ]);

  // 4 blocks: header(0), flavor filter need(1), interactive demo + filter types(2), callout(3)
  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    "Filtering in Power Query removes rows permanently — before data reaches your report. This is very different from a report slicer, which just hides rows visually.",
    `Here's why we need to filter in our ${flavor.label} dataset. These are rows that should never make it to the report — they'd corrupt your analysis if left in.`,
    "This is what the Data Preview looks like. You can see which rows are kept and which are excluded. Try tapping a row to toggle it. In Power Query, you use the column dropdown or Remove Rows options to do this permanently.",
    "Use Power Query filters to permanently remove test rows, holidays, errors, or out-of-scope data. Use report slicers for filters users need to toggle interactively.",
  ];

  return (
    <ModuleLayout moduleId={2} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Filtering in Power Query removes rows from your dataset permanently — before it reaches your report. This is very different from a slicer in a report, which just hides rows visually. Use Power Query filters to clean: remove test rows, holidays, errors, or out-of-scope data."
      kaaraniHint="Always filter at the source for data you never want to see. Use report slicers for filters users need to toggle interactively."
      onPrev={onPrev}
      primaryAction={
        isComplete
          ? { label: "Merge & append queries →", onClick: onNext }
          : { label: "Merge & append queries →", onClick: onNext, disabled: true }
      }
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — Header */}
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={2} label="Module 2 · Screen 7" title="Filter rows — clean at the source"
            subtitle="Remove rows that should never reach your report." moduleColor={M_COLOR} />
        </div>

        {/* Block 1 — Flavor filter need */}
        <div className={`${blockClass(1)} mb-5`}>
          <div className="rounded-xl p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
            <p className="text-xs font-bold" style={{ color: "#2563EB" }}>Our {flavor.label} filter need:</p>
            <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{filterIssue.issue}</p>
            <p className="text-xs font-semibold mt-0.5" style={{ color: "#2563EB" }}>Fix: {filterIssue.fix}</p>
          </div>
        </div>

        {/* Block 2 — Interactive row filter demo + filter types */}
        <div className={`${blockClass(2)} mb-4`}>
          <div className="rounded-2xl overflow-hidden mb-5" style={{ border: "1.5px solid #E8E8E8" }}>
            <div className="px-4 py-2.5 flex items-center justify-between" style={{ backgroundColor: "#FFFFFF" }}>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: M_COLOR }}>Data Preview — click rows to toggle filter</p>
              <p className="text-xs" style={{ color: "#6B7280" }}>{rows.filter(r => r.keep).length} of {rows.length} rows kept</p>
            </div>
            {rows.map(row => (
              <div key={row.id} onClick={() => setRows(prev => prev.map(r => r.id === row.id ? { ...r, keep: !r.keep } : r))}
                className="flex items-center gap-4 px-4 py-3 border-b cursor-pointer transition-all"
                style={{ backgroundColor: row.keep ? "#FFFFFF" : "#F9FAFB", borderColor: "#E5E7EB", opacity: row.keep ? 1 : 0.5 }}>
                <span className="text-lg w-6 text-center">{row.keep ? "" : ""}</span>
                <span className="text-xs font-mono flex-1" style={{ color: "#111827" }}>Row {row.id}: {dataset.columns.slice(0, 3).join(", ")}…</span>
                <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: row.keep ? "#F9FAFB" : "#E5E7EB", color: row.keep ? "#111827" : "#6B7280" }}>{row.reason}</span>
              </div>
            ))}
          </div>

          <img src="/screenshots/m2-filter-rows.png" alt="Filter rows dropdown in Power Query"
            className="w-full rounded-xl border mb-4" style={{ borderColor: "#E5E7EB" }} />
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Remove rows where column = value", example: "Volume = 0", icon: "" },
              { label: "Remove blank rows", example: "Key ID is null", icon: "⬜" },
              { label: "Keep only rows in date range", example: "Date ≥ 2020-01-01", icon: "" },
              { label: "Filter by text condition", example: "Status contains 'Active'", icon: "" },
            ].map(f => (
              <div key={f.label} className="rounded-xl p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
                <p className="text-xs font-semibold mt-1" style={{ color: "#111827" }}>{f.label}</p>
                <p className="text-xs mt-0.5 font-mono" style={{ color: "#6B7280" }}>e.g. {f.example}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Block 3 — PQ filter vs Slicer comparison + callout */}
        <div className={`${blockClass(3)} mb-4`}>
          <div className="rounded-2xl p-4 mb-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: M_COLOR }}>Power Query filter vs Report slicer — not the same thing</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-3" style={{ backgroundColor: "#FEF2F2", border: "1.5px solid #FECACA" }}>
                <p className="text-xs font-black mb-1" style={{ color: "#991B1B" }}>Power Query filter</p>
                <p className="text-xs leading-snug" style={{ color: "#7F1D1D" }}>Permanently removes rows before data loads. The user never sees those rows — even in a slicer. Use for rows you never want in the report at all.</p>
              </div>
              <div className="rounded-xl p-3" style={{ backgroundColor: "#F0FDF4", border: "1.5px solid #BBF7D0" }}>
                <p className="text-xs font-black mb-1" style={{ color: "#166534" }}>Report slicer</p>
                <p className="text-xs leading-snug" style={{ color: "#14532D" }}>Hides rows visually. The data is still there — the user can toggle the filter on or off. Use when users need to explore different subsets.</p>
              </div>
            </div>
          </div>
          <PowerBICallout title="Filter rows in Power Query via…"
            items={["Column header dropdown → filter", "Home → Remove Rows → Remove Blank Rows", "Add Column → Custom with if condition", "Table.SelectRows() in formula bar"]} />
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
