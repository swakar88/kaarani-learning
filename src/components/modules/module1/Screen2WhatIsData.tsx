"use client";

import React, { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";

const KAARANI_TEXT =
  "Data on its own is just noise. It becomes valuable only when you process it. Think of it like raw ingredients versus a cooked meal. Numbers are the ingredients — analytics is the cooking.";

const KAARANI_HINT =
  "The word 'analytics' comes from the Greek 'analyein' — to unloose or release. You're releasing the meaning hidden in the numbers.";

// Flavor-specific data → information → insight examples
const FLAVOR_LADDER: Record<
  string,
  { data: string; information: string; insight: string; decision: string }
> = {
  cricket: {
    data: "Rohit Sharma: 45, 12, 67, 3, 89, 24…",
    information: "Rohit averages 42.3 runs this IPL season",
    insight: "Rohit scores 60% more when batting first vs chasing",
    decision: "Set him to open in every home match",
  },
  football: {
    data: "Shot coordinates: (88,32), (54,12), (91,44)…",
    information: "Arsenal had 18 shots on target this week",
    insight: "72% of goals come from shots inside the box",
    decision: "Train to build play centrally into the penalty area",
  },
  movies: {
    data: "Day 1: ₹42Cr, Day 2: ₹38Cr, Day 3: ₹29Cr…",
    information: "Pathaan earned ₹300 crore in its first week",
    insight: "Action films with known IP earn 2× more in week 1",
    decision: "Greenlight 3 sequels from our existing IP library",
  },
  ecommerce: {
    data: "Order IDs: 10041, 10042, 10043, amounts: ₹499, ₹1299…",
    information: "₹4.2 crore revenue from 12,400 orders in Q3",
    insight: "Top 8% of customers drive 62% of revenue",
    decision: "Launch a premium loyalty programme for top customers",
  },
  food: {
    data: "Order timestamps: 19:04, 19:07, 19:09…",
    information: "Average delivery time is 34 minutes on weekends",
    insight: "Ratings drop by 0.6 when delivery exceeds 40 mins",
    decision: "Add 5 delivery partners in peak areas after 6 PM",
  },
  stocks: {
    data: "RELIANCE: 2840, 2855, 2820, 2898…",
    information: "Reliance stock rose 18.4% in FY2024",
    insight: "IT stocks fall 12%+ when US interest rates rise by 0.5%+",
    decision: "Reduce IT exposure by 10% when Fed signals rate hike",
  },
  healthcare: {
    data: "Patient IDs: P0041, P0042… wait times: 22, 18, 41 mins",
    information: "Average ER wait time is 34 minutes",
    insight: "Wait times spike 80% when night-shift staffing drops below 6",
    decision: "Mandate minimum 6 night-shift staff during peak months",
  },
  music: {
    data: "Track IDs: S1042, S1043… plays: 12400, 8200, 450…",
    information: "Arijit Singh had 4.8 billion streams in 2023",
    insight: "Songs under 3 mins 30 secs get 40% more playlist adds",
    decision: "Brief artists to target 3:00–3:30 for their next singles",
  },
  travel: {
    data: "Flight BLR-DEL 6E-204: Fare ₹4200, seats: 168/180…",
    information: "Delhi–Mumbai is the busiest route with 240 seats/day",
    insight: "Bookings made 14+ days ahead are 31% cheaper and sell out 100%",
    decision: "Launch early-bird pricing campaign 21 days before each flight",
  },
  gaming: {
    data: "Player IDs: U0041, U0042… sessions: 12, 4, 1, 8…",
    information: "BGMI has 70 million players with avg 4.2 sessions/week",
    insight: "Players with <2 sessions in 14 days churn at 71%",
    decision: "Auto-trigger win-back offer when sessions drop below threshold",
  },
};

const DEFAULT_LADDER = FLAVOR_LADDER.cricket;

const STEPS = [
  { key: "data", label: "Raw Data", icon: "", color: "#6B7280", bg: "#F3F4F6", border: "#E5E7EB" },
  { key: "information", label: "Information", icon: "", color: "#2563EB", bg: "#FFFFFF", border: "#E5E7EB" },
  { key: "insight", label: "Insight", icon: "", color: "#2563EB", bg: "#FFFFFF", border: "#E8E8E8" },
  { key: "decision", label: "Decision", icon: "", color: "#2563EB", bg: "#F9FAFB", border: "#E5E7EB" },
] as const;

export default function Screen2WhatIsData({
  onNext,
  onPrev,
  screenIndex,
  totalScreens,
}: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);
  const ladder = FLAVOR_LADDER[selectedFlavor] ?? DEFAULT_LADDER;

  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <ModuleLayout
      moduleId={1}
      screenIndex={screenIndex}
      totalScreens={totalScreens}
      kaaraniText={KAARANI_TEXT}
      kaaraniHint={KAARANI_HINT}
      onPrev={onPrev}
      primaryAction={{ label: "Show me the 4 types", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#2563EB" }}>
            Module 1 · Screen 2
          </span>
          <h1 className="text-3xl font-black mt-1" style={{ color: "#111827" }}>
            Data → Information → Insight → Decision
          </h1>
          <p className="text-base mt-2" style={{ color: "#6B7280" }}>
            Tap each step to see a {flavor.label} example.
          </p>
        </div>

        {/* Ladder steps */}
        <div className="flex flex-col gap-3 mb-8">
          {STEPS.map((step, i) => {
            const value = ladder[step.key];
            const isActive = activeStep === i;
            return (
              <button
                key={step.key}
                type="button"
                onClick={() => setActiveStep(isActive ? null : i)}
                className="flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer w-full"
                style={{
                  borderColor: isActive ? "#2563EB" : "#E5E7EB",
                  backgroundColor: "#FFFFFF",
                  boxShadow: isActive ? "0 0 0 3px rgba(37,99,235,0.1)" : "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: isActive ? "#2563EB" : "#E5E7EB", color: isActive ? "#FFFFFF" : "#9CA3AF" }}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>
                      Step {i + 1}
                    </span>
                    <span className="font-bold text-base" style={{ color: "#111827" }}>
                      {step.label}
                    </span>
                    {i > 0 && (
                      <span className="text-xs ml-auto opacity-50">
                        {isActive ? "▲ hide" : "▼ see example"}
                      </span>
                    )}
                  </div>
                  {isActive && (
                    <p
                      className="text-sm leading-relaxed mt-1 font-mono rounded-lg px-3 py-2"
                      style={{
                        backgroundColor: step.color + "12",
                        color: step.color,
                        border: `1px solid ${step.color}30`,
                      }}
                    >
                      {value}
                    </p>
                  )}
                  {!isActive && i === 0 && (
                    <p className="text-xs" style={{ color: "#6B7280" }}>
                      Numbers, dates, names — meaningless on their own
                    </p>
                  )}
                </div>
                {/* Arrow to next */}
                {i < STEPS.length - 1 && (
                  <span className="flex-shrink-0 text-lg self-center" style={{ color: "#E5E7EB" }}>
                    →
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Analytics definition box */}
        <div
          className="rounded-2xl p-5 flex items-start gap-4"
          style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}
        >
          <span className="text-3xl"></span>
          <div>
            <p className="font-bold text-base mb-1" style={{ color: "#2563EB" }}>
              So what is Data Analytics?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#111827" }}>
              Data analytics is the practice of examining raw data to find patterns, draw
              conclusions, and support decisions. In Power BI, you do this with visuals,
              filters, and measures — no coding required.
            </p>
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}
