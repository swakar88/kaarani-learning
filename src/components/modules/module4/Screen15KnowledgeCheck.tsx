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
  "Open a Power BI file with data (or load a sample dataset) — add a Bar chart, a Line chart, and a Card visual to a blank report page",
  "Add a Slicer visual connected to a date or category column — confirm it filters the other visuals when you click it",
  "Format one chart: change the bar/line colour, add data labels, and rename the chart title to something meaningful",
  "Select the Line chart → click the Analytics pane (magnifying glass icon) → expand Trend Line → click Add",
];

const narrationScript = [
  "Module 4 was packed — thirteen visual types, slicers, conditional formatting, and A.I. visuals. Let's lock in the core judgement calls.",
  "Three questions on visualisations. These are the decisions you make every time you build a report page.",
  "Build a full report page from scratch. Twenty minutes, four tasks — this is what a portfolio piece looks like.",
];

export default function Screen15KnowledgeCheck({
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
      ? "You now know more chart types, design patterns, and A.I. features than most Power B.I. users who've been using it for years. These three questions test the judgement that separates good reports from great ones."
      : quizScore === 3
      ? "Three for three on visuals. You clearly understand not just how to add charts, but when and why — that's the hard part."
      : quizScore === 2
      ? "Two out of three — you're in great shape. Double-check the explanation on the one you missed; chart choice questions come up in the P.L. 300 exam too."
      : "Visuals are intuitive once you've used them a few times. The Try Yourself tasks below are the fastest way to make these concepts stick — build the charts, make the mistakes, then it clicks.";

  return (
    <ModuleLayout
      moduleId={4}
      screenIndex={screenIndex}
      totalScreens={totalScreens}
      kaaraniText={kaaraniText}
      kaaraniHint="The Try Yourself tasks work best with your own flavor data — you'll find a matched Kaggle dataset below."
      kaaraniEmotion={quizScore === 3 ? "happy" : quizScore !== null && quizScore <= 1 ? "thinking" : undefined}
      onPrev={onPrev}
      primaryAction={{ label: "Module 4 complete →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — Header */}
        <div className={blockClass(0)}>
          <ScreenHeader
            moduleId={4}
            label="Module 4 · Screen 15"
            title="Knowledge Check"
            subtitle={`Charts, slicers, and A.I. visuals — let's check what stuck, ${flavor.label} analyst.`}
            moduleColor={M_COLOR}
          />
        </div>

        {/* Block 1 — Quiz */}
        <div className={`${blockClass(1)} mb-5`}>
          <QuizSection
            questions={MODULE_QUIZZES[4].questions}
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
                  <p className="text-xs" style={{ color: "#BFDBFE" }}>Build a real report page in Power BI Desktop</p>
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
