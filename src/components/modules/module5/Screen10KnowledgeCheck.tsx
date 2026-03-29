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
  "Open Power BI Desktop — click Home → Publish → sign in and publish your report to My Workspace",
  "Go to app.powerbi.com — open your report and pin one visual to a new Dashboard",
  "In the report, click Share → enter an email address to share it with someone",
  "In the Workspace, click the three dots next to your Dataset → Settings → Scheduled Refresh → configure a refresh schedule",
];

const narrationScript = [
  "One screen from the finish line. Let's confirm the Power BI Service concepts have really landed.",
  "Three questions on workspaces, Row Level Security, and the report versus dashboard distinction.",
  "These four tasks in Power BI Service prove you're genuinely job-ready. Go to app.powerbi.com and work through them — you've earned it.",
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
      ? "Power BI Service is where your work lives in the real world — shared, secured, and refreshing automatically. These questions test the concepts that matter most once you're working in a team."
      : quizScore === 3
      ? "Full marks on the final quiz. You understand both the technical and the organisational side of Power BI. You're genuinely ready for the P.L. 300 exam."
      : quizScore === 2
      ? "Almost perfect — check the explanation on the one you missed. The Row Level Security and workspace concepts come up a lot in real deployments and in the exam."
      : "That's okay — publishing and service features are hard to fully understand without actually using them. The Try Yourself tasks are the best way to get hands-on. Go to app.powerbi.com and work through the steps.";

  return (
    <ModuleLayout
      moduleId={5}
      screenIndex={screenIndex}
      totalScreens={totalScreens}
      kaaraniText={kaaraniText}
      kaaraniHint="You need a free Power BI Service account for the Try Yourself tasks. Sign up at app.powerbi.com — it's free with any Microsoft account."
      kaaraniEmotion={quizScore === 3 ? "happy" : quizScore !== null && quizScore <= 1 ? "thinking" : undefined}
      onPrev={onPrev}
      primaryAction={{ label: "Course complete →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — Header */}
        <div className={blockClass(0)}>
          <ScreenHeader
            moduleId={5}
            label="Module 5 · Screen 10"
            title="Knowledge Check"
            subtitle={`Almost there, ${flavor.label} analyst. One last check before the finish line.`}
            moduleColor={M_COLOR}
          />
        </div>

        {/* Block 1 — Quiz */}
        <div className={`${blockClass(1)} mb-5`}>
          <QuizSection
            questions={MODULE_QUIZZES[5].questions}
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
                  <p className="text-xs" style={{ color: "#BFDBFE" }}>Publish and share your report in Power BI Service</p>
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
                  Need data to publish?
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
