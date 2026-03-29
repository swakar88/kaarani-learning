"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { ScreenHeader } from "@/components/ui/ScreenSection";
import { QuizSection } from "@/components/ui/QuizSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";
import { MODULE_QUIZZES, KAGGLE_LINKS } from "@/data/quizzes";

const M_COLOR = "#2563EB";

const TASKS = [
  "Download the practice dataset from the link below",
  "Open it in Power BI Desktop — click Home → Get Data → Text/CSV",
  "Click Transform Data (not Load) to open Power Query",
  "Fix at least one data type error, remove blank rows, and filter Status = 'Active'",
  "Close & Apply — check your Applied Steps pane shows 4 or more steps",
];

const narrationScript = [
  "Before we wrap Module 2, let's make sure those Power Query skills have really landed. Three quick questions — no tricks, just the real concepts we covered.",
  "Tap the answer you're most confident in — you get instant feedback after each one. Take your time.",
  "Now go build it for real. Download the dataset below and follow the steps — hands-on practice is where Power Query becomes second nature.",
];

export default function Screen10KnowledgeCheck({
  onNext,
  onPrev,
  screenIndex,
  totalScreens,
}: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(3);

  const kaggle = KAGGLE_LINKS[selectedFlavor] ?? KAGGLE_LINKS["ecommerce"];

  const kaaraniText =
    quizScore === null
      ? "Let's consolidate what you've learned in Module 2. Three questions on Power Query, then a hands-on task you can do right now in Power BI Desktop."
      : quizScore === 3
      ? "Three out of three! You really understand how Power Query works under the hood. That's the foundation everything else builds on."
      : quizScore === 2
      ? "Two out of three — solid understanding. Check the explanation on the one you missed; it trips up a lot of people."
      : "No worries at all — these concepts take a moment to settle. Re-read the explanations and try the hands-on task. It'll click.";

  return (
    <ModuleLayout
      moduleId={2}
      screenIndex={screenIndex}
      totalScreens={totalScreens}
      kaaraniText={kaaraniText}
      kaaraniHint="The Try Yourself tasks work best with your own flavor data — you'll find a matched Kaggle dataset below."
      kaaraniEmotion={quizScore === 3 ? "happy" : quizScore !== null && quizScore <= 1 ? "thinking" : undefined}
      onPrev={onPrev}
      primaryAction={{ label: "Module 2 complete →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — Header */}
        <div className={blockClass(0)}>
          <ScreenHeader
            moduleId={2}
            label="Module 2 · Screen 10"
            title="Knowledge Check"
            subtitle={`Let's make sure those Power Query skills have landed, ${flavor.label} analyst.`}
            moduleColor={M_COLOR}
          />
        </div>

        {/* Block 1 — Quiz */}
        <div className={`${blockClass(1)} mb-5`}>
          <QuizSection
            questions={MODULE_QUIZZES[2].questions}
            onComplete={setQuizScore}
            moduleColor={M_COLOR}
          />
        </div>

        {/* Block 2 — Try Yourself */}
        <div className={`${blockClass(2)} mb-4`}>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid #E5E7EB" }}>
            <div className="px-4 py-3" style={{ backgroundColor: M_COLOR }}>
              <div className="flex items-center gap-2">
                <span className="text-lg"></span>
                <div>
                  <p className="font-black text-white text-sm">Try It Yourself</p>
                  <p className="text-xs" style={{ color: "#BFDBFE" }}>Open Power BI Desktop and work through these steps</p>
                </div>
              </div>
            </div>
            <div className="px-4 py-4" style={{ backgroundColor: "#FFFFFF" }}>
              <ol className="flex flex-col gap-3 mb-4">
                {TASKS.map((task, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black text-white"
                      style={{ backgroundColor: M_COLOR }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm leading-snug" style={{ color: "#374151", paddingTop: 2 }}>
                      {task}
                    </p>
                  </li>
                ))}
              </ol>

              {/* Data links */}
              <div className="rounded-xl p-3" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: M_COLOR }}>
                  Get practice data
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://learn.microsoft.com/en-us/power-bi/create-reports/sample-datasets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg"
                    style={{ backgroundColor: "#EFF6FF", color: M_COLOR, border: "1px solid #BFDBFE" }}
                  >
                    <span></span> Microsoft official sample datasets
                  </a>
                  <a
                    href={kaggle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg"
                    style={{ backgroundColor: "#F9FAFB", color: "#374151", border: "1px solid #E5E7EB" }}
                  >
                    <span></span> Kaggle: {kaggle.label} (your {flavor.label} data)
                  </a>
                </div>
              </div>

              <p className="text-xs mt-3 text-center" style={{ color: "#9CA3AF" }}>
                This section is optional — tap Continue whenever you're ready
              </p>
            </div>
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
            style={{ backgroundColor: "#EFF6FF", color: M_COLOR, border: "1.5px dashed #93C5FD" }}
          >
            {tapLabel} →
          </button>
        )}

      </div>
    </ModuleLayout>
  );
}
