"use client";

import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

// Flavor-aware story openings — YOU are the subject of the data
const STORY_OPENERS: Record<string, { role: string; scenario: string; question: string }> = {
  cricket: {
    role: "Fantasy Cricket Player",
    scenario: "You've been playing fantasy cricket for 3 seasons. Behind every match, there's a spreadsheet of your picks, your points, your wins and losses — hundreds of rows of YOUR decisions.",
    question: "\"Why do I keep losing points in the same match situations? Which players should I actually be picking?\" — Your data has the answers.",
  },
  football: {
    role: "Fantasy Premier League Manager",
    scenario: "You've been managing your FPL team for 2 seasons. Every transfer, every captain pick, every chip you played — all recorded. A goldmine of data about your decisions.",
    question: "\"Why does my rank crash every few weeks? Which player moves were actually worth it?\" — Your data knows.",
  },
  movies: {
    role: "Movie Enthusiast",
    scenario: "You've watched 94 films on OTT this year. Every play, every pause, every half-watched movie, every 5-star rating — all sitting in a database somewhere.",
    question: "\"Why do I keep starting films I never finish? Which genres actually keep me watching?\" — The patterns are in your data.",
  },
  ecommerce: {
    role: "Online Shopper",
    scenario: "You've placed 47 orders this year. Every item you browsed, every cart you filled, every purchase you made or abandoned — your entire shopping behaviour is recorded.",
    question: "\"Why do I keep abandoning carts? Am I actually getting the best deals?\" — Your shopping data reveals the truth.",
  },
  food: {
    role: "Food Delivery Regular",
    scenario: "You've ordered food 89 times this year. Every restaurant, every dish, every delivery time, every rating you left — all stored in Swiggy's database as YOUR data.",
    question: "\"Why do I rate some orders 5 stars and others 2? When does my food actually arrive on time?\" — Your order history knows.",
  },
  stocks: {
    role: "Retail Investor",
    scenario: "You've been investing for 3 years. Every stock you bought, every sell you made, every sector you bet on — your entire portfolio history is data waiting to be analysed.",
    question: "\"Why did my IT stocks crash when the rest of the market was fine? Am I making smart decisions?\" — Your portfolio data can tell you.",
  },
  healthcare: {
    role: "Health-Conscious Patient",
    scenario: "You've visited the clinic 14 times this year. Every appointment, every wait time, every department you visited — all logged as data in the hospital's system.",
    question: "\"Why did I wait 41 minutes when I usually wait 22? When should I book to avoid the worst queues?\" — The data holds the pattern.",
  },
  music: {
    role: "Music Listener",
    scenario: "You've been using Spotify for 3 years. Every tap, every skip, every replay, every playlist add — thousands of rows of data that describe exactly how YOU listen to music.",
    question: "\"Why do I always lose interest in new albums by Track 4? Which artist will I actually love next?\" — Your listening history has the answers.",
  },
  travel: {
    role: "Frequent Traveller",
    scenario: "You've taken 8 flights this year. Every booking date, every fare, every route, every cancellation — your travel history is a dataset full of patterns you've never noticed.",
    question: "\"Why do I always end up paying more than my friends for the same flight? When should I actually book?\" — Your booking data tells the story.",
  },
  gaming: {
    role: "BGMI Player",
    scenario: "You've logged 4.2 sessions a week for the past 3 months. Every match, every kill, every weapon loadout, every win and loss — your entire game history is data.",
    question: "\"Why did my win rate suddenly drop after the last update? Which weapon should I actually be using?\" — Your match data knows exactly why.",
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
