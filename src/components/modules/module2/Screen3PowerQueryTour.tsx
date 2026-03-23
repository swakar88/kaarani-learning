"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { Placeholder } from "@/components/ui/Placeholder";
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

        {/* Block 1 — Screenshot placeholder */}
        <div className={`${blockClass(1)} mb-5`}>
          <div className="relative">
            <Placeholder type="image" label="[Power BI Screenshot: Power Query Editor — to be replaced with annotated screenshot]" height="220px" />
            <p className="text-xs text-center mt-2" style={{ color: "#6B7280" }}>← The real Power Query Editor will be embedded here</p>
          </div>
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
