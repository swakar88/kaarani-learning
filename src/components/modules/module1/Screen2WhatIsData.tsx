"use client";

import React from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getPracticeData } from "@/data/practice-data";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const KAARANI_TEXT =
  "Raw data alone tells you nothing. But the moment you start asking questions — What happened? Why? What should we do? — data becomes your most powerful tool.";

const KAARANI_HINT =
  "Think of it like this: data is the ingredients, information is the recipe, insight is the chef's intuition, and the decision is the dish you serve.";

const FLAVOR_LADDER: Record<
  string,
  { information: string; insight: string; decision: string }
> = {
  baseball: {
    information: "LA Dodgers lead with 312 total hits across 99 games — NY Yankees 2nd with 226",
    insight: "Postponed game rows record 0 hits but still count as games — they pull down team averages",
    decision: "Filter to status = 'Played' only — team hit averages jump by 26%",
  },
  nfl: {
    information: "Kansas City Chiefs lead with 2,780 total passing yards — Houston Texans 2nd with 2,170",
    insight: "Bye-week rows record 0 yards but count as game weeks — they drag down per-game averages",
    decision: "Filter to status = 'Played' only — KC Chiefs average rises from 309 to 371 yards per game",
  },
  soccer: {
    information: "Inter Miami CF lead with 23 total goals — LA Galaxy 2nd with 19 across the dataset",
    insight: "Postponed match rows record 0 goals but count as matches played, shrinking per-match averages",
    decision: "Filter to status = 'Played' — Inter Miami's goals-per-match improves from 0.65 to 0.9",
  },
  music: {
    information: "R&B/Soul leads with 12,098M total streams — more than double Hip-Hop/Rap (6,217M)",
    insight: "TEST-status rows are QA entries with placeholder values — they inflate stream totals",
    decision: "Filter out TEST rows in Power Query — totals reflect only real listener activity",
  },
  netflix: {
    information: "Drama leads with 16,045M hours watched — triple the next genre (Thriller at 5,493M)",
    insight: "Shows with null ratings are new releases — averaging them in pulls the genre score down",
    decision: "Exclude null ratings from averages — the score then reflects only shows with real ratings",
  },
  shopping: {
    information: "Electronics leads with $236,798 total revenue — 3× higher than Audio ($156,516)",
    insight: "TEST-status rows are fake QA orders — $50,000 placeholders that inflate revenue totals",
    decision: "Filter to status = 'Active' only — revenue figures become accurate and reportable",
  },
  retail: {
    information: "Clothing & Shoes leads with 78,068 units sold — nearly double Kitchen (40,160 units)",
    insight: "TEST-status rows use 9,999-unit placeholders with $0 margin — they distort every aggregate",
    decision: "Filter to status = 'Active' only — unit counts and margins reflect real store sales",
  },
};

const DEFAULT_LADDER = FLAVOR_LADDER.baseball;

export default function Screen2WhatIsData({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const ladder = FLAVOR_LADDER[selectedFlavor] ?? DEFAULT_LADDER;
  const practiceData = getPracticeData(selectedFlavor);

  // Build display tables from practice data using flavor-specific labels
  const rawTable = {
    headers: ["Date", flavor.dimension1Label, flavor.dimension2Label, flavor.metric1Label, flavor.metric2Label, "Status"],
    rows: practiceData.rawRows.map(r => [r.date, r.entity_name, r.category_name, r.metric1 ?? "—", r.metric2 ?? "—", r.status]),
  };
  const infoTable = {
    headers: [flavor.dimension2Label, `Total ${flavor.metric1Label}`, `Avg ${flavor.metric2Label}`, "Count"],
    rows: [...practiceData.groupedRows]
      .sort((a, b) => b.total_metric1 - a.total_metric1)
      .map(r => [r.category_name, r.total_metric1, r.avg_metric2 ?? "—", r.row_count]),
  };
  const insightTable = {
    headers: ["Pattern", "Value", "What This Means"],
    rows: practiceData.insightRows.map(r => [r.label, r.value, r.interpretation]),
  };

  // 6 blocks: header(0) + 4 steps(1-4) + callout(5)
  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(6);

  const narrationScript = [
    `Here is the most important idea in this entire course. Every app you use is recording your behaviour. But recorded data alone is useless. Let me show you the four steps that turn it into something powerful.`,
    `This is your raw ${flavor.label} data. Rows and columns — dates, numbers, IDs. You could stare at this for an hour and still not know what to do. This is called raw data — the starting point of every analytics journey.`,
    `Now I group it, count it, sort it. Same data — totally different picture: ${ladder.information}. This is called information. The data now answers a question: what happened?`,
    `Information is great. But the question that changes everything is why. ${ladder.insight}. You just went from knowing the result to understanding the reason. That is an insight.`,
    `Insight without action is just trivia. So what do you actually do? ${ladder.decision}. A pile of rows just became a personal decision you can act on today.`,
    `Data. Information. Insight. Decision. That four-step journey is data analytics. And Power B.I. is the tool that lets you walk that journey visually — no coding, no formulas, no guesswork.`,
  ];

  return (
    <ModuleLayout
      moduleId={1}
      screenIndex={screenIndex}
      totalScreens={totalScreens}
      kaaraniText={KAARANI_TEXT}
      kaaraniHint={KAARANI_HINT}
      onPrev={onPrev}
      primaryAction={
        isComplete
          ? { label: "Show me the 4 types →", onClick: onNext }
          : { label: "Show me the 4 types →", onClick: onNext, disabled: true }
      }
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — header */}
        <div className={blockClass(0)} style={{ marginBottom: "2rem" }}>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#2563EB" }}>
            Module 1 · Screen 2
          </span>
          <h1 className="text-3xl font-black mt-1" style={{ color: "#111827" }}>
            From Raw Numbers to Real Decisions
          </h1>
          <p className="text-base mt-2" style={{ color: "#6B7280" }}>
            We'll take real {flavor.label} data and walk through exactly how it becomes something you can act on.
          </p>
        </div>

        {/* Shared card style helper — all 4 steps look the same */}
        {/* Block 1 — Raw Data (table) */}
        <div className={`${blockClass(1)} mb-3`}>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#BFDBFE" }}>
            <div className="flex items-center gap-3 px-5 py-3" style={{ backgroundColor: "#EFF6FF", borderBottom: "1px solid #BFDBFE" }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: "#2563EB" }}>1</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm" style={{ color: "#111827" }}>Raw Data</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>Just numbers — no meaning yet. Can you make a decision from this alone?</p>
              </div>
            </div>
            <div className="overflow-x-auto" style={{ backgroundColor: "#FFFFFF" }}>
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ backgroundColor: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                    {rawTable.headers.map(h => (
                      <th key={h} className="px-3 py-2 text-left font-semibold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rawTable.rows.map((row, ri) => (
                    <tr key={ri} style={{ borderBottom: "1px solid #F3F4F6" }}>
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-3 py-2 font-mono" style={{ color: "#374151" }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                  <tr style={{ borderTop: "1px dashed #E5E7EB" }}>
                    <td colSpan={rawTable.headers.length} className="px-3 py-2 text-center text-xs" style={{ color: "#9CA3AF" }}>
                      … hundreds more rows just like these
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Block 2 — Information */}
        <div className={`${blockClass(2)} mb-3`}>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#BFDBFE" }}>
            <div className="flex items-center gap-3 px-5 py-3" style={{ backgroundColor: "#EFF6FF", borderBottom: "1px solid #BFDBFE" }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: "#2563EB" }}>2</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm" style={{ color: "#111827" }}>Information</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>We group, count, and sort — watch the same data answer "What happened?"</p>
              </div>
            </div>
            <div className="overflow-x-auto" style={{ backgroundColor: "#FFFFFF" }}>
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ backgroundColor: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                    {infoTable.headers.map(h => (
                      <th key={h} className="px-3 py-2 text-left font-semibold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {infoTable.rows.map((row, ri) => (
                    <tr key={ri} style={{ borderBottom: "1px solid #F3F4F6" }}>
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-3 py-2 font-mono" style={{ color: "#374151" }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t" style={{ backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" }}>
              <p className="text-sm font-semibold" style={{ color: "#1E40AF" }}>📊 {ladder.information}</p>
            </div>
          </div>
        </div>

        {/* Block 3 — Insight */}
        <div className={`${blockClass(3)} mb-3`}>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#BFDBFE" }}>
            <div className="flex items-center gap-3 px-5 py-3" style={{ backgroundColor: "#EFF6FF", borderBottom: "1px solid #BFDBFE" }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: "#2563EB" }}>3</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm" style={{ color: "#111827" }}>Insight</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>Now we ask "why" — compare groups to find the pattern</p>
              </div>
            </div>
            <div className="overflow-x-auto" style={{ backgroundColor: "#FFFFFF" }}>
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ backgroundColor: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                    {insightTable.headers.map(h => (
                      <th key={h} className="px-3 py-2 text-left font-semibold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {insightTable.rows.map((row, ri) => (
                    <tr key={ri} style={{ borderBottom: "1px solid #F3F4F6" }}>
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-3 py-2 font-mono" style={{ color: "#374151" }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t" style={{ backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" }}>
              <p className="text-sm font-semibold" style={{ color: "#1E40AF" }}>💡 {ladder.insight}</p>
            </div>
          </div>
        </div>

        {/* Block 4 — Decision */}
        <div className={`${blockClass(4)} mb-3`}>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#BFDBFE" }}>
            <div className="flex items-center gap-3 px-5 py-3" style={{ backgroundColor: "#EFF6FF", borderBottom: "1px solid #BFDBFE" }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: "#2563EB" }}>4</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm" style={{ color: "#111827" }}>Decision</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>Insight without action is just trivia — here's what you actually do</p>
              </div>
            </div>
            <div className="px-5 py-4" style={{ backgroundColor: "#FFFFFF" }}>
              <p className="text-base font-semibold" style={{ color: "#1E40AF" }}>
                ✅ {ladder.decision}
              </p>
            </div>
          </div>
        </div>

        {/* Block 5 — Definition callout */}
        <div className={`${blockClass(5)} mb-6`}>
          <div className="rounded-2xl p-5" style={{ backgroundColor: "#EFF6FF", border: "1px solid #BFDBFE" }}>
            <p className="font-bold text-base mb-2" style={{ color: "#1E40AF" }}>So what is Data Analytics?</p>
            <p className="text-sm leading-relaxed" style={{ color: "#1E40AF" }}>
              Data analytics is exactly this four-step journey — taking raw numbers and
              turning them into decisions. Power B.I. is the tool that lets you do this
              visually, with drag-and-drop. No coding, no formulas in Excel, no guessing.
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
