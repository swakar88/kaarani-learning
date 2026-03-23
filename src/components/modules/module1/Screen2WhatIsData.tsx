"use client";

import React from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const KAARANI_TEXT =
  "Data on its own is just noise. It becomes valuable only when you process it — through information, insight, and finally, a decision.";

const KAARANI_HINT =
  "The word 'analytics' comes from the Greek 'analyein' — to unloose or release. You're releasing the meaning hidden in the numbers.";

// ── Raw data tables (shown as actual tables for each flavor) ──
const RAW_DATA_TABLES: Record<string, { headers: string[]; rows: (string | number)[][] }> = {
  cricket: {
    headers: ["Player", "Match Date", "Runs", "Balls", "Venue"],
    rows: [
      ["Rohit Sharma", "14 Apr", 45, 38, "Wankhede"],
      ["Rohit Sharma", "19 Apr", 12, 14, "Chepauk"],
      ["Rohit Sharma", "24 Apr", 67, 44, "Chinnaswamy"],
      ["Rohit Sharma", "2 May", 3, 5, "Eden Gardens"],
      ["Rohit Sharma", "7 May", 89, 61, "Wankhede"],
    ],
  },
  football: {
    headers: ["Player", "Match", "Shot X", "Shot Y", "Goal?"],
    rows: [
      ["Saka", "vs Chelsea", 88, 32, "Yes"],
      ["Martinelli", "vs Chelsea", 54, 12, "No"],
      ["Saka", "vs City", 91, 44, "Yes"],
      ["Havertz", "vs City", 62, 28, "No"],
      ["Odegaard", "vs Spurs", 76, 38, "Yes"],
    ],
  },
  movies: {
    headers: ["Date", "Day", "Revenue (₹Cr)", "Shows", "City Tier"],
    rows: [
      ["22 Jan", "Day 1", 42, 6800, "T1"],
      ["23 Jan", "Day 2", 38, 6400, "T1"],
      ["24 Jan", "Day 3", 29, 5900, "T1"],
      ["25 Jan", "Day 4", 24, 5200, "T1"],
      ["26 Jan", "Day 5", 31, 5600, "T1"],
    ],
  },
  ecommerce: {
    headers: ["Order ID", "Date", "Amount (₹)", "Category", "City"],
    rows: [
      [10041, "3 Oct", 499, "Apparel", "Mumbai"],
      [10042, "3 Oct", 1299, "Electronics", "Delhi"],
      [10043, "4 Oct", 249, "Books", "Bangalore"],
      [10044, "4 Oct", 3499, "Electronics", "Hyderabad"],
      [10045, "5 Oct", 699, "Home", "Pune"],
    ],
  },
  food: {
    headers: ["Order ID", "Placed", "Delivered", "Mins", "Rating"],
    rows: [
      ["F0041", "19:04", "19:38", 34, "4.2"],
      ["F0042", "19:07", "19:44", 37, "3.8"],
      ["F0043", "19:09", "19:56", 47, "2.9"],
      ["F0044", "19:12", "19:43", 31, "4.5"],
      ["F0045", "19:15", "19:58", 43, "3.1"],
    ],
  },
  stocks: {
    headers: ["Date", "Ticker", "Open", "Close", "Change %"],
    rows: [
      ["1 Apr", "RELIANCE", 2840, 2855, "+0.53%"],
      ["2 Apr", "RELIANCE", 2855, 2820, "-1.22%"],
      ["3 Apr", "RELIANCE", 2820, 2898, "+2.77%"],
      ["4 Apr", "RELIANCE", 2898, 2876, "-0.76%"],
      ["5 Apr", "RELIANCE", 2876, 2910, "+1.18%"],
    ],
  },
  healthcare: {
    headers: ["Patient ID", "Arrival", "Seen At", "Wait (min)", "Shift Staff"],
    rows: [
      ["P0041", "22:04", "22:26", 22, 7],
      ["P0042", "22:11", "22:29", 18, 7],
      ["P0043", "22:18", "22:59", 41, 5],
      ["P0044", "22:25", "23:06", 41, 5],
      ["P0045", "22:31", "23:15", 44, 5],
    ],
  },
  music: {
    headers: ["Track ID", "Song", "Duration", "Streams", "Playlist Adds"],
    rows: [
      ["S1042", "Tum Hi Ho", "4:22", 12400, 840],
      ["S1043", "Kesariya", "4:28", 8200, 520],
      ["S1044", "Raataan Lambiyan", "3:18", 9100, 710],
      ["S1045", "Jai Ho", "5:01", 450, 22],
      ["S1046", "Apna Bana Le", "3:24", 6800, 590],
    ],
  },
  travel: {
    headers: ["Flight", "Route", "Date", "Fare (₹)", "Seats Sold"],
    rows: [
      ["6E-204", "BLR→DEL", "15 Jan", 4200, 168],
      ["AI-302", "BOM→DEL", "15 Jan", 5100, 172],
      ["6E-204", "BLR→DEL", "16 Jan", 3800, 180],
      ["SG-101", "HYD→BOM", "16 Jan", 2900, 144],
      ["AI-302", "BOM→DEL", "17 Jan", 5600, 180],
    ],
  },
  gaming: {
    headers: ["Player ID", "Date", "Sessions", "Avg Duration", "Level"],
    rows: [
      ["U0041", "1 Oct", 3, "22 min", 34],
      ["U0042", "1 Oct", 1, "8 min", 12],
      ["U0043", "1 Oct", 0, "—", 67],
      ["U0044", "1 Oct", 5, "41 min", 88],
      ["U0045", "1 Oct", 2, "18 min", 23],
    ],
  },
};

const FLAVOR_LADDER: Record<
  string,
  { information: string; insight: string; decision: string }
> = {
  cricket: {
    information: "Rohit averages 42.3 runs this IPL season",
    insight: "Rohit scores 60% more when batting first vs chasing",
    decision: "Set him to open in every home match",
  },
  football: {
    information: "Arsenal had 18 shots on target this week",
    insight: "72% of goals come from shots inside the box",
    decision: "Train to build play centrally into the penalty area",
  },
  movies: {
    information: "Pathaan earned ₹300 crore in its first week",
    insight: "Action films with known IP earn 2× more in week 1",
    decision: "Greenlight 3 sequels from our existing IP library",
  },
  ecommerce: {
    information: "₹4.2 crore revenue from 12,400 orders in Q3",
    insight: "Top 8% of customers drive 62% of revenue",
    decision: "Launch a premium loyalty programme for top customers",
  },
  food: {
    information: "Average delivery time is 34 minutes on weekends",
    insight: "Ratings drop by 0.6 when delivery exceeds 40 mins",
    decision: "Add 5 delivery partners in peak areas after 6 PM",
  },
  stocks: {
    information: "Reliance stock rose 18.4% in FY2024",
    insight: "IT stocks fall 12%+ when US interest rates rise by 0.5%+",
    decision: "Reduce IT exposure by 10% when Fed signals rate hike",
  },
  healthcare: {
    information: "Average ER wait time is 34 minutes",
    insight: "Wait times spike 80% when night-shift staffing drops below 6",
    decision: "Mandate minimum 6 night-shift staff during peak months",
  },
  music: {
    information: "Arijit Singh had 4.8 billion streams in 2023",
    insight: "Songs under 3 mins 30 secs get 40% more playlist adds",
    decision: "Brief artists to target 3:00–3:30 for their next singles",
  },
  travel: {
    information: "Delhi–Mumbai is the busiest route with 240 seats/day",
    insight: "Bookings made 14+ days ahead are 31% cheaper and sell out 100%",
    decision: "Launch early-bird pricing campaign 21 days before each flight",
  },
  gaming: {
    information: "BGMI has 70 million players with avg 4.2 sessions/week",
    insight: "Players with <2 sessions in 14 days churn at 71%",
    decision: "Auto-trigger win-back offer when sessions drop below threshold",
  },
};

const DEFAULT_LADDER = FLAVOR_LADDER.cricket;

export default function Screen2WhatIsData({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const ladder = FLAVOR_LADDER[selectedFlavor] ?? DEFAULT_LADDER;
  const rawTable = RAW_DATA_TABLES[selectedFlavor] ?? RAW_DATA_TABLES.cricket;

  // 6 blocks: header(0) + 4 steps(1-4) + callout(5)
  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(6);

  const narrationScript = [
    `I want to show you something. A number by itself — what does it tell you? Nothing. Watch what happens as we go through these steps.`,
    `Look at this ${flavor.label} data. A table of raw numbers — dates, IDs, values. You could stare at it for five minutes. Still nothing. This is raw data — completely useless on its own.`,
    `Now I do one thing — count, sort, and group. Suddenly: ${ladder.information}. Same data. Now it means something. That jump has a name: Information.`,
    `But here is the question that changes everything — WHY is this happening? ${ladder.insight}. That is not just information. That is an insight.`,
    `Insight without action is just trivia. So what do you actually do? ${ladder.decision}. A pile of raw numbers just became a real business decision.`,
    `Data. Information. Insight. Decision. That entire journey IS data analytics. And Power BI is the tool that makes it happen visually — no code required.`,
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
            Data → Information → Insight → Decision
          </h1>
          <p className="text-base mt-2" style={{ color: "#6B7280" }}>
            Watch {flavor.label} data transform into a real decision, one step at a time.
          </p>
        </div>

        {/* Block 1 — Raw Data (table) */}
        <div className={`${blockClass(1)} mb-3`}>
          <div className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: "#2563EB" }}>
            <div className="flex items-center gap-3 px-5 py-3" style={{ backgroundColor: "#EFF6FF", borderBottom: "1px solid #BFDBFE" }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: "#2563EB" }}>1</div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>Step 1</span>
                <span className="font-bold text-sm ml-2" style={{ color: "#111827" }}>Raw Data</span>
              </div>
              <span className="text-xs ml-auto" style={{ color: "#6B7280" }}>Numbers, dates, names — meaningless on their own</span>
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
                    <td colSpan={rawTable.headers.length} className="px-3 py-2 text-center" style={{ color: "#9CA3AF" }}>
                      … hundreds more rows
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Block 2 — Information */}
        <div className={`${blockClass(2)} mb-3`}>
          <div className="rounded-2xl border-2 p-5" style={{ borderColor: "#7C3AED", backgroundColor: "#FFFFFF" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: "#7C3AED" }}>2</div>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>Step 2</span>
              <span className="font-bold text-sm" style={{ color: "#111827" }}>Information</span>
              <span className="text-xs ml-auto" style={{ color: "#6B7280" }}>Organized and summarized</span>
            </div>
            <p className="text-base font-semibold rounded-xl px-4 py-3" style={{ backgroundColor: "#F5F3FF", color: "#5B21B6", border: "1px solid #DDD6FE" }}>
              {ladder.information}
            </p>
          </div>
        </div>

        {/* Block 3 — Insight */}
        <div className={`${blockClass(3)} mb-3`}>
          <div className="rounded-2xl border-2 p-5" style={{ borderColor: "#059669", backgroundColor: "#FFFFFF" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: "#059669" }}>3</div>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>Step 3</span>
              <span className="font-bold text-sm" style={{ color: "#111827" }}>Insight</span>
              <span className="text-xs ml-auto" style={{ color: "#6B7280" }}>Ask WHY</span>
            </div>
            <p className="text-base font-semibold rounded-xl px-4 py-3" style={{ backgroundColor: "#ECFDF5", color: "#065F46", border: "1px solid #A7F3D0" }}>
              {ladder.insight}
            </p>
          </div>
        </div>

        {/* Block 4 — Decision */}
        <div className={`${blockClass(4)} mb-3`}>
          <div className="rounded-2xl border-2 p-5" style={{ borderColor: "#D97706", backgroundColor: "#FFFFFF" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: "#D97706" }}>4</div>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>Step 4</span>
              <span className="font-bold text-sm" style={{ color: "#111827" }}>Decision</span>
              <span className="text-xs ml-auto" style={{ color: "#6B7280" }}>Insight drives action</span>
            </div>
            <p className="text-base font-semibold rounded-xl px-4 py-3" style={{ backgroundColor: "#FFFBEB", color: "#92400E", border: "1px solid #FDE68A" }}>
              {ladder.decision}
            </p>
          </div>
        </div>

        {/* Block 5 — Definition callout */}
        <div className={`${blockClass(5)} mb-6`}>
          <div className="rounded-2xl p-5" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
            <p className="font-bold text-base mb-1" style={{ color: "#2563EB" }}>So what is Data Analytics?</p>
            <p className="text-sm leading-relaxed" style={{ color: "#111827" }}>
              Data analytics is the practice of examining raw data to find patterns, draw
              conclusions, and support decisions. In Power BI, you do this with visuals,
              filters, and measures — no coding required.
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
