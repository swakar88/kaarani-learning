"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { ScreenHeader } from "@/components/ui/ScreenSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

const PQ_ZONES = [
  { id: "ribbon", label: "Ribbon", icon: "", x: "5%", y: "3%", w: "90%", h: "12%",
    desc: "All transformation actions live here: Remove Columns, Change Type, Merge, Append, Group By — one click, one step added to your recipe.", color: "#2563EB" },
  { id: "queries", label: "Queries Pane", icon: "", x: "0%", y: "16%", w: "22%", h: "72%",
    desc: "Lists all your tables (queries). You can have many connected at once — e.g. a Sales table AND a Products table loaded together.", color: "#2563EB" },
  { id: "preview", label: "Data Preview", icon: "", x: "23%", y: "16%", w: "55%", h: "72%",
    desc: "Shows the first 1,000 rows of your current transformation state. Not the full data — just a preview for speed.", color: "#2563EB" },
  { id: "steps", label: "Applied Steps", icon: "", x: "79%", y: "16%", w: "21%", h: "72%",
    desc: "Your recipe! Every click adds a step here. You can delete, reorder, or rename steps. Power BI replays them every time data refreshes.", color: "#2563EB" },
  { id: "formula", label: "Formula Bar", icon: "", x: "5%", y: "89%", w: "90%", h: "8%",
    desc: "Shows the M code behind each step. You don't need to write M — but you can edit it here if you want advanced transformations.", color: "#2563EB" },
];

export default function Screen3PowerQueryTour({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const [active, setActive] = useState<string | null>(null);
  const current = PQ_ZONES.find(z => z.id === active);

  // 4 blocks: header(0), screenshot area(1), zone buttons + detail(2), open tip(3)
  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    "Power Query Editor looks intimidating at first — but once you know the four zones, everything makes sense.",
    "This is what Power Query looks like. Think of it as your data kitchen — you bring in raw ingredients and shape them before they go to the report.",
    "There are five zones to know. Tap each one to see what it does. The most important is Applied Steps — that's your recorded recipe. Every action you take is saved there and replays automatically on refresh.",
    "To open Power Query: in Power BI Desktop, go to Home → Transform Data. Or right-click any table in the Fields pane and choose Edit Query.",
  ];

  return (
    <ModuleLayout moduleId={2} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Power Query Editor looks intimidating at first — but it's actually four simple zones. The Ribbon for actions, the Queries pane for your tables, the Data Preview to see your data, and Applied Steps — your recipe that replays automatically."
      kaaraniHint="The 'Applied Steps' pane is what makes Power Query magical. It records every action — so refreshing data is fully automatic."
      onPrev={onPrev}
      primaryAction={
        isComplete
          ? { label: "Fix our first issue →", onClick: onNext }
          : { label: "Fix our first issue →", onClick: onNext, disabled: true }
      }
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — Header */}
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={2} label="Module 2 · Screen 3" title="Power Query Editor tour"
            subtitle="Tap each zone to learn what it does." moduleColor={M_COLOR} />
        </div>

        {/* Block 1 — PQ Editor layout mock */}
        <div className={`${blockClass(1)} mb-5`}>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid #E5E7EB", backgroundColor: "#F3F4F6" }}>
            {/* Title bar */}
            <div className="px-3 py-1.5 flex items-center gap-2" style={{ backgroundColor: "#1F2937" }}>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#EF4444" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#10B981" }} />
              </div>
              <span className="text-xs font-medium" style={{ color: "#D1D5DB" }}>Power Query Editor</span>
            </div>
            {/* Ribbon */}
            <div className="px-3 py-2 flex items-center gap-3 border-b" style={{ backgroundColor: "#DBEAFE", borderColor: "#BFDBFE" }}>
              <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: "#1E40AF" }}>① Ribbon</span>
              <div className="flex gap-2">
                {["Home", "Transform", "Add Column", "View"].map(t => (
                  <span key={t} className="text-[9px] px-2 py-0.5 rounded font-medium" style={{ backgroundColor: "#EFF6FF", color: "#2563EB" }}>{t}</span>
                ))}
              </div>
              <span className="text-[9px] ml-auto" style={{ color: "#3B82F6" }}>All actions live here</span>
            </div>
            {/* Main area */}
            <div className="flex" style={{ height: 130 }}>
              {/* Queries pane */}
              <div className="flex flex-col p-2 border-r" style={{ width: "22%", backgroundColor: "#F9FAFB", borderColor: "#E5E7EB" }}>
                <span className="text-[9px] font-black uppercase tracking-wider mb-2" style={{ color: "#1E40AF" }}>② Queries</span>
                {["Sales", "Products", "Dates"].map(q => (
                  <div key={q} className="text-[9px] px-2 py-1 rounded mb-1" style={{ backgroundColor: q === "Sales" ? "#DBEAFE" : "#FFFFFF", color: "#374151", border: "1px solid #E5E7EB" }}>{q}</div>
                ))}
              </div>
              {/* Data preview */}
              <div className="flex-1 p-2" style={{ backgroundColor: "#FFFFFF" }}>
                <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: "#1E40AF" }}>③ Data Preview</span>
                <div className="mt-1 overflow-hidden rounded" style={{ border: "1px solid #E5E7EB" }}>
                  <div className="flex" style={{ backgroundColor: "#F3F4F6" }}>
                    {["ID", "Date", "Amount", "Status"].map(h => (
                      <div key={h} className="flex-1 text-[8px] px-1.5 py-1 font-semibold border-r" style={{ color: "#6B7280", borderColor: "#E5E7EB" }}>{h}</div>
                    ))}
                  </div>
                  {[[1, "Jan 3", "₹499", "Active"], [2, "Jan 4", "null", "Active"], [3, "Jan 4", "₹899", "Active"]].map((row, i) => (
                    <div key={i} className="flex border-t" style={{ borderColor: "#F3F4F6" }}>
                      {row.map((cell, j) => (
                        <div key={j} className="flex-1 text-[8px] px-1.5 py-1 border-r font-mono" style={{ color: String(cell) === "null" ? "#EF4444" : "#374151", borderColor: "#F3F4F6" }}>{cell}</div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              {/* Applied steps */}
              <div className="flex flex-col p-2 border-l" style={{ width: "24%", backgroundColor: "#F9FAFB", borderColor: "#E5E7EB" }}>
                <span className="text-[9px] font-black uppercase tracking-wider mb-2" style={{ color: "#1E40AF" }}>④ Applied Steps</span>
                {["Source", "Changed Type", "Removed Nulls"].map((s) => (
                  <div key={s} className="text-[8px] px-2 py-1 rounded mb-1 flex items-center gap-1" style={{ backgroundColor: "#FFFFFF", color: "#374151", border: "1px solid #E5E7EB" }}>
                    <span style={{ color: "#2563EB" }}>▸</span> {s}
                  </div>
                ))}
              </div>
            </div>
            {/* Formula bar */}
            <div className="px-3 py-1.5 flex items-center gap-2 border-t" style={{ backgroundColor: "#F9FAFB", borderColor: "#E5E7EB" }}>
              <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: "#1E40AF" }}>⑤ Formula Bar</span>
              <span className="text-[8px] font-mono flex-1 px-2 py-0.5 rounded" style={{ backgroundColor: "#FFFFFF", color: "#6B7280", border: "1px solid #E5E7EB" }}>= Table.RemoveRowsWithErrors(#"Changed Type")</span>
            </div>
          </div>
          <img src="/screenshots/m2-raw-data.png" alt="Real Power Query Editor with messy data loaded"
            className="w-full rounded-xl mt-3 border" style={{ borderColor: "#E5E7EB" }} />
          <p className="text-xs text-center mt-1" style={{ color: "#9CA3AF" }}>The real Power Query Editor — tap each zone below to learn what it does</p>
        </div>

        {/* Block 2 — Zone buttons and detail */}
        <div className={`${blockClass(2)} mb-4`}>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {PQ_ZONES.map(zone => (
              <button key={zone.id} type="button" onClick={() => setActive(active === zone.id ? null : zone.id)}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 cursor-pointer transition-all"
                style={{ borderColor: active === zone.id ? zone.color : "#E5E7EB", backgroundColor: active === zone.id ? zone.color + "12" : "#FFFFFF" }}>
                <span className="text-[10px] font-bold text-center leading-tight" style={{ color: active === zone.id ? zone.color : "#3D2B1F" }}>{zone.label}</span>
              </button>
            ))}
          </div>

          {current && (
            <div className="rounded-2xl p-4 animate-fade-in-up mb-2" style={{ backgroundColor: current.color + "0C", border: `2px solid ${current.color}30` }}>
              <div className="flex items-center gap-2 mb-2">
                <p className="font-black" style={{ color: current.color }}>{current.label}</p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#111827" }}>{current.desc}</p>
            </div>
          )}
          {!current && (
            <div className="rounded-2xl p-4" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
              <p className="text-sm text-center" style={{ color: "#6B7280" }}>Tap any zone above to learn what it does</p>
            </div>
          )}
        </div>

        {/* Block 3 — How to open tip */}
        <div className={`${blockClass(3)} mb-4`}>
          <div className="rounded-xl p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}>
            <p className="text-xs" style={{ color: "#2563EB" }}>
              <strong>To open Power Query:</strong> In Power BI Desktop → Home → Transform Data, or right-click a table in the Fields pane → Edit Query
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
