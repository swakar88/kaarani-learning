"use client";

import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { ModuleComplete } from "@/components/ui/ScreenSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

export default function Screen15Complete({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);

  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(2);

  const narrationScript = [
    `Incredible! You've now built complete dashboards with every chart type Power BI offers — all using ${flavor.label} data. Thirteen topics covered in this module alone.`,
    "The last module is about getting your work out into the world: publishing, sharing, securing, and setting up automatic data refreshes. Save your .pbix file before we start.",
  ];

  return (
    <ModuleLayout moduleId={4} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText={`Incredible! You've now built complete dashboards with every chart type Power BI offers — all using ${flavor.label} data. The last module is about getting your work out into the world: publishing, sharing, securing, and setting up automatic data refreshes.`}
      kaaraniHint="Save your .pbix file before Module 5. You'll publish it to Power BI Service and test all the sharing features."
      onPrev={onPrev}
      primaryAction={isComplete
        ? { label: "Start Module 5: Manage & Share →", onClick: onNext }
        : { label: "Start Module 5: Manage & Share →", onClick: onNext, disabled: true }}
    >
      <div className="max-w-2xl mx-auto">
        <div className={blockClass(0)}>
          <ModuleComplete
            moduleId={4}
            title="You can now build any Power BI report"
            topics={["Canvas & panes", "Bar & column charts", "Line & area charts", "Cards & KPIs", "Tables & matrices", "Maps", "Slicers & filters", "Cross-filtering", "Conditional formatting", "Bookmarks & buttons", "Forecasting", "AI visuals", "Design best practices"]}
            nextModuleId={5}
            nextModuleTitle="Manage & Share"
            nextModuleIcon=""
            nextModuleColor="#2563EB"
            flavorLabel={flavor.label}
          />
        </div>

        <div className={`${blockClass(1)} rounded-xl p-4`} style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
          <p className="text-xs font-bold mb-1" style={{ color: "#2563EB" }}>Before Module 5</p>
          <p className="text-xs" style={{ color: "#111827" }}>Save your .pbix file. You'll publish it to Power BI Service in Module 5 and test all the sharing and security features with your {flavor.label} report.</p>
        </div>

        {!isComplete && (
          <button type="button"
            onClick={() => { unlockVoice(); if (narrationScript[step + 1]) speak(narrationScript[step + 1]); next(); }}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-colors mt-4"
            style={{ backgroundColor: "#EFF6FF", color: "#2563EB", border: "1.5px dashed #93C5FD" }}
          >
            {tapLabel} →
          </button>
        )}
      </div>
    </ModuleLayout>
  );
}
