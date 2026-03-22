"use client";

import React from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";

// Flavor-aware story openings
const STORY_OPENERS: Record<string, { role: string; scenario: string; question: string }> = {
  cricket: {
    role: "Team Manager",
    scenario: "Your IPL team just played 14 matches. You have a spreadsheet of every ball bowled, every run scored, every wicket taken.",
    question: "But the owner calls and asks: \"Why are we losing? What should we change for the next match?\"",
  },
  football: {
    role: "Head Coach",
    scenario: "Your club played 20 Premier League games. You have GPS tracking data, passing accuracy, shots on target — thousands of numbers.",
    question: "But the board asks: \"Why are we dropping points? Who do we buy in January?\"",
  },
  movies: {
    role: "Film Producer",
    scenario: "You produced 5 films this year. You have box office numbers, OTT streams, audience ratings, and marketing spend data.",
    question: "But your financier asks: \"Why did 2 films flop? Where should we invest next year?\"",
  },
  ecommerce: {
    role: "Business Owner",
    scenario: "Your online store processed 50,000 orders last quarter. You have product data, customer data, returns, and ad spend.",
    question: "But your investor asks: \"Why is profit shrinking even though sales are up? What do we fix?\"",
  },
  food: {
    role: "Restaurant Chain Owner",
    scenario: "Your chain has 40 outlets. You have daily orders, delivery times, ratings, and cancellation data from every outlet.",
    question: "But your partner asks: \"Why are 12 outlets losing money? How do we turn them around?\"",
  },
  stocks: {
    role: "Portfolio Manager",
    scenario: "You manage a ₹10 crore portfolio across 30 stocks. You have price data, volumes, news sentiment, and sector indices.",
    question: "But your client asks: \"Why did our portfolio underperform the Nifty? What should we do now?\"",
  },
  healthcare: {
    role: "Hospital Administrator",
    scenario: "Your hospital saw 14,000 patients last quarter. You have admission records, treatment data, wait times, and re-admission rates.",
    question: "But the board asks: \"Why are ER wait times increasing? Where are we losing efficiency?\"",
  },
  music: {
    role: "Music Label Executive",
    scenario: "Your label released 80 songs this year. You have stream counts, skip rates, playlist adds, and listener demographics.",
    question: "But the CEO asks: \"Why are only 3 songs performing? How do we improve our release strategy?\"",
  },
  travel: {
    role: "Operations Manager",
    scenario: "Your travel platform handled 2 lakh bookings last month. You have route data, fare trends, cancellations, and customer ratings.",
    question: "But your director asks: \"Why did revenue drop 18% this quarter despite high bookings?\"",
  },
  gaming: {
    role: "Game Studio Director",
    scenario: "Your game has 5 million active players. You have session logs, in-app purchase data, churn rates, and player level progression.",
    question: "But your publisher asks: \"Why did 400,000 players quit after the last update? What went wrong?\"",
  },
};

const DEFAULT_STORY = STORY_OPENERS.cricket;

const KAARANI_TEXT =
  "Before we open Power BI, let me tell you a story. The kind of story that happens every day in every industry. It's about having too much data — and not enough answers.";

const KAARANI_HINT =
  "Data analytics is about turning raw numbers into decisions. Keep that in mind as you read this story.";

export default function Screen1StoryHook({
  onNext,
  onPrev,
  screenIndex,
  totalScreens,
}: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);
  const story = STORY_OPENERS[selectedFlavor] ?? DEFAULT_STORY;

  return (
    <ModuleLayout
      moduleId={1}
      screenIndex={screenIndex}
      totalScreens={totalScreens}
      kaaraniText={KAARANI_TEXT}
      kaaraniHint={KAARANI_HINT}
      onPrev={onPrev}
      primaryAction={{ label: "So... what IS data analytics?", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Module heading */}
        <div className="mb-8">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "#2563EB" }}
          >
            Module 1 · What is Data Analytics?
          </span>
          <h1 className="text-3xl font-black mt-1" style={{ color: "#111827" }}>
            You have the data. Now what?
          </h1>
        </div>

        {/* Story card */}
        <div
          className="rounded-3xl p-8 mb-6"
          style={{
            background: "linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 100%)",
            border: "1px solid #E5E7EB",
          }}
        >
          {/* Role badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl"></span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#2563EB" }}>
                You are the…
              </p>
              <p className="text-xl font-black" style={{ color: "#111827" }}>
                {story.role}
              </p>
            </div>
          </div>

          {/* Scenario */}
          <div
            className="rounded-2xl p-5 mb-4"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}
          >
            <p className="text-base leading-relaxed" style={{ color: "#111827" }}>
               {story.scenario}
            </p>
          </div>

          {/* The hard question */}
          <div
            className="rounded-2xl p-5"
            style={{ backgroundColor: "#FFFFFF", border: "2px dashed #2563EB" }}
          >
            <p className="text-base font-semibold leading-relaxed" style={{ color: "#1D4ED8" }}>
               {story.question}
            </p>
          </div>
        </div>

        {/* The gap */}
        <div
          className="flex items-start gap-4 rounded-2xl p-5"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}
        >
          <span className="text-2xl mt-0.5"></span>
          <div>
            <p className="font-bold text-sm mb-1" style={{ color: "#2563EB" }}>
              This is the gap data analytics fills.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#111827" }}>
              Raw numbers can&apos;t answer these questions. Analytics is the process of
              turning those numbers into answers — and eventually, decisions.
            </p>
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}
