"use client";

import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { ModuleComplete } from "@/components/ui/ScreenSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

export default function Screen12Complete({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);

  // 2 blocks: completion card(0), next module teaser(1)
  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(2);

  const narrationScript = [
    `Brilliant! You've built a star schema, connected table relationships, and written DAX measures including CALCULATE and time intelligence — all using ${flavor.label} data. That is genuinely impressive work.`,
    `Module 4 is where it all becomes visible. You'll turn your model into every type of chart and build your first full interactive dashboard. All those measures you wrote — they're about to light up on screen. Save your Power BI file before we go.`,
  ];

  return (
    <ModuleLayout moduleId={3} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText={`Brilliant! You've built a star schema, connected relationships, and written DAX measures including CALCULATE and time intelligence — all using ${flavor.label} data. Module 4 is where it all becomes visible: you'll turn your model into every type of chart and build your first full dashboard.`}
      kaaraniHint="Save your Power BI file (.pbix) before moving on. Module 4 builds directly on the model you just created."
      onPrev={onPrev}
      primaryAction={
        isComplete
          ? { label: "Start Module 4: Visualise →", onClick: onNext }
          : { label: "Start Module 4: Visualise →", onClick: onNext, disabled: true }
      }
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — Module complete card */}
        <div className={blockClass(0)}>
          <ModuleComplete
            moduleId={3}
            title="Your data model and DAX measures are ready"
            topics={["Star schema", "Table relationships", "DAX intro", "Measures vs columns", "SUM / COUNT / AVERAGE / DIVIDE", "CALCULATE", "Filter context", "Time intelligence", "VAR/RETURN", "Best practices"]}
            nextModuleId={4}
            nextModuleTitle="Visualise & Analyse"
            nextModuleIcon=""
            nextModuleColor="#2563EB"
            flavorLabel={flavor.label}
          />
        </div>

        {/* Block 1 — Next module teaser */}
        <div className={`${blockClass(1)} mt-4 mb-4`}>
          <div className="rounded-2xl p-4" style={{ backgroundColor: "#EFF6FF", border: "1.5px solid #BFDBFE" }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#2563EB" }}>Coming up in Module 4</p>
            <p className="text-sm" style={{ color: "#111827" }}>
              You'll take every measure you built in this module and make it visual — bar charts, line charts, KPI cards, slicers, and a full interactive dashboard. This is where your data starts telling its story.
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
