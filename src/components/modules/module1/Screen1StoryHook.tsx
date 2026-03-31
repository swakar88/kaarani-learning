"use client";

import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

// Flavor-aware story openings — YOU are the subject of the data
const STORY_OPENERS: Record<string, { role: string; scenario: string; question: string }> = {
  baseball: {
    role: "Baseball Stats Fan",
    scenario: "You follow 7 MLB players across 3 seasons. Every game, every hit, every home run — hundreds of rows of data sitting in a spreadsheet. Shohei Ohtani, Aaron Judge, Juan Soto — all in there.",
    question: "\"Which player performs better in high-pressure games? Why does one team's offense collapse in August?\" — The answers are already in the data.",
  },
  nfl: {
    role: "Fantasy Football Manager",
    scenario: "You manage a fantasy football team and track QB stats every week. Every pass yard, every touchdown, every bye week — 3 seasons of data about the top quarterbacks in the NFL.",
    question: "\"Why does Mahomes outperform at home but struggle on the road? Which QB should I start this week?\" — Your stats spreadsheet knows.",
  },
  soccer: {
    role: "MLS Stats Analyst",
    scenario: "You've been tracking MLS player stats for 2 seasons. Every match, every goal, every assist — Messi, Insigne, Puig — dozens of rows of data per player per season.",
    question: "\"Which club scores the most in the second half? Why do away games produce fewer goals?\" — The match data has every answer.",
  },
  music: {
    role: "Music Data Enthusiast",
    scenario: "You've been watching the weekly streaming charts for 3 years. Every artist, every genre, every chart position — Taylor Swift, Drake, Bad Bunny — all tracked week by week.",
    question: "\"Why do some albums dominate for weeks while others disappear after day one? Which genre is actually growing?\" — The chart data reveals the truth.",
  },
  netflix: {
    role: "Streaming Data Watcher",
    scenario: "You track weekly viewership numbers for your favourite shows. Stranger Things, Wednesday, Squid Game — hours watched, ratings, genre trends — all logged across 3 years of data.",
    question: "\"Why do some shows hold the top spot for months while others vanish in 2 weeks? What makes a show sticky?\" — The viewing data knows.",
  },
  shopping: {
    role: "E-commerce Analyst",
    scenario: "You track weekly sales for 7 top products — iPhone 15 Pro, AirPods, Sony headphones — revenue, returns, seasonal spikes — all in a spreadsheet going back 3 years.",
    question: "\"Why do returns spike on headphones every December? Which product will run out of stock before the holidays?\" — Your sales data has the answer.",
  },
  retail: {
    role: "Retail Store Analyst",
    scenario: "You track weekly sales across departments — Home Office, Fitness, Apparel. Standing desks, yoga mats, winter jackets — units sold and margin data for 3 years.",
    question: "\"Why did yoga mat sales drop 28% in February when January was record-breaking? Which department needs a promo?\" — The store data tells the story.",
  },
};

const DEFAULT_STORY = STORY_OPENERS.baseball;

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
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const story = STORY_OPENERS[selectedFlavor] ?? DEFAULT_STORY;

  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(3);

  const narrationScript = [
    "Before we open Power B.I., let me tell you something. Every app you use — Spotify, Swiggy, Flipkart, your fantasy league — is quietly recording everything you do. It's all data. YOUR data.",
    `Here's your situation as a ${story.role}. ${story.scenario}`,
    `And here's the thing — all those questions? They're already answered inside your data. You just need the right tool to ask them. That's exactly what data analytics is. And Power B.I. is how we do it.`,
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
          ? { label: "So... what IS data analytics?", onClick: onNext }
          : { label: "So... what IS data analytics?", onClick: onNext, disabled: true }
      }
    >
      <div className="max-w-2xl mx-auto">
        {/* Block 0: Module heading */}
        <div className={blockClass(0)} style={{ marginBottom: "2rem" }}>
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

        {/* Block 1: Story card */}
        <div className={`${blockClass(1)} mb-4`}>
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
        </div>

        {/* Block 2: Gap insight box */}
        <div className={`${blockClass(2)} mb-4`}>
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
