"use client";

import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorChartExample } from "@/data/module4";
import { ScreenHeader } from "@/components/ui/ScreenSection";
import { Placeholder } from "@/components/ui/Placeholder";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

const CANVAS_ZONES = [
  { icon: "", label: "Report Canvas", desc: "Where your visuals live. Drag to arrange, resize freely. Multiple pages in one report." },
  { icon: "", label: "Visualisations Pane", desc: "All chart types — click one to add it to the canvas, then drag fields onto it." },
  { icon: "", label: "Fields Pane", desc: "All your tables and measures. Drag fields onto visuals to define what they show." },
  { icon: "", label: "Filters Pane", desc: "Page-level and report-level filters. Invisible to users in published reports unless you expose them." },
  { icon: "", label: "Format Pane", desc: "Every visual property — colours, fonts, borders, tooltips, titles. This is where reports become beautiful." },
];

export default function Screen1CanvasIntro({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const chartEx = getFlavorChartExample(selectedFlavor);

  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    `Welcome to Module 4 — the most visual module! Everything you built in Modules 2 and 3 now shows up as charts. For your ${flavor.label} data, the most powerful starting chart is: ${chartEx.primaryChart}.`,
    "The Power BI canvas has five zones and each one has a specific job. The canvas is your whiteboard — drag visuals anywhere, resize them, create multiple pages.",
    "The Visualisations pane is your chart picker, the Fields pane is where your data lives, and the Filters pane lets you apply invisible filters to any page.",
    `The Format pane is where good reports become great ones. Every colour, font, border, and tooltip lives there. And for ${flavor.label}, your best starting chart is ${chartEx.primaryChart} — ${chartEx.primaryWhy}`,
  ];

  return (
    <ModuleLayout moduleId={4} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText={`Welcome to Module 4 — the most visual module! Everything you built in Modules 2 and 3 now shows up as charts. For your ${flavor.label} data, the most powerful starting chart is: ${chartEx.primaryChart}. We'll build it together, plus every other chart type Power BI offers.`}
      kaaraniHint="Power BI has 30+ built-in visuals plus hundreds more from AppSource. For 90% of reports, you'll use only 6: bar, column, line, card, slicer, and table."
      onPrev={onPrev}
      primaryAction={isComplete
        ? { label: "Bar & Column charts →", onClick: onNext }
        : { label: "Bar & Column charts →", onClick: onNext, disabled: true }}
    >
      <div className="max-w-2xl mx-auto">
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={4} label="Module 4 · Visualise & Analyse" title="The Power BI canvas "
            subtitle="Five zones, one report. Let's learn each one." moduleColor={M_COLOR} />
        </div>

        <div className={`${blockClass(1)} flex flex-col gap-3 mb-5`}>
          {CANVAS_ZONES.map(z => (
            <div key={z.label} className="flex items-start gap-4 p-4 rounded-2xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
              <div>
                <p className="font-bold text-sm mb-0.5" style={{ color: "#111827" }}>{z.label}</p>
                <p className="text-xs leading-snug" style={{ color: "#6B7280" }}>{z.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`${blockClass(2)} rounded-xl p-3 mb-4`} style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
          <p className="text-xs font-bold mb-1" style={{ color: M_COLOR }}>Our best starting chart for {flavor.label}</p>
          <p className="text-sm font-semibold" style={{ color: "#111827" }}>{chartEx.primaryChart}</p>
          <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{chartEx.primaryWhy}</p>
        </div>

        <div className={`${blockClass(3)} mb-4`}>
          <Placeholder type="image" label="[Power BI Screenshot: Report canvas with Visualisations, Fields, and Format panes labelled]" height="120px" />
        </div>

        {!isComplete && (
          <button type="button"
            onClick={() => { unlockVoice(); if (narrationScript[step + 1]) speak(narrationScript[step + 1]); next(); }}
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
