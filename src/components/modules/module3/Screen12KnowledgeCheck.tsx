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
  "Load two tables into Power BI Desktop (e.g. a Sales/fact table and a Product/dimension table)",
  "Go to Model View — drag the key column from one table to the matching column on the other to create a relationship",
  "Switch to Report View — open the Data pane and right-click your fact table → New Measure",
  "Write your first measure: Total = SUM(YourTable[YourColumn])",
  "Add a Card visual to the canvas and drag your new measure into it — verify the number looks right",
];

const narrationScript = [
  "Module 3 covered the hardest ideas in Power BI — star schema, CALCULATE, and filter context. Let's see what landed.",
  "Three questions on data modelling and DAX. These are the things you'll use in every single project you build.",
  "Open Power BI Desktop and build the model for real. Writing even one measure makes everything click permanently.",
];

export default function Screen12KnowledgeCheck({
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
      ? "Module 3 is the engine room of Power BI. The concepts here — star schema, CALCULATE, filter context — are what separates Power BI beginners from analysts. Let's confirm they've landed."
      : quizScore === 3
      ? "Perfect score on the hardest module. CALCULATE and filter context are where most people stumble — you've nailed them."
      : quizScore === 2
      ? "Good work. DAX takes time to become fully intuitive. The one you missed is worth re-reading — the nuance matters in practice."
      : "These are genuinely difficult concepts — don't be discouraged. Go back to the CALCULATE and filter context screens, then try the hands-on task. Building something yourself always makes it clearer.";

  return (
    <ModuleLayout
      moduleId={3}
      screenIndex={screenIndex}
      totalScreens={totalScreens}
      kaaraniText={kaaraniText}
      kaaraniHint="The Try Yourself tasks work best with your own flavor data — you'll find a matched Kaggle dataset below."
      kaaraniEmotion={quizScore === 3 ? "happy" : quizScore !== null && quizScore <= 1 ? "thinking" : undefined}
      onPrev={onPrev}
      primaryAction={{ label: "Module 3 complete →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — Header */}
        <div className={blockClass(0)}>
          <ScreenHeader
            moduleId={3}
            label="Module 3 · Screen 12"
            title="Knowledge Check"
            subtitle={`Star schema, DAX, filter context — let's see what's landed, ${flavor.label} analyst.`}
            moduleColor={M_COLOR}
          />
        </div>

        {/* Block 1 — Quiz */}
        <div className={`${blockClass(1)} mb-5`}>
          <QuizSection
            questions={MODULE_QUIZZES[3].questions}
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
                  <p className="text-xs" style={{ color: "#BFDBFE" }}>Build a real star schema model in Power BI Desktop</p>
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
