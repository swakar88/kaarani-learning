"use client";

import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { ModuleComplete } from "@/components/ui/ScreenSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

export default function Screen10Complete({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);

  // 2 blocks: completion card(0), next module teaser(1)
  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(2);

  const narrationScript = [
    `Excellent work! You've taken raw, messy ${flavor.label} data and transformed it into a clean, correctly typed dataset ready for analysis. That is a real professional skill.`,
    `In Module 3, we'll build the relationships between your tables and write your first DAX measures — that's where the magic really begins. Your Power Query recipe will run automatically every time you refresh. You built it once; it works forever.`,
  ];

  return (
    <ModuleLayout moduleId={2} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText={`Excellent work! You've taken raw, messy ${flavor.label} data and transformed it into a clean, correctly typed dataset ready for analysis. In Module 3, we'll build the relationships between your tables and write your first DAX measures — that's where the magic really begins.`}
      kaaraniHint="Your Power Query recipe will run automatically every time you click Refresh. That's the power of building it correctly once."
      onPrev={onPrev}
      primaryAction={
        isComplete
          ? { label: "Start Module 3: Model + DAX →", onClick: onNext }
          : { label: "Start Module 3: Model + DAX →", onClick: onNext, disabled: true }
      }
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — Module complete card */}
        <div className={blockClass(0)}>
          <ModuleComplete
            moduleId={2}
            title="You can now prepare real-world data in Power Query"
            topics={["Connected to a real dataset", "Fixed data types", "Removed duplicates", "Handled null values", "Transformed columns", "Filtered unwanted rows", "Merged & appended tables", "Loaded to Data Model"]}
            nextModuleId={3}
            nextModuleTitle="Model + DAX"
            nextModuleIcon="⭐"
            nextModuleColor="#2563EB"
            flavorLabel={flavor.label}
          />
        </div>

        {/* Block 1 — Next module teaser */}
        <div className={`${blockClass(1)} mt-4 mb-4`}>
          <div className="rounded-2xl p-4" style={{ backgroundColor: "#EFF6FF", border: "1.5px solid #BFDBFE" }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#2563EB" }}>Coming up in Module 3</p>
            <p className="text-sm" style={{ color: "#111827" }}>
              You'll connect your clean tables with relationships, then write your first DAX measures — calculated KPIs that work across any filter in your report. That's where Power BI becomes truly powerful.
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
