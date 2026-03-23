"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorChartExample } from "@/data/module4";
import { ScreenHeader } from "@/components/ui/ScreenSection";
import { Placeholder } from "@/components/ui/Placeholder";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

const AI_VISUALS = [
  {
    id: "qa",
    name: "Q&A Visual",
    icon: "",
    desc: "Ask questions in plain English — 'What is the total runs by team?' — and Power BI generates the chart automatically.",
    useCase: "Non-technical users who want to explore data without knowing DAX",
    color: "#2563EB",
  },
  {
    id: "ki",
    name: "Key Influencers",
    icon: "",
    desc: "Automatically analyses which fields have the strongest influence on a target metric. Powered by ML, no code needed.",
    useCase: "Understanding what drives an outcome — e.g. what influences high ratings",
    color: "#2563EB",
  },
  {
    id: "dt",
    name: "Decomposition Tree",
    icon: "",
    desc: "Drill-down a metric through multiple dimensions interactively. The AI suggests which dimension to split by next.",
    useCase: "Root cause analysis — drill from total revenue down to the root cause",
    color: "#2563EB",
  },
  {
    id: "sn",
    name: "Smart Narrative",
    icon: "",
    desc: "Auto-generates a text summary of your report data. Updates as you filter. Great for executive summaries.",
    useCase: "Automated insight text alongside charts for busy executives",
    color: "#2563EB",
  },
];

export default function Screen12AIVisuals({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const chartEx = getFlavorChartExample(selectedFlavor);
  const [active, setActive] = useState("ki");
  const current = AI_VISUALS.find(v => v.id === active)!;

  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    "Power BI has built-in AI visuals that require zero code. The Key Influencers visual uses machine learning to tell you what drives an outcome.",
    "Four AI visuals: Q&A lets users type questions in plain English, Key Influencers finds what drives a metric, Decomposition Tree drills into root causes, and Smart Narrative writes the report commentary automatically.",
    `For ${flavor.label} data — ${chartEx.aiInsight}. Tap each AI visual tab above to explore how each one would be used with your data.`,
    "Important: AI visuals require a Power BI Pro or Premium licence for publishing. You can build and view them in Desktop for free — they only need a licence when shared to the Power BI Service.",
  ];

  return (
    <ModuleLayout moduleId={4} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Power BI has built-in AI visuals that require zero code. The Key Influencers visual uses machine learning to tell you what drives an outcome. The Q&A visual lets users type questions. Smart Narrative writes the report commentary automatically."
      kaaraniHint="AI visuals require a Power BI Pro or Premium licence for publishing. You can build and view them in Desktop for free — they only need a licence when shared to the Power BI Service."
      onPrev={onPrev}
      primaryAction={isComplete
        ? { label: "Design best practices →", onClick: onNext }
        : { label: "Design best practices →", onClick: onNext, disabled: true }}
    >
      <div className="max-w-2xl mx-auto">
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={4} label="Module 4 · Screen 12" title="AI Visuals — no code intelligence "
            subtitle="Q&A · Key Influencers · Decomposition Tree · Smart Narrative" moduleColor={M_COLOR} />
        </div>

        <div className={`${blockClass(1)} mb-4`}>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {AI_VISUALS.map(v => (
              <button key={v.id} type="button" onClick={() => setActive(v.id)}
                className="flex flex-col items-center gap-1 p-3 rounded-xl border-2 cursor-pointer transition-all"
                style={{ borderColor: active === v.id ? v.color : "#E5E7EB", backgroundColor: active === v.id ? v.color + "12" : "#FFFFFF" }}>
                <p className="text-[10px] font-bold text-center leading-tight" style={{ color: active === v.id ? v.color : "#3D2B1F" }}>{v.name}</p>
              </button>
            ))}
          </div>

          <div className="rounded-2xl p-5 animate-fade-in-up" style={{ backgroundColor: current.color + "0C", border: `2px solid ${current.color}30` }}>
            <div className="flex items-center gap-3 mb-3">
              <div>
                <p className="font-black" style={{ color: current.color }}>{current.name}</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>Use case: {current.useCase}</p>
              </div>
            </div>
            <p className="text-sm mb-3" style={{ color: "#111827" }}>{current.desc}</p>
            <div className="rounded-xl p-3" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
              <p className="text-xs font-bold mb-0.5" style={{ color: "#2563EB" }}>{flavor.label} example</p>
              <p className="text-xs" style={{ color: "#111827" }}>
                {current.id === "ki" && chartEx.aiInsight}
                {current.id === "qa" && `Try typing: "${chartEx.aiInsight.replace("Key Influencers: ", "").replace("Q&A: ", "")}"`}
                {current.id === "dt" && `Decompose Total ${flavor.metric1Label} → by ${flavor.dimension2Label} → by ${flavor.dimension1Label} → by Time Period`}
                {current.id === "sn" && `Smart Narrative auto-writes: "Total ${flavor.metric1Label} is X. ${flavor.dimension1Label === "Player" ? "Top performer is Y with Z runs." : "Top category is Y."} vs last period it is [up/down] Z%."`}
              </p>
            </div>
          </div>
        </div>

        <div className={`${blockClass(2)} mb-4`}>
          <Placeholder type="report" label={`[Power BI: ${current.name} visual using ${flavor.label} data]`} height="120px" />
        </div>

        <div className={`${blockClass(3)} rounded-xl p-3`} style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
          <p className="text-xs font-bold mb-1" style={{ color: "#2563EB" }}>Licence note</p>
          <p className="text-xs" style={{ color: "#111827" }}>AI visuals work in Desktop (free). Publishing to the Service for sharing requires Power BI Pro or Premium per user. Check your organisation's licence before planning AI visual reports.</p>
        </div>

        {!isComplete && (
          <button type="button"
            onClick={() => { unlockVoice(); if (narrationScript[step + 1]) speak(narrationScript[step + 1]); next(); }}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-colors mt-4"
            style={{ backgroundColor: "#EFF6FF", color: "#2563EB", border: "1.5px dashed #93C5FD" }}
          >
            {tapLabel} →
          </button>
        )}
      </div>
    </ModuleLayout>
  );
}
